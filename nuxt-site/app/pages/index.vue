<template>
  <UPage>
    <UPageBody>
      <UPageHero
        :headline="hero.headline"
        :title="siteConfig.title"
        :description="siteConfig.description"
        orientation="horizontal"
        :ui="uiReducedContainerPadding"
      >
        <img
          :src="hero.image.src"
          :alt="hero.image.alt"
          class="w-full rounded-lg"
        />
      </UPageHero>

      <UPageSection
        :title="about.title"
        :ui="uiReducedContainerPadding"
      >
        <UPageGrid>
          <UPageFeature
            v-for="offer in about.offers"
            :key="offer.title"
            orientation="vertical"
            :title="offer.title"
            :description="offer.description"
            :icon="offer.icon"
          />
        </UPageGrid>
      </UPageSection>

      <UPageSection
        :title="experience.title"
        :ui="uiSmallerTitle"
      >
        <UMarquee>
          <UUser
            v-for="client in experience.clients"
            :key="client.name"
            :name="client.name"
            :description="client.type"
            :avatar="
              client.icon
                ? {
                    icon: client.icon,
                  }
                : undefined
            "
            size="xl"
          />
        </UMarquee>
      </UPageSection>
    </UPageBody>
  </UPage>
</template>

<script setup lang="ts">
  const siteConfig = useSiteStore()
  const hero = siteConfig.value.hero || { headline: '', image: { src: '', alt: '' } }
  const about = siteConfig.value.about || { title: '', offers: [] }
  const experience = siteConfig.value.experience || { title: '', clients: [] }
  const uiReducedContainerPadding = {
    container: 'py-8 lg:py-8 sm:py-8',
  }
  const uiSmallerTitle = {
    container: 'py-2 lg:py-2 sm:py-2',
    title: 'text-xl sm:text-2xl lg:text-3xl',
  }
</script>
