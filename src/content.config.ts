import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const linkSchema = z.object({
  label: z.string(),
  url: z.url(),
});

const authorSchema = z.object({
  name: z.string(),
  self: z.boolean().default(false),
  equalContribution: z.boolean().default(false),
});

const research = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    year: z.number().int().min(1900).max(2100),
    kind: z.enum(['publication', 'project']),
    authors: z.array(authorSchema).default([]),
    venue: z.string().optional(),
    equalContributionNote: z.string().optional(),
    links: z.array(linkSchema).min(1),
    contribution: z.string().optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    detailPage: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { research, blog };
