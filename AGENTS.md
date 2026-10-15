# AGENTS.md — TeoMundo (teomundo.es)

Instruções para qualquer IA que trabalhe neste repositório (Codex, Cursor, Copilot, etc.).

**O manual completo é o [`CLAUDE.md`](./CLAUDE.md). Leia-o inteiro antes de qualquer tarefa e siga-o à risca.** Se algo aqui conflitar com ele, vale o `CLAUDE.md`.

## Regras que nunca podem ser quebradas

1. **Idiomas:** responda ao dono em **português**. Todo conteúdo publicado no site é em **espanhol da Espanha** (es-ES).
2. **Não invente nada:** nem fatos, números, estudos, leis, nomes, autores, credenciais, depoimentos ou citações. Dado só com **fonte primária real e linkada**. Dúvida → `[VERIFY: ...]` e avise o dono.
3. **Autor:** "Equipo editorial de TeoMundo". Não crie pessoas fictícias. O dono **não quer o nome pessoal no site**.
4. **Dados do titular** só em `src/data/owner.mjs`, com dados fornecidos pelo dono.
5. **Saúde (YMYL):** nada de "milagro", "garantizado", promessa de cura; todo artigo tem uma seção de quando procurar um profissional.
6. **Publicidade:** sem afiliados, produtos ou reviews sem perguntar antes. AdSense separado do conteúdo.
7. **Git:** commits pequenos em inglês; push só no branch `claude/dazzling-maxwell-u7wjg5`; não abrir PR nem fazer deploy sem o dono pedir.
8. **Antes de terminar:** `npm run build` sem erros, nenhum H2 repetido entre artigos (`grep -h "^## " src/content/articulos/*.md | sort | uniq -d` vazio), layout ok em 390px.

## Onde está cada coisa

- Manual: `CLAUDE.md` · Modelo de artigo: `docs/modelo-articulo.md` · Checklist do AdSense: `docs/checklist-adsense.md`
- Artigos: `src/content/articulos/*.md` · Configuração: `src/data/site.ts`, `src/data/owner.mjs`
- Hospedagem: Hostinger (deploy pelo GitHub), regras de servidor em `public/.htaccess`.

Ao final de cada resposta ao dono: atualize `docs/checklist-adsense.md` se algo mudou e diga quantos itens faltam, o próximo passo e quando pedir a aprovação.
