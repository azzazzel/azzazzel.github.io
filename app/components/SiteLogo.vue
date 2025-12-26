<template>
  <UUser
    class="site-logo"
    to="/"
    :name="siteConfig.title"
    :description="siteConfig.teaser"
    :avatar="avatar"
    size="3xl"
  />
</template>

<script setup lang="ts">
  const siteConfig = useSiteStore()
  const avatar = {
    src: siteConfig.value.logo || '/logo.png',
    icon: 'i-lucide-image',
  }
</script>

<style scoped>
  .site-logo :deep([data-slot='description']) {
    font-size: small;
    font-variant: small-caps;
  }
</style>
