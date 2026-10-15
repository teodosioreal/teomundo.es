// Configuração central do site. Quase tudo que muda no dia a dia fica aqui.

export const site = {
  name: 'TeoMundo',
  url: 'https://teomundo.es',
  description:
    'Curiosidades verificadas de tu cuerpo en el día a día: por qué pasa lo que pasa, explicado en un minuto y con fuentes científicas.',
  locale: 'es_ES',
  lang: 'es-ES',
};

export type Category = {
  /** Nome curto que aparece no menu e no breadcrumb. */
  name: string;
  /** <title> da página da categoria (≤ 60 caracteres). */
  title: string;
  /** meta description da página da categoria (≤ 155 caracteres). */
  metaDescription: string;
  /** Texto de abertura da página da categoria. */
  description: string;
};

// Categorias (nichos). A URL de cada artigo é /<categoria>/<slug>/.
// O menu e a página /<categoria>/ só aparecem quando a categoria já tem artigo publicado.
// Exemplo:
//   'finanzas-personales': {
//     name: 'Finanzas personales',
//     title: 'Guías de finanzas personales | TeoMundo',
//     metaDescription: '...',
//     description: '...',
//   },
export const categories: Record<string, Category> = {
  'por-que': {
    name: '¿Por qué?',
    title: '¿Por qué pasa? Curiosidades del cuerpo | TeoMundo',
    metaDescription:
      'Hipo, piel de gallina, bostezos, dedos que crujen: por qué tu cuerpo hace lo que hace, explicado en un minuto y con fuentes científicas.',
    description:
      'Hipo, piel de gallina, bostezos contagiosos, tripas que suenan: lo que tu cuerpo hace cada día, explicado en un minuto y con fuentes científicas.',
  },
};

export const author = {
  name: 'Equipo editorial de TeoMundo',
};

export const footerLinks: { label: string; href: string }[] = [
  { label: 'Sobre nosotros', href: '/sobre-nosotros/' },
  { label: 'Política editorial', href: '/politica-editorial/' },
  { label: 'Aviso legal', href: '/aviso-legal/' },
  { label: 'Política de privacidad', href: '/politica-de-privacidad/' },
  { label: 'Política de cookies', href: '/politica-de-cookies/' },
  { label: 'Contacto', href: '/contacto/' },
];

// Como cada guia é escrito (home e política editorial).
export const standards = [
  {
    name: 'Fuentes fiables',
    text: 'Nos basamos en fuentes primarias y oficiales, y las enlazamos al final de cada guía.',
  },
  {
    name: 'Lenguaje claro',
    text: 'Frases cortas, palabras de todos los días y pasos concretos que puedes aplicar hoy.',
  },
  {
    name: 'Honestidad',
    text: 'Si algo no está claro o los datos son limitados, lo decimos en vez de exagerar.',
  },
  {
    name: 'Siempre al día',
    text: 'Cada guía muestra cuándo se publicó y cuándo se actualizó, y corregimos los errores en cuanto los confirmamos.',
  },
];

export const promises = [
  'Nunca inventamos datos, estudios, testimonios ni expertos.',
  'No prometemos resultados milagrosos.',
  'Te decimos cuándo la información disponible es limitada.',
  'Separamos siempre la publicidad del contenido.',
];

// Aviso que aparece no rodapé de todas as páginas. null = sem aviso.
// Para nichos sensíveis (saúde, finanças, direito), escreva aqui o aviso adequado.
export const footerNotice: string | null =
  'El contenido de este sitio es solo informativo y no sustituye el consejo, el diagnóstico ni el tratamiento de un profesional sanitario. Ante cualquier duda sobre tu salud, consulta a tu médico.';

// Publicidade (Google AdSense). null = desligado: nenhum script de anúncio e nenhum ads.txt.
// Quando aprovar, coloque o ID de editor (ex.: 'ca-pub-0000000000000000').
// Atenção: na Espanha/UE o Google exige um banner de consentimento certificado (CMP) para exibir anúncios.
export const adsense: { client: string | null } = {
  client: null,
};

// Medição de cliques nos blocos de leitura relacionada (ideia do plugin "Conteúdo Relacionado").
// Com um ID do Google Analytics 4 (ex.: 'G-XXXXXXXXXX'), cada clique vira o evento "clic_relacionado".
// null = desligado (nenhum script de analytics é carregado).
export const analytics: { ga4Id: string | null } = {
  ga4Id: null,
};

// Barra fixa com um link (ideia do plugin "Responsive Button"). Desligada por padrão.
// Versão discreta: aparece sem atraso, tem botão de fechar e fica fechada durante a visita.
export const stickyBar = {
  active: false,
  text: 'Lee nuestra guía más completa',
  href: '/',
  /** 'top' ou 'bottom'. */
  position: 'bottom' as 'top' | 'bottom',
  /** Caminhos onde a barra não aparece, ex.: ['/contacto/']. */
  exclude: [] as string[],
};

// Comentários nos artigos (Cloudflare D1 + Pages Functions, pasta functions/).
// Cada comentário fica pendente até ser aprovado em https://teomundo.es/moderar
export const comments = {
  active: true,
};
