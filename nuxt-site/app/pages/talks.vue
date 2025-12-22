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
                  :to="item.eventUrl ? item.eventUrl : undefined"
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
                  icon="i-hugeicons-maps-location-01"
                  :ui="{ root: 'lg:col-span-3', leadingIcon: 'size-10', title: 'text-4xl' }"
                >
                  <template #title>
                    {{ getLocationCount(talkStore.stats.locations) }}
                    <small class="text-sm text-muted uppercase">countries</small>
                  </template>

                  <template #footer>
                    <UTable
                      :data="
                        getCountriesSortedByPercentage(talkStore.stats, 5).map((country) => ({
                          country: country.country,
                          percentage: country.percentage + '%',
                        }))
                      "
                      class="mt-4"
                      :ui="{
                        thead: 'hidden',
                        td: 'py-1.5',
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
  import type { TabsItem } from '@nuxt/ui'
  import { getCountriesSortedByPercentage, getTimelineItems, getLocationCount } from '~/utils/Talk'

  const presentations = usePresentationsStore()
  const talkStore = useTalksStore()

  // Use consolidated function for timeline items
  const timeline = getTimelineItems(talkStore.value.talks)

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
