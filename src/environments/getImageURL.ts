import type { Config, Media } from '@/payload-types'
import { getServerSideURL } from './getURL'

export const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  //const serverUrl = getServerSideURL()
  let url = '/avatar.jpeg'
  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image?.url!!

    url = ogUrl
  }

  return url
}
