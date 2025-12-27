import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    // not needed but the feed generator expects a collection named `content`
    content: defineCollection({
      type: 'page',
      source: '_content/*',
    }),
    pages: defineCollection({
      type: 'page',
      source: {
        include: 'pages/*.yaml',
        prefix: '../',
      },
    }),
    talks: defineCollection({
      type: 'data',
      schema: z.object({
        date: z.date(),
        event: z.object({
          name: z.string(),
          url: z.string().url(),
        }),
        location: z.object({
          type: z.string(),
          code: z.string().optional(),
          country: z.string().optional(),
        }),
        talk: z.string(),
        recording: z.string().url(),
      }),
      source: {
        include: 'talks/*.yaml',
        prefix: '../',
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
        image: z.string().optional().default(''),
        twitter: z.string().optional(),
      }),
      source: {
        include: 'posts/**',
        prefix: '/',
      },
    }),
    certs: defineCollection({
      type: 'data',
      schema: z.object({
        date: z.string().date(),
        title: z.object({
          orig: z.string().optional(),
          en: z.string(),
        }),
        file: z.object({
          path: z.string(),
          lang: z.string(),
          type: z.string(),
        }),
      }),
      source: {
        include: 'certs/*.yaml',
        prefix: '/',
      },
    }),
    testimonials: defineCollection({
      type: 'data',
      schema: z.object({
        date: z.string().date(),
        by: z.string(),
        source: z.string().optional(),
        category: z.string(),
        text: z.string(),
      }),
      source: {
        include: 'testimonials/*.yaml',
        prefix: '/',
      },
    }),
  },
})
