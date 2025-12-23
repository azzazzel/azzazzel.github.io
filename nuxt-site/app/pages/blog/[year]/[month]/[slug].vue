<template>
  <UContainer v-if="post">
    <UPageHeader :title="post.title">
      <template #headline>
        <time class="text-muted"
          >{{
            new Date(post.date).toLocaleDateString('en', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })
          }}
        </time>
        <span class="text-muted">&middot;</span>
        <DisqusCount
          :identifier="diqus.identifier"
          :url="diqus.url"
          tag="a"
        >
        </DisqusCount>
      </template>
    </UPageHeader>

    <UPage>
      <UPageBody>
        <ContentRenderer
          v-if="post"
          :value="post"
        />
        <USeparator v-if="surround?.length" />

        <DisqusComments
          :identifier="diqus.identifier"
          :url="diqus.url"
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

  const diqus = {
    identifier: post.value?.path,
    url: 'https://milendyankov.com' + post.value?.path,
  }

  const title = post.value?.title || ''
  const description = post.value?.description || ''
  const image = post.value?.meta?.image || '/img/MilenDyankov.jpg'

  if (post.value.meta.twitter) {
    useScript('https://platform.twitter.com/widgets.js')
  }

  useSeoMeta({
    title: title,
    description: description,
  })

  useSeoMeta({
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogUrl: 'https://milendyankov.com' + post.value?.path,
    ogType: 'article',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    twitterCard: 'summary',
    articlePublishedTime: post.value.date,
  })
</script>

<style></style>
