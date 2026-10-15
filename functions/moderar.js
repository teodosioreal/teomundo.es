// Painel de moderação: https://teomundo.es/moderar
// Usuário: admin · Senha: variável secreta ADMIN_PASSWORD (configurada na Cloudflare).
import { ready } from './_lib/db.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const authorized = (request, env) => {
  if (!env.ADMIN_PASSWORD) return false;
  const header = request.headers.get('Authorization') ?? '';
  if (!header.startsWith('Basic ')) return false;
  let decoded = '';
  try {
    decoded = atob(header.slice(6));
  } catch {
    return false;
  }
  return decoded === `admin:${env.ADMIN_PASSWORD}`;
};

const deny = () =>
  new Response('Acceso restringido', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Moderar comentarios", charset="UTF-8"' },
  });

const page = (html, status = 200) =>
  new Response(
    `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>Moderar comentarios</title>
<style>body{font-family:system-ui,sans-serif;max-width:760px;margin:0 auto;padding:16px;color:#1d2433;background:#fff}h1{font-size:1.5rem}article{border:1px solid #e3e7ec;border-radius:10px;padding:14px;margin:14px 0}p{white-space:pre-wrap}small{color:#566070}form{display:inline}button{font:inherit;padding:8px 14px;border-radius:8px;border:0;cursor:pointer;margin-right:8px}.ok{background:#234a75;color:#fff}.del{background:#f3d6d6;color:#7a1f1f}nav a{margin-right:12px}</style>
</head><body>${html}</body></html>`,
    { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } },
  );

export async function onRequest({ request, env }) {
  if (!authorized(request, env)) return deny();
  if (!(await ready(env))) return page('<h1>Comentarios no configurados</h1><p>Falta el enlace D1 llamado DB en Cloudflare.</p>', 503);

  const url = new URL(request.url);
  if (request.method === 'POST') {
    const form = await request.formData();
    const id = Number(form.get('id'));
    const action = form.get('action');
    if (Number.isInteger(id) && action === 'approve') {
      await env.DB.prepare("UPDATE comments SET status = 'approved' WHERE id = ?").bind(id).run();
    } else if (Number.isInteger(id) && action === 'delete') {
      await env.DB.prepare('DELETE FROM comments WHERE id = ?').bind(id).run();
    }
    return Response.redirect(`${url.origin}/moderar${url.search}`, 303);
  }

  const status = url.searchParams.get('ver') === 'aprobados' ? 'approved' : 'pending';
  const { results } = await env.DB.prepare(
    'SELECT id, slug, name, body, created_at FROM comments WHERE status = ? ORDER BY created_at DESC LIMIT 100',
  )
    .bind(status)
    .all();

  const items = results
    .map(
      (c) => `<article>
  <strong>${esc(c.name)}</strong> <small>· ${esc(c.created_at)} · <a href="/${esc(c.slug)}/" target="_blank">${esc(c.slug)}</a></small>
  <p>${esc(c.body)}</p>
  ${status === 'pending' ? `<form method="post"><input type="hidden" name="id" value="${c.id}"><button class="ok" name="action" value="approve">Aprobar</button></form>` : ''}
  <form method="post"><input type="hidden" name="id" value="${c.id}"><button class="del" name="action" value="delete">Borrar</button></form>
</article>`,
    )
    .join('');

  return page(`<h1>Moderar comentarios</h1>
<nav><a href="/moderar">Pendientes</a><a href="/moderar?ver=aprobados">Publicados</a></nav>
${items || `<p>No hay comentarios ${status === 'pending' ? 'pendientes' : 'publicados'}.</p>`}`);
}
