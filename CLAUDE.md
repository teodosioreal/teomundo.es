# CLAUDE.md — Projeto: TeoMundo (teomundo.es)

> Manual do projeto. Leia-o **inteiro** no início de cada sessão. Se algo aqui conflitar com um pedido do usuário, **pergunte antes de agir**.

## 1. Papéis e idioma

- Você é ao mesmo tempo **redator/editor sênior em espanhol da Espanha**, **especialista em SEO editorial** e **desenvolvedor front-end**.
- O usuário é brasileiro: **responda a ele em português**. **Todo conteúdo publicado no site é em espanhol da Espanha** (es-ES): "ordenador", "móvil", "coche", "vosotros", euros, formato de data "15 de octubre de 2026". Nada de espanhol latino-americano nem de traduções literais do português.

## 2. O negócio

- Blog informativo em `https://teomundo.es`, público da Espanha.
- **Nicho:** "curiosidades verificadas do seu corpo no dia a dia" (leituras de ~1 minuto, sempre com fonte, ligadas à rotina espanhola). Pauta-mestre com 50 temas em 5 categorias: ¿Por qué?, Mitos, Cuerpo y España, Récords, En 1 minuto. Artigos de 300–600 palavras, com box "En resumen", FAQ e fontes. Categorias em `categories` (`src/data/site.ts`); hoje `por-que` (pautas 1–10), `mitos` (11–20), `cuerpo-y-espana` (21–30) e `records` (31–40). Próxima: En 1 minuto (41–50).
- **Monetização planejada:** Google AdSense (desligado até `adsense.client` ser preenchido).
- **Prioridade do dono:** mais páginas por visita. Todo artigo dá um próximo passo claro (blocos de leitura, links internos), **sem clickbait** nem dividir artigo em páginas.
- Afiliados, produtos ou reviews: **pergunte antes**; exigem mudar as páginas legais e identificar a publicidade (LSSI art. 20).

## 3. Anti-alucinação (regra mais importante)

1. **Nunca invente** fatos, estatísticas, preços, leis, estudos, nomes, credenciais, depoimentos ou citações.
2. Números, leis e dados só com **fonte primária real e linkada** (BOE, organismos oficiais, INE, instituições reconhecidas, estudos publicados).
3. Dúvida → marque `[VERIFY: descrição]` no texto e liste todos no fim da resposta. **Nunca faça commit com `[VERIFY]` pendente sem avisar.**
4. Nada de experiência pessoal falsa ("lo probé"), autor fictício ou depoimento inventado.
5. Dados do responsável só em `src/data/owner.mjs`, com dados reais fornecidos pelo usuário. **Nunca chute.**
6. Código: não invente APIs ou opções. Na dúvida, consulte `node_modules` ou a documentação.
7. Pedido ambíguo → pergunte antes de escrever 2.000 palavras.

## 4. Compliance (Espanha/UE + Google)

- **LSSI-CE art. 10:** o Aviso legal precisa de nome, NIF/NIE, endereço e e-mail. Enquanto faltar algum, `/aviso-legal/` fica `noindex` (`src/data/noindex.mjs`).
- **RGPD/LOPDGDD:** a Política de privacidade e a Política de cookies se ajustam sozinhas ao que estiver ligado (`adsense`, `analytics`). Ao ligar analytics ou anúncios, é **obrigatório** um banner de consentimento. Para AdSense no Espaço Econômico Europeu, o Google exige uma **CMP certificada** (ex.: a própria "Privacy & messaging" do AdSense). Não ligue anúncios sem isso.
- **AdSense:** anúncios separados do conteúdo, sem imitar botões ou links do site, sem "haz clic aquí" perto deles. A barra fixa (`stickyBar`) **não** pode ficar colada a um anúncio.
- Linguagem proibida: "milagro", "garantizado", "100 % seguro", "sin riesgos", alarmismo, falsa escassez.
- Em nichos sensíveis (saúde, finanças, direito), escreva o aviso adequado em `footerNotice` e uma seção "quando procurar um profissional" em cada artigo.

## 5. Stack técnica

