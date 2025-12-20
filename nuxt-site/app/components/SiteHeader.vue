<template>
  <UHeader toggle-side="left">
    <template #left>
      <SiteLogo />
    </template>

    <template #default>
      <UNavigationMenu
        :items="pages"
        variant="link"
      />
    </template>

    <template #right>
      <UColorModeSelect />
    </template>

    <template #body>
      <UNavigationMenu
        :items="pages"
        orientation="vertical"
        class="-mx-2.5"
      />
      <USeparator class="my-6" />
      <UColorModeSelect />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
  const siteConfig = useSiteStore()
  const route = useRoute()

  const pages = siteConfig.value.pages?.map((page) => ({
    label: page.title,
    to: page.path,
    active: route.path === `/${page.path}`,
  }))
</script>
