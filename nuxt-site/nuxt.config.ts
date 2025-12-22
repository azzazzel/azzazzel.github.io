// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/eslint',
    'nuxt-gtag',
    'nuxt-disqus',
    '@nuxt/scripts',
    'nuxt-llms',
    'nuxt-feedme',
    '@nuxt/fonts',
  ],
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            // Default theme (same as single string)
            default: 'github-light',
            // Theme used if `html.dark`
            dark: 'github-dark',
            // Theme used if `html.sepia`
            sepia: 'monokai',
          },
          langs: ['java', 'xml', 'groovy', 'kotlin', 'bash', 'yaml', 'shell', 'perl'],
        },
      },
      transformers: ['~/transformers/blog-path'],
    },
  },
  compatibilityDate: '2024-04-03',

  runtimeConfig: {
    public: {
      siteUrl: 'https://milendyankov.com',
    },
  },

  gtag: {
    id: 'G-PML7RDD94S',
  },

  disqus: {
    shortname: 'milendyankovcom',
  },

  llms: {
    domain: 'milendyankov.com',
    title: 'Milen Dyankov Blog',
    full: {
      title: 'Full Content',
      description: 'The full content of this website',
    },
  },

  feedme: {
    feeds: {
      common: {
        collections: ['posts'], // Use the 'posts' collection for RSS feeds
        fixDateFields: true,
        feed: {
          title: 'Milen Dyankov Blog',
          description: 'Latest blog posts and articles',
          copyright: '© 2025 Milen Dyankov',
          link: 'https://milendyankov.com/blog',
        },
        replace: [
          ['/assets/', 'https://milendyankov.com/assets/'],
          ['/img/', 'https://milendyankov.com/img/'],
        ],
        mapping: [['link', 'path']],
        item: { title: 'AAA' },
      },
      routes: {
        '/feed.xml': {
          feed: {
            title: 'Milen Dyankov Blog', // because `title` in `common` doesn't work
          },
        },
        '/feed.atom': {
          feed: {
            title: 'Milen Dyankov Blog', // because `title` in `common` doesn't work
          },
        },
        '/feed.json': {
          feed: {
            title: 'Milen Dyankov Blog', // because `title` in `common` doesn't work
          },
        },
      },
    },
  },
})