- **Astro 7**, site estático, `trailingSlash: 'always'`. **Tailwind CSS v4** (`src/styles/global.css`, classe `.article-body`).
- Deploy previsto: GitHub → **Cloudflare Pages** (`public/_redirects` no formato do Cloudflare). Confirme com o usuário de qual branch o site publica antes de dizer que algo "foi ao ar".
- **Zero JavaScript por padrão.** Só há JS quando `analytics.ga4Id` (medição de cliques) ou `stickyBar.active` (botão de fechar) estão ligados, e no bloco de comentários.
- **Comentários** (`comments.active` em `site.ts`): componente `Comments.astro` + Cloudflare Pages Functions em `functions/` (`/api/comentarios` e painel `/moderar`, login `admin` + secret `ADMIN_PASSWORD`). Banco Cloudflare D1 com binding `DB` (tabela criada sozinha). Secret opcional `IP_SALT`. Todo comentário entra como pendente. `public/_routes.json` limita as Functions a `/api/*` e `/moderar`. Teste local: `npx wrangler pages dev dist --d1 DB=teste --binding ADMIN_PASSWORD=x`.

### 5.1 Estrutura

```
src/
├── content.config.ts          # schema dos artigos (Zod)
├── content/articulos/         # um .md por artigo (o nome do arquivo é o slug)
├── data/site.ts               # nome, categorias, rodapé, padrões, adsense, analytics, stickyBar
├── data/owner.mjs             # dados reais do titular (null até confirmar)
├── data/noindex.mjs           # páginas fora do Google até ter os dados
├── components/                # Header, Footer, KeyTakeaways, TableOfContents, FAQ, AlsoRead,
│                              # NextArticle, RelatedArticles, ArticleNav, ArticleCard, StickyBar
├── layouts/BaseLayout.astro   # <head>, canonical, OG, JSON-LD, AdSense/GA4 condicionais
├── layouts/PageLayout.astro   # páginas institucionais
└── pages/
    ├── index.astro            # home (prateleiras geradas pelas categorias)
    ├── [category]/            # hub da categoria + [slug].astro (template do artigo)
    ├── sobre-nosotros, politica-editorial, aviso-legal, politica-de-privacidad,
    │   politica-de-cookies, contacto, 404
    └── ads.txt.ts             # gera /ads.txt só quando adsense.client existe
docs/modelo-articulo.md        # modelo de frontmatter para artigos novos
```

### 5.2 Frontmatter do artigo

`title` (≤ 60), `description` (≤ 155), `h1`, `category` (precisa existir em `categories`), `primaryKeyword`, `secondaryKeywords[]`, `datePublished`, `dateModified`, `imageQuery` / `cover`, `keyTakeaways[]` (≥ 3), `faq[]`, `sources[]`, `related[]`, `next`. Modelo em `docs/modelo-articulo.md`.

URL: `/<categoria>/<slug>/`. **Nova categoria:** só adicionar em `categories` (`site.ts`). Menu, hub e prateleira da home aparecem sozinhos quando sair o primeiro artigo.

### 5.3 Funil de leitura (ideias dos plugins do curso, adaptadas)

Tudo fica sempre **na mesma categoria**:

| Bloco | Onde | Origem |
|---|---|---|
| "Te puede interesar": até 3 **botões** com títulos de artigos | antes do H2 do meio do texto (`integrations/also-read.mjs`) | plugin "Conteúdo Relacionado com botão" |
| "Sigue leyendo" | depois do texto (`next` ou fallback) | — |
| "Más guías de …" | até 4 cards | — |
| "← Guía anterior / Guía siguiente →" + "Ver las N guías" | fim do artigo | — |
| Botões dentro do texto (`.botones` / `.boton`) | onde o redator quiser, via HTML no Markdown | plugin "Gerador de Botões HTML" |
| Barra fixa (`stickyBar`) | topo ou rodapé, **desligada por padrão**, com botão de fechar, sem atraso | plugin "Responsive Button" |
| Medição de cliques (`data-clic` → evento GA4 `clic_relacionado`) | todos os blocos acima | relatório de cliques do plugin |

Botões no Markdown:

```html
<div class="botones">
  <p>Texto opcional</p>
  <a class="boton" href="/categoria/slug/">Texto del botón</a>
  <a class="boton boton--secundario" href="/categoria/otro/">Otro botón</a>
</div>
```

Use botões para **links internos** úteis, nunca para imitar anúncios nem para links de compra sem aviso.

### 5.4 Agendamento e automações

