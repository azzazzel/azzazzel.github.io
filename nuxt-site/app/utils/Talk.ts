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
