// Dados reais do responsável pelo site, usados no Aviso legal, Contacto, Privacidad e Cookies.
// A lei espanhola (LSSI, art. 10) exige no Aviso legal: nome ou razão social, NIF/NIE,
// endereço e e-mail de contato. Deixe null até confirmar. As páginas escondem o que for null,
// e /aviso-legal/ e /contacto/ ficam noindex (fora do Google e do sitemap) até serem preenchidos.
export const owner = {
  /** Pessoa ou empresa titular do site, ex.: "Nombre Apellido" ou "Empresa S.L.". */
  name: null,
  /** NIF, NIE ou documento fiscal equivalente do titular. */
  taxId: null,
  /** Endereço postal do titular. */
  address: null,
  /** E-mail público de contato, ex.: "contacto@teomundo.es". */
  contactEmail: "contacto@teomundo.es",
  /** País onde o titular está estabelecido. Fora da Espanha, o Aviso legal mostra só a marca, o país e o e-mail
   *  (o art. 10 da LSSI vale para prestadores estabelecidos na Espanha). */
  country: "Brasil",
  /** Lei e foro aplicáveis, ex.: "la legislación española". */
  jurisdiction: null,
};

/** Data da última revisão das páginas legais. */
export const legalUpdated = '2026-10-15';
