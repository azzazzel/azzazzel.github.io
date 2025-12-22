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
  // Calculate all stats using consolidated function
  talkStore.value.stats = calculateTalkStats(talkStore.value.talks)

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
