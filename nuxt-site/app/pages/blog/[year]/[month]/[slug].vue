<template>
  <UContainer v-if="post">
    <UPageHeader :title="post.title">
      <template #headline>
        <!-- <UBadge
          v-bind="post.badge"
          variant="subtle"
        />
        <span class="text-muted">&middot;</span> -->
        <time class="text-muted">{{
          new Date(post.date).toLocaleDateString('en', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        }}</time>
      </template>
    </UPageHeader>

    <UPage>
      <UPageBody>
        <ContentRenderer
          v-if="post"
          :value="post"
        />

        <USeparator v-if="surround?.length" />

        <UContentSurround :surround="surround" />
      </UPageBody>

      <template
        v-if="post?.body?.toc?.links?.length"
        #right
      >
        <UContentToc :links="post.body.toc.links" />
      </template>
    </UPage>
  </UContainer>
</template>

<script lang="ts" setup>
  const route = useRoute()
  const { data: post } = await useAsyncData(route.path, () =>
    queryCollection('posts').where('path', '=', route.path).first(),
  )

  if (!post.value) {
    throw createError({
      statusCode: 404,
    })
  }

  const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
    return queryCollectionItemSurroundings('posts', post.value!.path, {
      fields: ['description'],
    })
  })
</script>

<style></style>
