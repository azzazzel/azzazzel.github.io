<template>
  <UPage>
    <UPageBody>
      <UPageSection>
        <UBlogPosts>
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
</template>

<script lang="ts" setup>
  const route = useRoute()
  const { data: posts } = await useAsyncData(
    route.path,
    () => queryCollection('posts').order('path', 'DESC').all() || [],
  )

  const title = 'Milen Dyankov :: Blog'
  const description =
    'A technical blog on software architecture, developer experience, and applied AI, \
    written from the perspective of an experienced software engineer.'
  const image = '/img/MilenDyankov.jpg'

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
