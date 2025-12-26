# Milen Dyankov's Personal Website

This is the source code for Milen Dyankov's personal website, built with Nuxt 4, Nuxt Content, and Nuxt UI. The site showcases Milen's professional work in software architecture, developer experience, and practical AI adoption.

## About the Site

The website features:

- Professional portfolio and areas of focus
- Blog with technical articles and insights (100+ posts)
- Information about consulting services
- Speaking engagements and past client work
- Contact information and social media presence
- RSS feed and content syndication

## Setup

This project uses pnpm for package management. Install dependencies with:

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```

Generate static site:

```bash
pnpm generate
```

## Project Structure

```
/app/                  # Nuxt application code
  /assets/             # CSS and static assets
  /components/         # Vue components (SiteHeader, SiteFooter, SiteLogo)
  /composables/        # Vue composables and stores
  /layouts/            # Page layouts
  /middleware/         # Route middleware
  /pages/              # Page components
    /blog/             # Blog functionality
  /plugins/            # Nuxt plugins
  /transformers/      # Content transformers
  /utils/              # Utility classes and types

/content/              # Markdown content and configuration
  /_drafts/           # Draft blog posts
  /certs/             # Certifications (YAML)
  /pages/             # Page configurations
    _site.yaml        # Main site configuration
    blog.yaml         # Blog configuration
    home.yaml         # Home page configuration
    talks.yaml        # Talks page configuration
  /posts/             # Blog posts (Markdown)
  /presentations/     # Presentation metadata
  /talks/             # Speaking engagement data
  talks.md            # Talks content

/public/              # Static files
  /assets/            # Blog post assets and images
  /img/               # Site images

/server/              # Server-side code

# Root files
nuxt.config.ts        # Nuxt configuration
package.json         # Project dependencies
README.md            # This file
```

## Key Components

- **SiteHeader.vue**: Navigation header with site branding
- **SiteFooter.vue**: Footer with copyright and links
- **SiteLogo.vue**: Site logo component
- **stores.ts**: Pinia store for state management
- **blog-path.ts**: Custom transformer for blog post paths

## Site Configuration

The `content/pages/_site.yaml` file contains the main site configuration including:

- **Site metadata**: Title, description, logo, and teaser
- **Online presence**: Social media links and contact information
- **Navigation**: Main site pages and their paths

Additional configuration files:

- `content/pages/blog.yaml`: Blog-specific configuration
- `content/pages/home.yaml`: Home page content
- `content/pages/talks.yaml`: Talks page configuration

## Content Management

Blog posts are stored as Markdown files in `content/posts/` with frontmatter metadata. The site uses:

- **Nuxt Content**: For content management and rendering
- **Markdown**: Blog posts with YAML frontmatter
- **YAML**: Configuration files for site structure
- **Custom transformers**: For processing blog post paths

Draft posts are stored in `content/_drafts/` and are not published.

## Features

- **RSS Feed**: Generated via `nuxt-feedme` module
- **SEO**: Optimized with `@nuxtjs/sitemap` and `@nuxtjs/robots`
- **Comments**: Disqus integration for blog posts
- **Analytics**: Google Tag Manager integration
- **Syntax Highlighting**: Code blocks with theme support
- **Responsive Design**: Mobile-friendly layout
- **Static Generation**: Ready for deployment to any static hosting

## Modules Used

- `@nuxt/ui`: UI components and styling
- `@nuxt/image`: Image optimization
- `@nuxt/content`: Content management
- `@nuxt/fonts`: Font management
- `@nuxt/scripts`: Script management
- `nuxt-disqus`: Comments system
- `nuxt-llms`: Large language model integration
- `nuxt-feedme`: RSS feed generation
- `@nuxtjs/sitemap`: SEO sitemap
- `@nuxtjs/robots`: Robots.txt generation

## Deployment

The site is configured for static generation and can be deployed to any static hosting platform:

```bash
pnpm generate
```

Check out the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment) for platform-specific instructions.

## License

This is a personal website project and the content is copyrighted by Milen Dyankov. The code is available for reference but not intended for redistribution without permission.
