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

  const runtimeConfig = useRuntimeConfig()
  const route = useRoute()
  const canonicalUrl = `${runtimeConfig.public.siteUrl}${route.path}`

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
      {
        rel: 'canonical',
        href: canonicalUrl,
      },
    ],
    meta: [
      {
        name: 'follow.it-verification-code',
        content: '3y01qU3p3PQBuSVcGSmq',
      },
    ],
  })
</script>
