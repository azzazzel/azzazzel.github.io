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
        /></UBlogPosts>
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
  console.log(posts.value)

  const buildLink = computed(() => (post: any) => {
    const date = new Date(post.date)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const slug = post.path.split('-').slice(3).join('-')
    return `/blog/${year}/${month}/${slug}`
  })
</script>
