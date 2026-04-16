// https://nuxt.com/docs/api/configuration/nuxt-config

const yearInSeconds = 365 * 24 * 60 * 60
const domain = 'MilenDyankov.com'
const siteUrl = 'https://' + domain
const title = "Milen Dyankov's Website"

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/eslint',
    'nuxt-disqus',
    '@nuxt/scripts',
    'nuxt-llms',
    'nuxt-feedme',
    '@nuxt/fonts',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxt/content',
    '@barzhsieh/nuxt-content-mermaid',
  ],
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },

  site: {
    url: domain,
    name: 'Milen Dyankov',
    description: title,
    trailingSlash: false,
  },

  sitemap: {
    autoLastmod: true,
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
          langs: ['java', 'xml', 'groovy', 'kotlin', 'bash', 'yaml', 'shell', 'perl', 'json'],
        },
      },
      transformers: ['~/transformers/blog-path'],
    },
  },
  compatibilityDate: '2024-04-03',

  runtimeConfig: {
    public: {
      siteUrl: siteUrl,
    },
  },

  routeRules: {
    '/about': { redirect: '/' },
    '/certificates': { redirect: '/' },
    '/posts': { redirect: '/blog' },
    '/blog/2025/01/Multi-Hat-Disorder-Building-Personal-Website-Like-an-Enterprise-App': {
      redirect: '/blog/2026/01/Multi-Hat-Disorder-Building-Personal-Website-Like-an-Enterprise-App',
    },
    '/blog/2016/09/microservices_or_%CE%BCServices/': {
      redirect: '/blog/2016/09/microservices_or_Services',
    },
    '/blog/2026/04/The_Inference_Engine_Bringing_Models_to_Life': {
      redirect: '/blog/2026/04/The-Inference-Engine-Bringing-Models-to-Life',
    },
    conferencetracker: { redirect: '/ConferenceTracker' }, // dedicated GitHub repo
  },

  scripts: {
    registry: {
      googleTagManager: {
        id: 'GTM-N2XCQ4B7',
      },
    },
  },

  disqus: {
    shortname: 'milendyankovcom',
  },

  llms: {
    domain: siteUrl,
    title: title,
    full: {
      title: 'Full Content',
      description: 'The full content of this website',
    },
    sections: [
      {
        title: 'Pages',
        links: [
          {
            title: 'Home page',
            description: 'About Milen Dyankov',
            href: '/',
          },
          {
            title: 'Blog',
            description: "Milen Dyankov's blog",
            href: '/blog',
          },
          {
            title: 'Talks',
            description: "Milen Dyankov's talks and presentations",
            href: '/talks',
          },
        ],
      },
    ],
  },

  feedme: {
    feeds: {
      common: {
        collections: ['posts'], // Use the 'posts' collection for RSS feeds
        fixDateFields: true,
        feed: {
          title: title,
          description: 'Latest blog posts and articles',
          copyright: '© 2025 Milen Dyankov',
          link: siteUrl + '/blog',
        },
        replace: [
          ['/assets/', siteUrl + '/assets/'],
          ['/img/', siteUrl + '/img/'],
        ],
        mapping: [['link', 'path']],
      },
      routes: {
        '/feed.xml': {
          feed: {
            title: title, // because `title` in `common` doesn't work
          },
        },
        '/feed.atom': {
          feed: {
            title: title, // because `title` in `common` doesn't work
          },
        },
        '/feed.json': {
          feed: {
            title: title, // because `title` in `common` doesn't work
          },
        },
      },
    },
  },

  nitro: {
    routeRules: {
      '/_nuxt/**': {
        headers: { 'cache-control': `public,max-age=${yearInSeconds},s-maxage=${yearInSeconds}` },
      },
      '/_ipx/**': {
        headers: { 'cache-control': `public,max-age=${yearInSeconds},s-maxage=${yearInSeconds}` },
      },
      '/_fonts/**': {
        headers: { 'cache-control': `public,max-age=${yearInSeconds},s-maxage=${yearInSeconds}` },
      },
    },
    hooks: {
      'prerender:generate'(route) {
        if (route.fileName?.endsWith('/index.html') && route.fileName !== '/index.html') {
          route.fileName = route.fileName.replace(/\/index\.html$/, '.html')
        }
      },
    },
  },

  image: {
    screens: {
      sm: 320,
      md: 640,
      lg: 1024,
    },

    format: ['webp'],
  },
})
