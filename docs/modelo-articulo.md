# Modelo de artigo

Copie o bloco abaixo para `src/content/articulos/<slug>.md` (o nome do arquivo vira a URL `/<categoria>/<slug>/`).

```markdown
---
title: "Título para o Google (≤ 60 caracteres)"
description: "Meta description com a keyword principal (≤ 155 caracteres)."
h1: "Título principal que responde à busca"
category: nombre-de-la-categoria   # precisa existir em src/data/site.ts
primaryKeyword: "keyword principal"
secondaryKeywords: ["variação 1", "variação 2"]
datePublished: 2026-11-01          # data futura = artigo agendado
dateModified: 2026-11-01
imageQuery: "busca em inglês para a capa no Unsplash"
keyTakeaways:
  - "Primeiro ponto-chave."
  - "Segundo ponto-chave."
  - "Terceiro ponto-chave."
faq:
  - q: "¿Pregunta real de búsqueda?"
    a: "Respuesta corta y directa."
sources:
  - title: "Nombre de la fuente oficial"
    url: "https://..."
related: ["slug-de-otro-articulo", "slug-de-otro-mas"]
next: "slug-del-mejor-articulo-para-leer-despues"
---

Abertura com a situação real do leitor e a **resposta direta em negrito**.

## Primeiro subtítulo natural

Texto...

<!-- unsplash: busca em inglês para uma foto no meio do texto -->

## Segundo subtítulo natural

<div class="botones">
  <p>¿Quieres ir un paso más allá?</p>
  <a class="boton" href="/categoria/slug/">Lee la guía sobre X</a>
</div>
```
