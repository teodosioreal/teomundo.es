import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { categories } from './data/site';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articulos' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(60),
      description: z.string().max(155),
      h1: z.string(),
      // Precisa existir em `categories` (src/data/site.ts).
      category: z.string().refine((c) => c in categories, {
        message: 'Categoria inexistente: adicione-a em src/data/site.ts',
      }),
      primaryKeyword: z.string(),
      secondaryKeywords: z.array(z.string()).default([]),
      datePublished: z.coerce.date(),
      dateModified: z.coerce.date(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      imageQuery: z.string().optional(),
      cover: z
        .object({
          url: z.url(),
          alt: z.string(),
          author: z.string(),
          authorUrl: z.url(),
          photoUrl: z.url(),
        })
        .optional(),
      keyTakeaways: z.array(z.string()).min(3),
      faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
      sources: z.array(z.object({ title: z.string(), url: z.url() })).default([]),
      related: z.array(z.string()).default([]),
      next: z.string().optional(),
    }),
});

export const collections = { articles };
