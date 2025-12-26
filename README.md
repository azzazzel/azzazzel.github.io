# Milen Dyankov's Personal Website

This is the source code for Milen Dyankov's personal website, built with Nuxt Content and Nuxt UI. The site showcases Milen's professional work in software architecture, developer experience, and practical AI adoption.

## About the Site

The website features:

- Professional portfolio and areas of focus
- Blog with technical articles and insights
- Information about consulting services
- Speaking engagements and past client work
- Contact information and social media presence

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

## Project Structure

- `app/` - Nuxt application code (pages, components, layouts)
- `content/` - Markdown content for blog posts and site configuration
- `content/site.yaml` - Main site configuration file (see below)
- `public/` - Static assets (images, favicon)

## Site Configuration

The `content/site.yaml` file contains all the main site configuration including:

- **Site metadata**: Title, description, logo, and teaser
- **Hero section**: Headline and featured image
- **About section**: Areas of focus and service offerings
- **Experience**: Past client engagements and professional background
- **Online presence**: Social media links and contact information
- **Navigation**: Main site pages and their paths

This YAML file serves as the central configuration hub that drives the site's content and structure. Changes to this file will automatically update the corresponding sections throughout the website.

## Content Management

Blog posts are stored as Markdown files in `content/posts/` with frontmatter metadata. The site uses Nuxt Content for content management and rendering.

## Deployment

The site is configured for static generation and can be deployed to any static hosting platform. Check out the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## License

This is a personal website project and the content is copyrighted by Milen Dyankov. The code is available for reference but not intended for redistribution without permission.
