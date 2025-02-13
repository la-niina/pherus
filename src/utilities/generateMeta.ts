import type { Metadata } from 'next'
import type { Page, Post, Tag } from '../payload-types'
import { mergeOpenGraph } from './mergeOpenGraph'
import { getImageURL } from './getImageURL'

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
  type:
    | 'website'
    | 'article'
    | 'book'
    | 'profile'
    | 'music.song'
    | 'music.album'
    | 'music.playlist'
    | 'music.radio_station'
    | 'video.movie'
    | 'video.episode'
    | 'video.tv_show'
    | 'video.other'
}): Promise<Metadata> => {
  const { doc, type } = args

  const ogImage = getImageURL(doc?.meta?.image)
  const title = doc?.meta?.title ? doc?.meta?.title + '' : ''
  const keywordsAsString =
    doc?.meta?.keywords
      ?.map((tag) => {
        if (typeof tag === 'object') {
          const { title } = tag
          return title
        }
      })
      .join(',') || ''

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title: title,
      siteName: title,
      tags: doc?.slug,
      phoneNumbers: '+256772769734',
      publishedTime: doc?.updatedAt,
      modifiedTime: doc?.updatedAt,
      type: `${type || 'website'}` as any,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    category: `${type || 'website'}` as any,
    icons: {
      icon: '/favicon.svg',
      shortcut: '/favicon.svg',
      apple: '/favicon.svg',
    },
    manifest: '/manifest.json',
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
      googleBot: 'index, follow',
    },
    keywords: keywordsAsString,
    title: title,
  }
}
