# Checklist de aprovação no Google AdSense — TeoMundo

> Checklist do curso, adaptado ao TeoMundo (site Astro, não WordPress).
> **Regra:** ao final de cada tarefa, o Claude atualiza este arquivo e lembra o usuário do **próximo passo** e de **quanto falta para pedir a aprovação**.
>
> Legenda: ✅ pronto · 🟡 em andamento · ⬜ falta · ➖ não se aplica / opcional

Última atualização: 15 de outubro de 2026

## Estrutura do site

| Item | Status | Observação |
|---|---|---|
| Menu com pelo menos 5 categorias e todas as páginas obrigatórias | 🟡 | 1 de 5 categorias (¿Por qué?). As outras 4 da pauta (Mitos, Cuerpo y España, Récords, En 1 minuto) entram no menu sozinhas ao publicar o 1º artigo de cada. |
| Página "Sobre" | ✅ | /sobre-nosotros/ |
| Política de Privacidade (obrigatória) | ✅ | /politica-de-privacidad/ (RGPD) + /politica-de-cookies/ |
| Página "Contato" | 🟡 | Existe (/contacto/), mas falta o **e-mail real**. Fica fora do Google até ter e-mail. |
| Termos de Uso (altamente recomendada) | 🟡 | As condições de uso estão no /aviso-legal/ (padrão na Espanha). Falta preencher os **dados do titular** (nome, NIF/NIE, endereço). |
| Página "Transparência" (opcional) | ✅ | Coberta pela /politica-editorial/ (fontes, correções, publicidade). |
| Link visível para a Home | ✅ | Logo + breadcrumb "Inicio" em todas as páginas. |
| Links para redes sociais (Instagram e Facebook) | ⬜ | Precisa criar os perfis e me passar os links. |
| Comentários ativos nos artigos | 🟡 | Código pronto e testado (todos os artigos, com moderação em /moderar). Falta você criar o banco D1 e as 2 senhas na Cloudflare (passo a passo no relatório). |
| Artigos relacionados no final dos posts | ✅ | "Sigue leyendo", "Más guías de…", "Te puede interesar" e navegação anterior/seguinte. |

## Conteúdo

| Item | Status | Observação |
|---|---|---|
| Pelo menos 50 artigos publicados | 🟡 | **10 de 50.** A pauta-mestre já tem os 50 temas. |
| Cada categoria com no mínimo 6 artigos | 🟡 | ¿Por qué?: 10 ✅ · Mitos: 0 · Cuerpo y España: 0 · Récords: 0 · En 1 minuto: 0 |
| Conteúdo 100% original e de qualidade | ✅ | Texto próprio, com fontes verificadas. |
| Estratégia do Oceano Azul | ✅ | Nicho "curiosidades verificadas do corpo" com ângulo espanhol (siesta, cena tarde, calor). |
| Sem erros de ortografia ou gramática | ✅ | Revisado em espanhol da Espanha. Revisar a cada artigo novo. |
| Título, autor, categoria e data visíveis | ✅ | Em todos os artigos. |
| Assinatura do autor no final com foto, descrição e redes sociais | ⬜ | Precisa de um **autor real**: nome, foto, bio curta e redes. Hoje aparece "Equipo editorial de TeoMundo". |
| Sem conteúdo proibido | ✅ | — |

## Estrutura técnica

| Item | Status | Observação |
|---|---|---|
| Template leve, clean e responsivo | ✅ | Astro estático, sem JavaScript, testado em 390px. (Equivale ao "template WordPress leve".) |
| Template traduzido para o idioma do conteúdo | ✅ | 100% em espanhol da Espanha. |
| Sem links quebrados | 🟡 | Links internos OK no build. Falta rodar o workflow **"Conferir links das fontes"** (aba Actions do GitHub). |
| Linkagem interna entre os artigos | ✅ | Links no texto + blocos de leitura, sempre na mesma categoria. |
| Linkagem externa só para sites confiáveis | ✅ | Só fontes oficiais e científicas (Mayo Clinic, NIH, NHS, Cleveland Clinic, revistas). |
| Sem programas de afiliados ativos | ✅ | — |

## Presença digital e monitoramento

| Item | Status | Observação |
|---|---|---|
| Site com tráfego real (visitas diárias) | ⬜ | Depende de indexação no Google e de divulgação (redes sociais). |
| Domínio próprio | ✅ | teomundo.es (adequado para o público da Espanha). Confirmar que abre com HTTPS. |
| Site Kit (Analytics, AdSense, Search Console) configurado | ⬜ | O Site Kit é só para WordPress. Aqui o equivalente é: **Google Search Console** (verificar o domínio) + **Google Analytics 4** (me passar o ID `G-...`). |
| Aviso de cookies visível | ⬜ | Obrigatório na Espanha quando ligar Analytics ou AdSense. Usar a CMP do próprio Google (AdSense → Privacidade e mensagens). |

## Extras do próprio projeto (não estão no checklist do curso, mas pesam na aprovação)

| Item | Status | Observação |
|---|---|---|
| Imagens nos artigos | ⬜ | Secret `UNSPLASH_ACCESS_KEY` + workflow "Buscar imagens do Unsplash". |
| Dados do titular em `src/data/owner.mjs` | ⬜ | Nome, NIF/NIE, endereço, e-mail (exigência da lei espanhola LSSI). |

## Quando pedir a aprovação

Só pedir quando **todos** estes estiverem ✅:

1. 50 artigos, com as 5 categorias com pelo menos 6 cada.
2. Autor real com foto e bio.
3. E-mail de contato e dados do titular preenchidos.
4. Redes sociais criadas e linkadas.
5. Search Console verificado, com as páginas indexadas e algumas visitas por dia.
6. Imagens nos artigos e nenhum link quebrado.

O aviso de cookies (CMP) é configurado dentro do AdSense e precisa estar ativo antes de ligar os anúncios.
