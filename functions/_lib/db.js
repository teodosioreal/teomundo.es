// Banco de comentários (Cloudflare D1, binding "DB"). A tabela é criada sozinha no primeiro uso.
export const ready = async (env) => {
  if (!env.DB) return false;
  await env.DB.prepare(
    `CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL,
      name TEXT NOT NULL,
      body TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      ip_hash TEXT,
      created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now'))
    )`,
  ).run();
  await env.DB.prepare('CREATE INDEX IF NOT EXISTS comments_slug ON comments (slug, status)').run();
  return true;
};

export const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });

// Guarda só um hash do IP (com sal secreto), usado para limitar spam. Nunca o IP em si.
export const hashIp = async (ip, salt = '') => {
  const data = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
};

// Chave do artigo: "<categoria>/<slug>".
export const SLUG = /^[a-z0-9-]{1,60}\/[a-z0-9-]{1,120}$/;
