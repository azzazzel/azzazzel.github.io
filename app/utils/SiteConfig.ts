export interface SiteConfig {
  title?: string
  teaser?: string
  logo?: string
  description?: string
  hero?: Hero
  about?: About
  experience?: Experience
  presence?: Presence[]
  pages?: Page[]
}

export interface About {
  title: string
  offers: Offer[]
}

export interface Offer {
  title: string
  icon: string
  description: string
}

export interface Experience {
  title: string
  clients: Client[]
  content: string
}

export interface Client {
  name: string
  type: string
  icon: null | string
}

export interface Hero {
  headline: string
  image: Image
}

export interface Image {
  src: string
  alt: string
}

export interface Page {
  title: string
  path: string
}

export interface Presence {
  label: string
  link: string
  icon: string
}
