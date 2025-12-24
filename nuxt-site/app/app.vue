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
    queryCollection('pages').where('id', '=', '_site.yaml').first(),
  )
  siteConfig.value = (siteConfigData.value?.body as unknown as SiteConfig) || {}

  const title = siteConfig.value.title || ''
  const description = siteConfig.value.description || ''
  const image = '/img/MilenDyankov.jpg'

  useSeoMeta({
    title,
    description,
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
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
  })
</script>
