import type { Block } from 'payload'

export const Github: Block = {
  slug: 'githubBlock',
  interfaceName: 'GithubBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Github show case title',
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'projects',
      type: 'array',
      maxRows: 3,
      fields: [
        {
          name: 'potrait',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'githubUrl',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'githubUrl',
      type: 'text',
      required: true,
    },
  ],
}
