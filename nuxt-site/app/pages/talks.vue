<template>
  <UContainer>
    <UPageHeader
      headline="Experience Shared"
      title="Talks & Presentations"
      description="Presentation materials and speaking engagements reflecting hands-on experience and lessons learned."
      class="mb-16"
      :ui="{
        root: 'border-b-0 mt-16',
      }"
    >
    </UPageHeader>
    <UTabs
      :items="tabs"
      variant="link"
      :ui="{ trigger: 'grow' }"
      class="gap-4 w-full"
    >
      <template #slides="{ item }">
        <p class="text-muted mb-16 bt-8">
          {{ item.description }}
        </p>
        <UBlogPosts>
          <UBlogPost
            v-for="(presentation, index) in presentations"
            :key="index"
            :title="presentation.title"
            :image="presentation.thumbnail"
            :date="
              new Date(presentation.premiere as Date).toLocaleDateString('en', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })
            "
            variant="ghost"
            class="y-8"
          >
            <template #footer>
              <div class="text-right">
                <UModal
                  v-if="presentation.abstract"
                  :title="presentation.title"
                >
                  <UButton
                    icon="i-mdi-magnify-expand"
                    size="xl"
                    color="neutral"
                    variant="ghost"
                  />
                  <template #body>
                    <UBlogPost
                      title="Abstract"
                      :image="presentation.thumbnail"
                      :description="presentation.abstract || ''"
                      variant="ghost"
                    />
                  </template>
                </UModal>
                <UButton
                  icon="i-simple-icons-slides"
                  color="neutral"
                  variant="ghost"
                  size="xl"
                  :href="presentation.url"
                  target="_blank"
                />
              </div>
            </template>
          </UBlogPost>
        </UBlogPosts>
      </template>

      <template #talks="{ item }">
        <p class="text-muted mb-16 bt-8">
          {{ item.description }}
        </p>
        <UPage :ui="{ left: 'lg:col-span-3', center: 'lg:col-span-7' }">
          <UTimeline
            :items="timeline"
            size="3xl"
            :ui="{
              container: 'lg:ml-35 ml-25',
              wrapper: 'mt-0 pb-0',
              date: ' pt-3 text-right w-50 -translate-x-70 ',
              title: '-translate-y-5',
              description: '-translate-y-5',
            }"
          >
            <template #title="{ item }">
              <div class="font-extrabold">
                <ULink
                  :to="item.eventUrl ?? null"
                  :external="true"
                  target="_blank"
                >
                  {{ item.title }}
                  <UIcon
                    v-if="item.eventUrl"
                    name="i-fluent-window-new-24-regular"
                    class="size-4"
                  />
                </ULink>
              </div>
            </template>

            <template #description="{ item }">
              {{ item.description }}
              <UButton
                v-if="item.recordingUrl"
                :href="item.recordingUrl"
                icon="i-lsicon-file-movie-outline"
                size="md"
                variant="ghost"
                target="_blank"
                class="p-0 translate-y-1"
              />
            </template>
          </UTimeline>
          <template #left>
            <UContainer class="pb-10">
              <UPageGrid>
                <UPageCard
                  icon="i-hugeicons-presentation-online"
                  :ui="{ root: 'lg:col-span-3', leadingIcon: 'size-10', title: 'text-4xl' }"
                >
                  <template #title>
                    {{ talkStore.stats.totalTalks }}
                    <span class="text-sm text-muted uppercase">talks</span>
                  </template>
                </UPageCard>
                <UPageCard
                  icon="i-hugeicons-user-group"
                  :ui="{ root: 'lg:col-span-3', leadingIcon: 'size-10', title: 'text-4xl' }"
                >
                  <template #title>
                    {{ talkStore.stats.totalEvents }}
                    <small class="text-sm text-muted uppercase">gatherings</small>
                  </template>
                </UPageCard>
                <UPageCard
                  icon="i-hugeicons-user-group"
                  :ui="{ root: 'lg:col-span-3', leadingIcon: 'size-10', title: 'text-4xl' }"
                >
                  <template #title>
                    {{ getLocationCount(talkStore.stats.locations) }}
                    <small class="text-sm text-muted uppercase">countries</small>
                  </template>

                  <template #footer>
                    <UTable
                      :data="
                        getCountriesSortedByPercentage().map((country) => ({
                          country: country.country,
                          percentage: country.percentage + '%',
                        }))
                      "
                      class="mt-4"
                      :ui="{
                        thead: 'hidden',
                      }"
                    />
                  </template>
                </UPageCard>
              </UPageGrid>
            </UContainer>
          </template>
        </UPage>
      </template>
    </UTabs>
  </UContainer>
</template>

<script lang="ts" setup>
  import type { TabsItem, TimelineItem, TableColumn } from '@nuxt/ui'
  import { h } from 'vue'

  const presentations = usePresentationsStore()
  const talkStore = useTalksStore()

  /**
   * Gets the count of unique locations from the locations record
   * @param locations - Record<string, number> where keys are location identifiers
   * @returns Number of unique locations, or 0 if locations is undefined/null
   */
  const getLocationCount = (locations: Record<string, number> | undefined): number => {
    if (!locations) return 0
    return Object.keys(locations).length
  }

  /**
   * Calculates the percentage of talks per country
   * @param locations - Record<string, number> where keys are country codes and values are talk counts
   * @param totalTalks - Total number of talks
   * @returns Record<string, number> with country codes as keys and percentages as values
   */
  const getTalksPercentagePerCountry = (
    locations: Record<string, number> | undefined,
    totalTalks: number,
  ): Record<string, number> => {
    if (!locations || totalTalks === 0) return {}

    const percentages: Record<string, number> = {}

    for (const [country, count] of Object.entries(locations)) {
      percentages[country] = parseFloat(((count / totalTalks) * 100).toFixed(2))
    }

    return percentages
  }

  // Computed property for talks percentage per country
  const talksPercentagePerCountry = computed(() =>
    getTalksPercentagePerCountry(talkStore.value.stats.locations, talkStore.value.stats.totalTalks),
  )

  /**
   * Gets countries sorted by talk percentage from highest to lowest
   * @returns Array of objects with country code, percentage, and count
   */
  const getCountriesSortedByPercentage = () => {
    const percentages = talksPercentagePerCountry.value
    const locations = talkStore.value.stats.locations

    if (!percentages || !locations || Object.keys(percentages).length === 0) {
      return []
    }

    return Object.entries(percentages)
      .map(([country, percentage]) => ({
        country,
        percentage,
        count: locations[country] || 0,
      }))
      .sort((a, b) => b.percentage - a.percentage)
  }

  const timeline: TimelineItem[] = talkStore.value.talks.map((talk) => {
    return {
      date: new Date(talk.date).toLocaleDateString('en', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      title: talk.event.name,
      description: talk.talk,
      icon:
        talk.location.type == 'online'
          ? 'i-carbon-virtual-desktop'
          : 'i-emojione-flag-for-' + talk.location.country?.toLowerCase().replace(' ', '-'),
      eventUrl: talk.event.url,
      recordingUrl: talk.recording,
    }
  })

  const tabs = [
    {
      label: 'Delivered Talks',
      description: 'A record of talks delivered, with dates, events, and available recordings.',
      icon: 'i-carbon-group-presentation',
      slot: 'talks' as const,
    },
    {
      label: 'Slide decks',
      description: 'Slide decks, abstracts, and supporting materials from delivered talks.',
      icon: 'i-material-symbols-picture-as-pdf-outline',
      slot: 'slides' as const,
    },
  ] satisfies TabsItem[]
</script>

<style></style>
