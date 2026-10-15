// GET  /api/comentarios?slug=<slug>  → comentários aprovados do artigo
// POST /api/comentarios               → novo comentário (fica pendente até ser aprovado em /moderar/)
import { ready, json, hashIp, SLUG } from '../_lib/db.js';

export async function onRequestGet({ request, env }) {
  if (!(await ready(env))) return json({ error: 'unavailable' }, 503);
  const slug = new URL(request.url).searchParams.get('slug') ?? '';
  if (!SLUG.test(slug)) return json({ error: 'bad_slug' }, 400);
  const { results } = await env.DB.prepare(
    "SELECT name, body, created_at FROM comments WHERE slug = ? AND status = 'approved' ORDER BY created_at ASC LIMIT 200",
  )
    .bind(slug)
    .all();
  return json({ comments: results });
}

export async function onRequestPost({ request, env }) {
  if (!(await ready(env))) return json({ error: 'unavailable' }, 503);
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ error: 'bad_request' }, 400);
  }
  const slug = String(data.slug ?? '');
  const name = String(data.name ?? '').trim().replace(/\s+/g, ' ');
  const body = String(data.body ?? '').trim();
  // Campo invisível: pessoas não preenchem, robôs sim.
  if (data.website) return json({ ok: true }, 202);
  if (!SLUG.test(slug)) return json({ error: 'bad_slug' }, 400);
  if (name.length < 2 || name.length > 60) return json({ error: 'bad_name' }, 400);
  if (body.length < 3 || body.length > 2000) return json({ error: 'bad_body' }, 400);
  if (data.privacy !== true) return json({ error: 'privacy' }, 400);
  if ((body.match(/https?:\/\//g) ?? []).length > 2) return json({ error: 'too_many_links' }, 400);

  const ip = request.headers.get('CF-Connecting-IP') ?? '';
  const ipHash = await hashIp(ip, env.IP_SALT);
  const recent = await env.DB.prepare(
    "SELECT COUNT(*) AS n FROM comments WHERE ip_hash = ? AND created_at > strftime('%Y-%m-%dT%H:%M:%SZ','now','-10 minutes')",
  )
    .bind(ipHash)
    .first();
  if (recent && recent.n >= 3) return json({ error: 'rate_limited' }, 429);

  await env.DB.prepare('INSERT INTO comments (slug, name, body, ip_hash) VALUES (?, ?, ?, ?)')
    .bind(slug, name, body, ipHash)
    .run();
  return json({ ok: true }, 202);
}
