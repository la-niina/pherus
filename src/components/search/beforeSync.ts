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
    },
    tags: [],
  }

  if (tags && Array.isArray(tags) && tags.length > 0) {
    // get full tags and keep a flattened copy of their most important properties
    try {
      const mappedTags = tags.map((tags) => {
        const { id, title } = tags

        return {
          relationTo: 'tags',
          id,
          title,
        }
      })

      modifiedDoc.tags = mappedTags
    } catch (_err) {
      console.error(
        `Failed. Category not found when syncing collection '${collection}' with id: '${id}' to search.`,
      )
    }
  }

  return modifiedDoc
}
