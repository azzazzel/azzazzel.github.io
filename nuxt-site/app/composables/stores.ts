export const useSiteStore = () => useState<SiteConfig>('site-config', () => ({}))
export const usePresentationsStore = () => useState<Presentations[]>('presentations', () => [])
