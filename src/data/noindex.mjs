import { owner } from './owner.mjs';

// Páginas fora do Google (noindex + fora do sitemap) até os dados reais estarem em owner.mjs.
export const noindexPaths = [
  ...(owner.contactEmail ? [] : ['/contacto/']),
  ...((owner.country && owner.country !== 'España' ? owner.contactEmail : owner.name && owner.taxId && owner.address && owner.contactEmail)
    ? []
    : ['/aviso-legal/']),
];
