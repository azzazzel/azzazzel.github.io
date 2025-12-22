import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    site: defineCollection({
      type: 'page',
      source: {
        include: 'site.yaml',
        prefix: '/',
      },
    }),
    presentations: defineCollection({
      type: 'data',
      schema: z.object({
        id: z.string(),
        title: z.string(),
        thumbnail: z.string().url(),
        url: z.string().url(),
        premiere: z.date().optional(),
        abstract: z.string().optional(),
      }),
      source: {
        include: 'presentations/*.yaml',
        prefix: '../',
      },
    }),
    posts: defineCollection({
      type: 'page',
      schema: z.object({
        title: z.string(),
        date: z.string(),
        description: z.string().optional(),
        categories: z.array(z.string()).optional(),
      }),
      source: {
        include: 'posts/**',
        prefix: '/',
      },
    }),
  },
})
