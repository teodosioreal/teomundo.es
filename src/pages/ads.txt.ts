import type { APIRoute } from 'astro';
import { adsense } from '../data/site';

// /ads.txt só é gerado quando o AdSense está ligado (adsense.client em src/data/site.ts).
export const GET: APIRoute = () => {
  const pub = adsense.client?.replace(/^ca-/, '');
  if (!pub) return new Response('# Publicidad desactivada\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  return new Response(`google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
