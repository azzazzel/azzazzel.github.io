# Talk Stats Consolidation Plan

## Current State Analysis

### Files Involved:

- `app/utils/Talk.ts` - Type definitions only
- `app/app.vue` - Basic stats calculations (lines 30-60)
- `app/pages/talks.vue` - Additional stats calculations (lines 186-236)

### Current Calculations:

**app.vue:**

- `totalTalks`: Simple count of talks
- `totalEvents`: Count of unique (date + event name) combinations
- `titles`: Count of talks by title
- `locations`: Count of onsite talks by country

**talks.vue:**

- `getLocationCount`: Count of unique countries
- `getTalksPercentagePerCountry`: Percentage calculation
- `getCountriesSortedByPercentage`: Sorting and formatting
- `timeline`: Transformation of talks for display

## Proposed Consolidated Structure

### New Talk.ts Structure:

```typescript
// Types (existing)
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

// ... other existing types ...

// New: Utility functions for stats calculations
export function calculateTalkStats(talks: Talk[]): TalkStats {
  // Calculate all stats in one place
}

export function getTimelineItems(talks: Talk[]): TimelineItem[] {
  // Transform talks for timeline display
}

export function getCountriesWithPercentages(stats: TalkStats): CountryPercentage[] {
  // Calculate and sort country percentages
}
```

### Changes to app.vue:

- Remove all stats calculation logic
- Simply update talks and call `calculateTalkStats`
- Store will automatically update with calculated stats

### Changes to talks.vue:

- Remove all calculation functions
- Use pre-calculated stats from store
- Use utility functions from Talk.ts for transformations

## Implementation Steps:

1. Add utility functions to `Talk.ts`
2. Update `app.vue` to use consolidated approach
3. Update `talks.vue` to use pre-calculated stats
4. Test the implementation

## Benefits:

- Single source of truth for all calculations
- Better separation of concerns
- Easier to maintain and test
- More consistent data across the application
