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

      <template #talks> talks content </template>
    </UTabs>
  </UContainer>
</template>

<script lang="ts" setup>
  import { pre } from '#build/ui/prose'
  import type { TabsItem } from '@nuxt/ui'

  const presentations = usePresentationsStore()
  console.log('Presentations loaded:', presentations.value)

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
