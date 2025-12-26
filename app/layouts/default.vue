<script setup lang="ts">
  import type SiteHeaderVue from '~/components/SiteHeader.vue';

</script>

<template>
  <div>
    <SiteHeader />

    <UMain>
      <slot />
    </UMain>

    <SiteFooter />
  </div>
</template>
