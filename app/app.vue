<template>
  <NuxtRouteAnnouncer />

  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
  const appConfig = useAppConfig()
  const siteConfig = appConfig.site

  const title = siteConfig.title || ''
  const description = siteConfig.description || ''
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
    title,
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
