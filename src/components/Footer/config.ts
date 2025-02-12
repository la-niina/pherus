import type { GlobalConfig } from 'payload'

import { revalidateFooter } from './hooks/revalidateFooter'
import { link } from '@/utilities/fields/link'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'footer',
      type: 'array',
      maxRows: 3,
      fields: [
        {
          name: 'header',
          type: 'text',
          required: true,
        },
        {
          name: 'navItems',
          type: 'array',
          fields: [
            link({
              appearances: false,
            }),
          ],
          maxRows: 6,
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: '@/components/Footer/RowLabel#RowLabel',
            },
          },
        },
      ],
    },
    {
      name: 'copyright',
      type: 'textarea',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'social',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        initCollapsed: true,
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
