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

      <UPageSection>
        <UPageGrid>
          <UContainer></UContainer>
          <UContainer></UContainer>
          <UContainer>
            <div class="text-primary">
              {{ certsSction.title }}
            </div>
            <UTable
              :data="certs"
              :columns="[
                {
                  accessorKey: 'icon',
                },
                {
                  accessorKey: 'title',
                },
                {
                  accessorKey: 'file',
                },
              ]"
              class="mt-4"
              :ui="{
                thead: 'hidden',
                td: 'py-1.5 px-0.5',
              }"
            >
              <template #icon-cell="{ row }">
                <UBadge
                  size="sm"
                  variant="soft"
                  color="neutral"
                  >{{ row.original.file.lang.toUpperCase() }}</UBadge
                >
              </template>
              <template #title-cell="{ row }">
                <div class="flex items-center gap-3">
                  <div>
                    <p class="text-xs text-highlighted">
                      {{
                        row.original.title.orig ? row.original.title.orig : row.original.title.en
                      }}
                    </p>
                    <p
                      v-if="row.original.title.orig"
                      class="text-xs"
                    >
                      {{ row.original.title.en }}
                    </p>
                  </div>
                </div>
              </template>
              <template #file-cell="{ row }">
                <UButton
                  icon="i-lucide-download"
                  size="xs"
                  color="neutral"
                  variant="outline"
                  :href="row.original.file.path"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download file"
                  :external="true"
                />
              </template>
            </UTable>
          </UContainer>
        </UPageGrid>
      </UPageSection>
    </UPageBody>
  </UPage>
</template>

<script setup lang="ts">
  const siteConfig = useSiteStore()
  const { data: pageData } = await useAsyncData('home-page', () =>
    queryCollection('pages').where('path', '=', '/').first(),
  )

  const { data: certs } = await useAsyncData('home-certs', () =>
    queryCollection('certs').order('date', 'DESC').all(),
  )

  const hero = (pageData.value?.meta.hero as Hero) || { headline: '', image: { src: '', alt: '' } }
  const about = (pageData.value?.meta.about as About) || { title: '', offers: [] }
  const experience = (pageData.value?.meta.experience as Experience) || { title: '', clients: [] }
  const certsSction = (pageData.value?.meta.certs as { title: string }) || { title: '' }

  const uiReducedContainerPadding = {
    container: 'py-8 lg:py-8 sm:py-8',
  }
  const uiSmallerTitle = {
    container: 'py-2 lg:py-2 sm:py-2',
    title: 'text-xl sm:text-2xl lg:text-3xl',
  }
</script>
