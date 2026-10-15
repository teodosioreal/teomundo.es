# Checklist de aprovação no Google AdSense — TeoMundo

> Checklist do curso, adaptado ao TeoMundo (site Astro, não WordPress).
> **Regra:** ao final de cada tarefa, o Claude atualiza este arquivo e lembra o usuário do **próximo passo** e de **quanto falta para pedir a aprovação**.
>
> Legenda: ✅ pronto · 🟡 em andamento · ⬜ falta · ➖ não se aplica / opcional

Última atualização: 15 de outubro de 2026

## Estrutura do site

| Item | Status | Observação |
|---|---|---|
| Menu com pelo menos 5 categorias e todas as páginas obrigatórias | ✅ | 5 categorias no menu (¿Por qué?, Mitos, Cuerpo y España, Récords, En 1 minuto) + todas as páginas obrigatórias (as de contato e aviso legal ainda precisam dos seus dados). |
| Página "Sobre" | ✅ | /sobre-nosotros/ |
| Política de Privacidade (obrigatória) | ✅ | /politica-de-privacidad/ (RGPD) + /politica-de-cookies/ |
| Página "Contato" | ✅ | /contacto/ com `contacto@teomundo.es` (encaminhado pelo Email Routing da Cloudflare para o Gmail do dono). Já entra no Google e no sitemap. |
| Termos de Uso (altamente recomendada) | ✅ | Condições de uso no /aviso-legal/ (padrão na Espanha), com titular TeoMundo · Brasil · contacto@teomundo.es (opção sem nome pessoal, escolhida pelo dono). Já entra no Google. |
| Página "Transparência" (opcional) | ✅ | Coberta pela /politica-editorial/ (fontes, correções, publicidade). |
| Link visível para a Home | ✅ | Logo + breadcrumb "Inicio" em todas as páginas. |
| Links para redes sociais (Instagram e Facebook) | ⬜ | Precisa criar os perfis e me passar os links. |
| Comentários ativos nos artigos | ➖ | Desligados por decisão do dono (15/10/2026); o Google não exige comentários. O site não mostra nem menciona comentários. O código fica guardado: para religar, `comments.active = true` em `site.ts` + banco D1 e senhas na Cloudflare. |
| Artigos relacionados no final dos posts | ✅ | "Sigue leyendo", "Más guías de…", "Te puede interesar" e navegação anterior/seguinte. |

## Conteúdo

| Item | Status | Observação |
|---|---|---|
| Pelo menos 50 artigos publicados | ✅ | **50 de 50.** Pauta-mestre completa. |
| Cada categoria com no mínimo 6 artigos | ✅ | ¿Por qué?: 10 · Mitos: 10 · Cuerpo y España: 10 · Récords: 10 · En 1 minuto: 10 |
| Conteúdo 100% original e de qualidade | ✅ | Texto próprio, com fontes verificadas. |
| Estratégia do Oceano Azul | ✅ | Nicho "curiosidades verificadas do corpo" com ângulo espanhol (siesta, cena tarde, calor). |
| Sem erros de ortografia ou gramática | ✅ | Revisado em espanhol da Espanha. Revisar a cada artigo novo. |
| Título, autor, categoria e data visíveis | ✅ | Em todos os artigos. |
| Assinatura do autor no final com foto, descrição e redes sociais | ✅ | "Equipo editorial de TeoMundo" (decisão do dono, sem nome pessoal): caixa no fim dos 50 artigos com selo próprio, bio verdadeira e links; página /equipo-editorial/. As redes entram sozinhas quando preenchidas em `social` (`site.ts`). |
| Sem conteúdo proibido | ✅ | — |

## Estrutura técnica

| Item | Status | Observação |
|---|---|---|
| Template leve, clean e responsivo | ✅ | Astro estático, sem JavaScript, testado em 390px. (Equivale ao "template WordPress leve".) |
| Template traduzido para o idioma do conteúdo | ✅ | 100% em espanhol da Espanha. |
| Sem links quebrados | ✅ | Revisão geral em 15/10/2026: 0 links internos quebrados em 63 páginas; 104 fontes externas testadas, 5 quebradas foram substituídas. As que aparecem como "bloqueadas" (Mayo Clinic, NEJM, BMJ, JAMA…) só barram robôs e abrem normalmente no navegador. |
| Linkagem interna entre os artigos | ✅ | Links no texto + blocos de leitura, sempre na mesma categoria. |
| Linkagem externa só para sites confiáveis | ✅ | Só fontes oficiais e científicas (Mayo Clinic, NIH, NHS, Cleveland Clinic, revistas). |
| Sem programas de afiliados ativos | ✅ | — |

## Presença digital e monitoramento

| Item | Status | Observação |
|---|---|---|
| Site com tráfego real (visitas diárias) | ⬜ | Depende de indexação no Google e de divulgação (redes sociais). |
| Domínio próprio | ✅ | teomundo.es (adequado para o público da Espanha). Confirmar que abre com HTTPS. |
| Site Kit (Analytics, AdSense, Search Console) configurado | ✅ | Equivalente ao Site Kit: Search Console verificado + sitemap enviado; AdSense no site; **Google Analytics 4** (`G-3LMJL02K9S`) em todas as páginas, com Modo de consentimento (na UE só mede quem aceitar). |
| Código do AdSense em todas as páginas + ads.txt | ✅ | `ca-pub-4087868536415962` no `<head>` das 63 páginas e /ads.txt gerado. Privacidade e cookies já citam o AdSense. |
| Google Tag Manager (extra, para campanhas) | ✅ | `GTM-ML93K698` no `<head>` e no `<body>` de todas as páginas. Não colocar o GA4 dentro do GTM (contaria em dobro). |
| Aviso de cookies visível | ✅ | Mensagem RGPD do Google (CMP certificada) publicada no AdSense em 15/10/2026, em espanhol, com Consentir / No consentir / Gestionar opciones + botão "Configuración de cookies" no rodapé. |

## Extras do próprio projeto (não estão no checklist do curso, mas pesam na aprovação)

| Item | Status | Observação |
|---|---|---|
| Imagens nos artigos | 🟡 | 43 de 50 artigos com capa (fotos revisadas uma a uma). Faltam 7 capas e 9 fotos do meio do texto: 1 última rodada (limite de ~25 fotos/hora da chave gratuita do Unsplash). |
| Dados do titular em `src/data/owner.mjs` | ✅ | Titular fora da Espanha (Brasil): marca TeoMundo + país + e-mail, sem nome pessoal (decisão do dono). Se um dia abrir CNPJ, colocar a razão social. |

## Quando pedir a aprovação

Só pedir quando **todos** estes estiverem ✅:

1. 50 artigos, com as 5 categorias com pelo menos 6 cada.
2. Autor real com foto e bio.
3. E-mail de contato e dados do titular preenchidos.
4. Redes sociais criadas e linkadas.
5. Search Console verificado, com as páginas indexadas e algumas visitas por dia.
6. Imagens nos artigos e nenhum link quebrado.

O aviso de cookies (CMP) é configurado dentro do AdSense e precisa estar ativo antes de ligar os anúncios.
