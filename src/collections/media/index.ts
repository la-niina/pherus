import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { anyone, authenticated } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    components: {
      views: {
        list: {
          Component: '@/collections/media/component/MediaList#MediaList',
        },
      },
    },
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
    {
      name: 'prefix',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'caption',
      type: 'richText',
      admin: {
        position: 'sidebar',
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    disableLocalStorage: true,
  },
}
