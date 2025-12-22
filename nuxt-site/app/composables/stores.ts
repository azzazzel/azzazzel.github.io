export const useSiteStore = () => useState<SiteConfig>('site-config', () => ({}))
export const usePresentationsStore = () => useState<Presentations[]>('presentations', () => [])
export const useTalksStore = () =>
  useState<TalkStore>('talks', () => {
    return {
      talks: [] as Talk[],
      stats: {
        totalTalks: 0,
        totalEvents: 0,
        locations: {},
        titles: {},
        years: {},
      },
    }
  })