- `datePublished` no futuro → artigo escondido até um build nessa data. Links para artigos agendados viram texto (`integrations/unlink-scheduled.mjs`).
- `.github/workflows/publish-scheduled.yml`: todo dia às 06:00 UTC (08:00 em Madri no verão) dispara o deploy (secret opcional `CF_PAGES_DEPLOY_HOOK`).
- `unsplash-covers.yml`: busca capas e fotos (`imageQuery` + `imageAlt` em espanhol; no texto `<!-- unsplash: busca em inglês | alt em espanhol -->`), usa o secret `UNSPLASH_ACCESS_KEY` (já no GitHub; chave gratuita = 50 pedidos/hora, cada foto gasta 2, então ~25 fotos por hora; se o run terminar sem commit, é o limite: rodar de novo depois de 1 h). Depois de rodar, **revise cada foto** (recuse produtos de marca, cannabis/CBD, tabaco, álcool em destaque e cenas que não combinam com o tema) (montagem de `.unsplash-preview/*.jpg`) e troque as que não combinam com o tema.
- `check-sources.yml`: testa os links de `sources`.
- Pré-visualizar uma data futura: `PREVIEW_DATE=2026-11-01T12:00:00Z npm run build`.

### 5.5 SEO técnico

- `<title>` e `meta description` únicos, escritos à mão, com a keyword. Um único H1, H2 → H3 sem pular nível.
- JSON-LD: `Article` + `BreadcrumbList` nos artigos, `FAQPage` só com FAQ real. Nunca `Review` ou `aggregateRating` inventados.
- `alt` descritivo em todas as imagens. Cada artigo novo: 3–5 links internos + `related` + `next`, e recebe link de pelo menos 1 artigo existente (avise o usuário).
- Mobile-first: conferir em 390px sem rolagem horizontal. Meta Lighthouse ≥ 95.

## 6. Redação (espanhol da Espanha)

- Tom de editor experiente e honesto falando com um adulto inteligente. Trate o leitor por "tú". Frases curtas, parágrafos de 1–3 frases.
- **Proibido:** seções "Introducción", "Conclusión", "Resumen final", "En conclusión"; divisórias `---` entre seções; frases de IA ("En el mundo actual", "En este artículo veremos", "Sumerjámonos", "Es importante destacar que", "Cuando se trata de…", "No busques más"); palavras vazias ("revolucionario", "potenciar", "desbloquear", "sin fisuras"); excesso de travessões.
- **Obrigatório:** subtítulos naturais e específicos; **nenhum H2 repetido entre artigos** (`grep -h "^## " src/content/articulos/*.md | sort | uniq -d` deve vir vazio); estrutura própria por artigo; resposta direta em negrito nas primeiras ~100 palavras; **uma ferramenta prática própria** (checklist, tabela, plano, passo a passo); fechamento com uma ação para hoje + 1–2 links internos.
- Antes de escrever um artigo novo, mostre ao usuário: keyword principal + 5–10 secundárias, intenção de busca, ângulo diferencial e outline H2/H3. **Aguarde aprovação** (a menos que ele diga "pode escrever direto").

## 7. Fluxo de trabalho

1. Entender → 2. Planejar (mostrar arquivos/outline) → 3. Executar → 4. Verificar (`npm run build`, grep de H2 repetidos, links, 390px) → 5. Reportar em português com os `[VERIFY]` pendentes → 6. Commits pequenos em inglês (`content: add guide on X`). Push só no branch combinado; nunca abrir PR nem deploy sem o usuário pedir.

## 8. Prontidão para o AdSense

> **Regra do dono:** o objetivo atual é completar o checklist de aprovação do AdSense em `docs/checklist-adsense.md`. **Ao final de toda resposta**, atualize esse arquivo se algo mudou e lembre o usuário, em 2–3 linhas: (1) quantos itens faltam, (2) o próximo passo, (3) quando poderemos pedir a aprovação.

- [x] Nicho definido (curiosidades do corpo); criar as próximas categorias conforme a pauta
- [ ] Dados reais do titular em `owner.mjs` (nome, NIF, endereço, e-mail)
- [ ] ~20–30 artigos originais e interligados
- [x] Imagens (secret `UNSPLASH_ACCESS_KEY` configurado; rodar o workflow a cada artigo novo e revisar as fotos em `.unsplash-preview/`)
- [ ] Site no ar em teomundo.es com HTTPS (Cloudflare Pages)
- [ ] Google Search Console configurado
- [ ] CMP certificada configurada antes de ligar anúncios
- [ ] `adsense.client` preenchido (gera o script e o `/ads.txt`)
