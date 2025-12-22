<template>
  <UContainer>
    <UPageHeader
      :headline="pageData?.meta.headline as string"
      :title="title"
      :description="description"
      class="mb-16"
      :ui="{
        root: 'border-b-0 mt-16',
      }"
    >
    </UPageHeader>

    <UPage>
      <UPageBody>
        <UPageSection :ui="{ container: 'lg:py-0 sm:py-0 py-0' }">
          <UBlogPosts class="test">
            <UBlogPost
              v-for="(post, index) in posts"
              :key="index"
              :to="post.path"
              :title="post.title"
              :description="post.description"
              :image="post.meta.image || '/img/blog_placeholder.jpg'"
              :date="
                new Date(post.date)?.toLocaleDateString('en', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
              "
              :orientation="index === 0 ? 'horizontal' : 'vertical'"
              :class="[index === 0 && 'col-span-full']"
              variant="ghost"
              :ui="{
                description: 'line-clamp-2',
              }"
            />
          </UBlogPosts>
        </UPageSection>
      </UPageBody>
    </UPage>
  </UContainer>
</template>

<script lang="ts" setup>
  const { data: siteData } = await useAsyncData('blog-site', () =>
    queryCollection('pages').where('path', '=', '/blog').first(),
  )

  const { data: pageData } = await useAsyncData('blog-page', () =>
    queryCollection('pages').where('path', '=', '/blog').first(),
  )

  const { data: posts } = await useAsyncData(
    'all-blogs',
    () => queryCollection('posts').order('path', 'DESC').all() || [],
  )

  const title = pageData.value?.title
  const description = pageData.value?.description
  const image = siteData.value?.meta['og_img']

  useSeoMeta({
    title,
    description,
  })

  useSeoMeta({
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogUrl: 'https://milendyankov.com',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    twitterCard: 'summary',
  })
</script>
