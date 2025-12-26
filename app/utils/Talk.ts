export interface TalkStore {
  talks: Talk[]
  stats: TalkStats
}

export interface Talk {
  date: Date
  event: Event
  location: Location
  recording: null | string
  talk: string
}

export interface Event {
  name: string
  url?: string
}

export interface Location {
  type: EventType
  code?: string
  country?: string
}

export enum EventType {
  Online = 'online',
  Onsite = 'onsite',
}

export interface TalkStats {
  totalTalks: number
  totalEvents: number
  locations: Record<string, number>
  titles: Record<string, number>
  years: Record<string, number>
}

export interface CountryPercentage {
  country: string
  percentage: number
  count: number
}

export interface TimelineItem {
  date: string
  title: string
  description: string
  icon: string
  eventUrl?: string
  recordingUrl: string | null
}

/**
 * Calculate all talk statistics from a list of talks
 * @param talks - Array of Talk objects
 * @returns Complete TalkStats object with all calculated statistics
 */
export function calculateTalkStats(talks: Talk[]): TalkStats {
  const stats: TalkStats = {
    totalTalks: talks.length,
    totalEvents: 0,
    locations: {},
    titles: {},
    years: {},
  }

  // Calculate total events (unique date + event name combinations)
  const eventKeys = new Set<string>()

  // Calculate other statistics
  talks.forEach((talk) => {
    // Event count
    const eventKey = talk.date + talk.event.name
    eventKeys.add(eventKey)

    // Title count
    const title = talk.talk
    stats.titles[title] = (stats.titles[title] || 0) + 1

    // Location count (onsite only)
    if (talk.location.type === 'onsite' && talk.location.country) {
      const country = talk.location.country
      stats.locations[country] = (stats.locations[country] || 0) + 1
    }

    // Year count
    const year = new Date(talk.date).getFullYear().toString()
    stats.years[year] = (stats.years[year] || 0) + 1
  })

  stats.totalEvents = eventKeys.size

  return stats
}

/**
 * Get countries sorted by talk percentage from highest to lowest
 * @param stats - TalkStats object
 * @param threshold - Optional minimum percentage threshold (default: 0)
 * @returns Array of CountryPercentage objects sorted by percentage, with "Other" category if threshold is used
 */
export function getCountriesSortedByPercentage(
  stats: TalkStats,
  threshold: number = 0,
): CountryPercentage[] {
  if (!stats.locations || !stats.totalTalks || stats.totalTalks === 0) {
    return []
  }

  const percentages: Record<string, number> = {}

  // Calculate percentages for each country
  for (const [country, count] of Object.entries(stats.locations)) {
    percentages[country] = parseFloat(((count / stats.totalTalks) * 100).toFixed(2))
  }

  // Create sorted array
  const countries = Object.entries(percentages)
    .map(([country, percentage]) => ({
      country,
      percentage,
      count: stats.locations[country] || 0,
    }))
    .sort((a, b) => b.percentage - a.percentage)

  // If threshold is specified and greater than 0, filter and add "Other" category
  if (threshold > 0) {
    const aboveThreshold = countries.filter((country) => country.percentage >= threshold)
    const belowThreshold = countries.filter((country) => country.percentage < threshold)

    // Calculate "Other" category if there are countries below threshold
    if (belowThreshold.length > 0) {
      const otherPercentage = belowThreshold.reduce((sum, country) => sum + country.percentage, 0)
      const otherCount = belowThreshold.reduce((sum, country) => sum + country.count, 0)

      aboveThreshold.push({
        country: 'Other',
        percentage: parseFloat(otherPercentage.toFixed(2)),
        count: otherCount,
      })
    }

    return aboveThreshold
  }

  return countries
}

/**
 * Transform talks into timeline items for display
 * @param talks - Array of Talk objects
 * @returns Array of TimelineItem objects ready for display
 */
export function getTimelineItems(talks: Talk[]): TimelineItem[] {
  return talks.map((talk) => {
    return {
      date: new Date(talk.date).toLocaleDateString('en', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      title: talk.event.name,
      description: talk.talk,
      icon:
        talk.location.type === 'online'
          ? 'i-carbon-virtual-desktop'
          : 'i-emojione-flag-for-' + talk.location.country?.toLowerCase().replace(' ', '-'),
      eventUrl: talk.event.url,
      recordingUrl: talk.recording,
    }
  })
}

/**
 * Get the count of unique locations from the locations record
 * @param locations - Record<string, number> where keys are location identifiers
 * @returns Number of unique locations, or 0 if locations is undefined/null
 */
export function getLocationCount(locations: Record<string, number> | undefined): number {
  if (!locations) return 0
  return Object.keys(locations).length
}
