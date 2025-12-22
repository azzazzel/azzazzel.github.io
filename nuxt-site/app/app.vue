<template>
  <NuxtRouteAnnouncer />

  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
  const siteConfig = useSiteStore()

  const { data: siteConfigData } = await useAsyncData('site-config', () =>
    queryCollection('site').first(),
  )
  siteConfig.value = (siteConfigData.value?.body as unknown as SiteConfig) || {}

  const presentations = usePresentationsStore()
  const { data: presentationsData } = await useAsyncData('presentations', () =>
    queryCollection('presentations').order('premiere', 'DESC').all(),
  )
  presentations.value = (presentationsData.value as unknown as Presentations[]) || []

  const talkStore = useTalksStore()
  const { data: talksData } = await useAsyncData('talks', () =>
    queryCollection('talks').order('date', 'DESC').all(),
  )
  talkStore.value.talks = (talksData.value as unknown as Talk[]) || []
  talkStore.value.stats.totalTalks = talkStore.value.talks.length

  talkStore.value.stats.totalEvents = talkStore.value.talks.reduce(
    (acc: Set<string>, talk: Talk, index) => {
      const key = talk.date + talk.event.name
      if (index == 0) acc = new Set()
      acc.add(key)
      return acc
    },
    {} as Set<string>,
  ).size

  talkStore.value.stats.titles = talkStore.value.talks.reduce(
    (acc: Record<string, number>, talk: Talk) => {
      const key = talk.talk
      acc[key] = (acc[key] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  talkStore.value.stats.locations = talkStore.value.talks.reduce(
    (acc: Record<string, number>, talk: Talk) => {
      if (talk.location.type == 'onsite') {
        const key = talk.location.country!
        acc[key] = (acc[key] || 0) + 1
      }
      return acc
    },
    {} as Record<string, number>,
  )

  const title = siteConfig.value.title || ''
  const description = siteConfig.value.description || ''
  const image = '/img/MilenDyankov.jpg'

  useSeoMeta({
    title,
    description,
  })

  useSeoMeta({
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogUrl: 'https://milendyankov.com',
    ogSiteName: title,
    ogType: 'website',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    twitterCard: 'summary',
  })

  useHead({
    htmlAttrs: {
      lang: 'en',
    },
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon.png',
      },
    ],
  })
</script>
