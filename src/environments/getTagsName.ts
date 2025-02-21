import type { Config, Media, Tag } from '@/payload-types'

export const getTagsName = (tags?: Tag | Config['db']['defaultIDType'] | null) => {
  let url = ''
  if (tags && typeof tags === 'object' && 'title' in tags) {
    const tag = tags.title

    url = tag ? tag : tags.title
  }

  return url
}
