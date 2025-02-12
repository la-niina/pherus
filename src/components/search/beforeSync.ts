import { BeforeSync, DocToSync } from '@payloadcms/plugin-search/types'

export const beforeSyncWithSearch: BeforeSync = async ({ originalDoc, searchDoc }) => {
  const {
    doc: { relationTo: collection },
  } = searchDoc

  const { slug, id, tags, title, meta } = originalDoc

  const modifiedDoc: DocToSync = {
    ...searchDoc,
    slug,
    meta: {
      ...meta,
      title: meta?.title || title,
      image: meta?.image?.id || meta?.image,
      description: meta?.description,
      keywords: meta?.keywords || [],
    },
    tag: tags,
  }

  if (tags && Array.isArray(tags) && tags.length > 0) {
    // get full tags and keep a flattened copy of their most important properties
    try {
      const mappedTags = tags.map((tag) => {
        if (typeof tag === 'object') {
          const { id, title } = tag
          return {
            relationTo: 'tags',
            id,
            title,
          }
        }
      })

      modifiedDoc.tag = mappedTags
    } catch (_err) {
      console.error(
        `Failed. Category not found when syncing collection '${collection}' with id: '${id}' to search.`,
      )
    }
  }

  return modifiedDoc
}
