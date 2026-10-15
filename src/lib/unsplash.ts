// Unsplash requires hotlinking; imgix params resize and convert on their CDN.
// fm 'jpg' for share previews (og:image, schema.org): social networks don't all read WebP.
export const unsplash = (raw: string, w: number, fm: 'webp' | 'jpg' = 'webp') =>
  `${raw}${raw.includes('?') ? '&' : '?'}w=${w}&h=${Math.round((w * 9) / 16)}&fit=crop&crop=entropy&fm=${fm}&q=${fm === 'jpg' ? 80 : 70}`;
