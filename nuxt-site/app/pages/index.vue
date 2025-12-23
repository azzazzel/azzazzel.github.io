<template>
  <UPage>
    <UPageBody>
      <UPageHero
        :headline="hero.headline"
        :title="siteConfig.title"
        :description="siteConfig.description"
        orientation="horizontal"
        :ui="{
          container: 'py-8 lg:py-8 sm:py-8',
        }"
      >
        <img
          :src="hero.image.src"
          :alt="hero.image.alt"
          class="w-full rounded-lg"
        />
      </UPageHero>

      <UPageSection
        :title="about.title"
        :description="about.description"
        :ui="{
          container: 'py-8 lg:py-8 sm:py-8',
          description: 'sm:text-xl text-highlighted',
        }"
      />

      <UPageSection
        :title="servicesSection.title"
        :ui="{
          container: 'py-8 lg:py-8 sm:py-8',
        }"
      >
        <UPageGrid>
          <UPageFeature
            v-for="offer in servicesSection.offers"
            :key="offer.title"
            orientation="vertical"
            :title="offer.title"
            :icon="offer.icon"
            :ui="{
              title: 'text-lg',
              leadingIcon: 'size-10',
            }"
          >
            <template #description>
              {{ offer.description }}
              <div class="text-primary my-5">What it covers:</div>
              <UPageList>
                <UPageFeature
                  v-for="(item, index) in offer.includes"
                  :key="index"
                  :description="item"
                  icon="ic-baseline-check"
                  class="my-1"
                />
              </UPageList>
            </template>
          </UPageFeature>
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

      <UPageSection
        :title="testimonialsSection.title"
        :ui="{
          container: 'py-8 lg:py-8 sm:py-8',
        }"
      >
        <UPageGrid>
          <UContainer class="col-span-2">
            <div class="text-primary pb-3">
              {{ testimonialsSection.recommendations.title }}
            </div>
            <UPageColumns :ui="{ base: 'lg:columns-2' }">
              <UPageCard
                v-for="(testimonial, index) in testimonials"
                :key="index"
                variant="subtle"
                :icon="testimonialIcon(testimonial.category)"
                :description="testimonial.text"
                :ui="{
                  container: 'p-3 lg:p-3 sm:p-3',
                  description: 'text-sm',
                }"
              >
                <template #description>
                  <blockquote>"{{ testimonial.text }}"</blockquote>
                  <span class="float-right italic mt-3 text-mited">{{ testimonial.by }}</span>
                </template>
              </UPageCard>
            </UPageColumns>
          </UContainer>
          <UContainer>
            <div class="text-primary">
              {{ testimonialsSection.certs.title }}
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
                  icon="i-ph-file-pdf-light"
                  size="md"
                  color="neutral"
                  variant="ghost"
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

      <UPageCTA
        :title="ctaSection.title"
        :description="ctaSection.description"
        orientation="horizontal"
        :ui="{
          container: 'lg:grid-cols-3',
          wrapper: 'col-span-2',
        }"
      >
        <template #default>
          <UPageList>
            <UPageFeature
              v-for="(method, index) in ctaSection.methods"
              :key="index"
              :description="method.text"
              :icon="method.icon"
              class="my-1"
            >
              <template #description>
                <NuxtLink
                  v-if="method.link"
                  :href="method.link"
                  target="_blank"
                  external
                  class="text-primary border-b border-transparent hover:border-primary"
                  >{{ method.text }}</NuxtLink
                >
              </template>
            </UPageFeature>
          </UPageList>
        </template>
      </UPageCTA>
    </UPageBody>
  </UPage>
</template>

<script setup lang="ts">
  import type { icon } from '#build/ui/prose'

  const siteConfig = useSiteStore()
  const { data: pageData } = await useAsyncData('home-page', () =>
    queryCollection('pages').where('path', '=', '/').first(),
  )

  const { data: certs } = await useAsyncData('home-certs', () =>
    queryCollection('certs').order('date', 'DESC').all(),
  )

  const { data: testimonials } = await useAsyncData('home-testimonials', () =>
    queryCollection('testimonials').order('date', 'DESC').all(),
  )

  const hero = (pageData.value?.meta.hero as Hero) || { headline: '', image: { src: '', alt: '' } }
  const about = (pageData.value?.meta.about as About) || { title: '', offers: [] }
  const servicesSection = pageData.value?.meta.services
  const experience = (pageData.value?.meta.experience as Experience) || { title: '', clients: [] }
  const testimonialsSection = pageData.value?.meta.testimonials
  const ctaSection = pageData.value?.meta.cta

  console.log(testimonialsSection)

  const testimonialIcon = (category: string): string => {
    switch (category) {
      case 'Professionalism':
        return 'ic-sharp-engineering'
      case 'Leadership':
        return 'ic-sharp-supervised-user-circle'
      case 'Developer Experience':
        return 'ic-round-rocket-launch'
    }
    return ''
  }

  const uiSmallerTitle = {
    container: 'py-2 lg:py-2 sm:py-2',
    title: 'text-xl sm:text-2xl lg:text-3xl',
  }
</script>
