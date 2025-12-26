<template>
  <UFooter>
    <template #left>
      <p class="text-muted text-sm">Copyright © {{ new Date().getFullYear() }}</p>
    </template>

    <template #right>
      <template
        v-for="place in presence"
        :key="place.label"
      >
        <UTooltip :text="place.label">
          <UButton
            :icon="place.icon"
            color="neutral"
            variant="ghost"
            :href="place.link"
            target="place.target"
            :aria-label="place.label"
            :external="true"
          />
        </UTooltip>
      </template>
    </template>
  </UFooter>
</template>

<script setup lang="ts">
  const siteConfig = useSiteStore()
  const presence = siteConfig.value.presence || []
</script>
