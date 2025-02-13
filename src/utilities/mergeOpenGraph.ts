import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'An open-source website built with Pherus and Next.js.',
  images: [
    {
      url: `${getServerSideURL()}/pherus_brand.svg`,
    },
  ],
  siteName: 'Pherus Website Template',
  title: 'Pherus Website Template',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
