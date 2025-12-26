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
  const appConfig = useAppConfig()
  const siteConfig = appConfig.site
  const avatar = {
    src: siteConfig.logo || '/img/avatar.png',
    icon: 'i-lucide-image',
  }
</script>

<style scoped>
  .site-logo :deep([data-slot='description']) {
    font-size: small;
    font-variant: small-caps;
  }
</style>
