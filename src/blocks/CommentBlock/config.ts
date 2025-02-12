import { Block } from 'payload'

export const Comment: Block = {
  slug: 'comments',
  interfaceName: 'CommentBlock',
  fields: [
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
