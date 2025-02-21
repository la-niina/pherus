import { CollectionConfig } from 'payload'
import { anyone, authenticated, authenticatedOrPublished } from '../access'

export const Comments: CollectionConfig = {
  slug: 'comments',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: false,
      required: true,
    },
    {
      name: 'comments',
      type: 'array',
      fields: [
        {
          name: 'comment',
          type: 'textarea',
        },
        {
          name: 'author',
          type: 'relationship',
          relationTo: 'users',
          hasMany: false,
        },
        {
          name: 'timeStamp',
          type: 'date',
        },
      ],
    },
  ],
}
