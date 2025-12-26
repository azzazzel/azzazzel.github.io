export default defineAppConfig({
  ui: {
    header: {
      slots: {
        right: 'hidden lg:flex items-center justify-end lg:flex-1 gap-1.5',
      },
    },
  },

  site: {
    title: 'Milen Dyankov',
    teaser: 'Software architecture | DevEx | Practical AI',
    logo: '/img/avatar.png',
    description:
      'A professional with decades of hands-on experience, helping developers and organizations make sound decisions around software architecture, developer experience, and practical AI adoption.',
    og_img: '/img/MilenDyankov.jpg',

    presence: [
      {
        label: 'Bluesky',
        link: 'https://bsky.app/profile/milendyankov.com',
        icon: 'i-simple-icons-bluesky',
      },
      {
        label: 'Mastodon',
        link: 'https://fosstodon.org/@milendyankov',
        icon: 'i-simple-icons-mastodon',
      },
      {
        label: 'X',
        link: 'https://x.com/milendyankov',
        icon: 'i-simple-icons-x',
      },
      {
        label: 'LinkedIn',
        link: 'https://www.linkedin.com/in/milendyankov',
        icon: 'i-simple-icons-linkedin',
      },
      {
        label: 'GitHub',
        link: 'https://github.com/azzazzel',
        icon: 'i-simple-icons-github',
      },
      { label: 'Slides', link: 'http://www.slidr.io/azzazzel', icon: 'i-simple-icons-slides' },
      { label: 'Email', link: 'mailto:milendyankov@gmail.com', icon: 'i-ic-baseline-email' },
      { label: 'RSS feed', link: '/feed.xml', icon: 'i-ic-rss-feed' },
    ],
    pages: [
      { title: 'Blog', path: '/blog' },
      { title: 'Talks', path: '/talks' },
    ],
  },
})
