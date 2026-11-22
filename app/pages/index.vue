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
        <NuxtImg
          :src="hero.image.src"
          :alt="hero.image.alt"
          class="w-full rounded-lg"
          sizes="sm:320px md:640px lg:1024px"
          format="webp"
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
              leadingIcon: 'size-10 text-primary',
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
                  :ui="{ leadingIcon: 'text-primary' }"
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
        :title="projectsSection.title"
        :ui="{ container: 'py-8 lg:py-8 sm:py-8' }"
      >
        <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="project in projectsSection.items"
            :key="project.name"
            class="flex flex-col overflow-hidden rounded-lg border border-default bg-elevated/50"
          >
            <div class="h-44 overflow-hidden bg-white dark:bg-gray-900">
              <img
                :src="project.image"
                :alt="project.imageAlt"
                class="h-full w-full"
                :class="project.imageDark ? 'object-contain p-8 dark:hidden' : 'object-cover'"
                loading="lazy"
              />
              <img
                v-if="project.imageDark"
                :src="project.imageDark"
                :alt="project.imageAlt"
                class="hidden h-full w-full object-contain p-8 dark:block"
                loading="lazy"
              />
            </div>
            <div class="flex flex-1 flex-col p-6">
              <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
                {{ project.type }}
              </p>
              <h3 class="text-xl font-semibold text-highlighted">{{ project.name }}</h3>
              <p class="mt-2 text-muted">{{ project.description }}</p>
              <div class="mt-auto pt-6">
                <UButton
                  v-for="link in project.links"
                  :key="link.url"
                  :href="link.url"
                  external
                  color="secondary"
                  variant="soft"
                  trailing-icon="i-ic-baseline-arrow-forward"
                  >{{ link.text }}</UButton
                >
              </div>
            </div>
          </article>
        </div>
      </UPageSection>

      <UPageSection
        :title="testimonialsSection.title"
        :ui="{
          container: 'py-8 lg:py-8 sm:py-8',
        }"
      >
        <UPageGrid>
          <div class="col-span-full">
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
          </div>
        </UPageGrid>
      </UPageSection>

      <UContainer>
        <section class="grid gap-8 rounded-lg bg-elevated/50 p-6 sm:p-8 lg:grid-cols-4 lg:p-10">
          <div class="lg:col-span-2">
            <h2 class="text-3xl font-bold text-highlighted">{{ ctaSection.title }}</h2>
            <p class="mt-4 text-muted">{{ ctaSection.description }}</p>
          </div>
          <div>
            <p class="text-sm text-muted">{{ ctaSection.directDescription }}</p>
            <UPageList class="mt-4">
              <UPageFeature
                v-for="(method, index) in ctaSection.methods"
                :key="index"
                :description="method.text"
                :icon="method.icon"
                :ui="{ leadingIcon: 'text-secondary' }"
                class="my-1"
              >
                <template #description>
                  <NuxtLink
                    v-if="method.link"
                    :href="method.link"
                    external
                    class="text-secondary underline decoration-secondary/40 underline-offset-4 hover:decoration-secondary"
                    >{{ method.text }}</NuxtLink
                  >
                </template>
              </UPageFeature>
            </UPageList>
          </div>
          <div>
            <p class="text-sm text-muted">{{ ctaSection.companyDescription }}</p>
            <NuxtLink
              :href="ctaSection.companyLink.url"
              external
              :aria-label="ctaSection.companyLink.text"
              class="mt-4 inline-flex rounded-lg border border-default bg-default px-4 py-2 transition-colors hover:border-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
            >
              <img
                src="/img/initiatives/commsen-light.svg"
                alt="Commsen"
                class="h-8 w-auto dark:hidden"
              />
              <img
                src="/img/initiatives/commsen-dark.svg"
                alt="Commsen"
                class="hidden h-8 w-auto dark:block"
              />
            </NuxtLink>
          </div>
        </section>
      </UContainer>
    </UPageBody>
  </UPage>
</template>

<script setup lang="ts">
  const appConfig = useAppConfig()
  const siteConfig = appConfig.site

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
  const projectsSection = pageData.value?.meta.projects
  const experience = (pageData.value?.meta.experience as Experience) || { title: '', clients: [] }
  const testimonialsSection = pageData.value?.meta.testimonials
  const ctaSection = pageData.value?.meta.cta

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
