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

  const title = siteConfig.value.title || ''
  const description = siteConfig.value.description || ''

  useSeoMeta({
    title,
    description,
  })
</script>
