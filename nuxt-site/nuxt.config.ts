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

  gtag: {
    id: 'G-PML7RDD94S',
  },

  disqus: {
    shortname: 'milendyankovcom',
  },
})