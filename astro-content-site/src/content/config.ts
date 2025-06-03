import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    pubDate: z.date().optional().default(() => new Date()),
  }),
});

export const collections = {
  'blog': blogCollection,
};
