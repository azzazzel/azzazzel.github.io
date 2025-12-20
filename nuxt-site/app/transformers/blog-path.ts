import { defineTransformer } from '@nuxt/content'

export default defineTransformer({
  name: 'blog-path',
  extensions: ['.md'],
  transform(file) {
    return {
      ...file,
      path: buildLink(file.id),
    }
  },
})

const buildLink = (id: string) => {
  const title = id.split('/').slice(1).join('-')
  const [year, month, _, ...slugParts] = title.split('-')
  const slug = slugParts
    .join('-')
    .replace(/\.md$/, '')
    .replace(/\s/g, '-')
    .replace(/[^a-zA-Z0-9-_]/g, '')

  return `/blog/${year}/${month}/${slug}`
}
