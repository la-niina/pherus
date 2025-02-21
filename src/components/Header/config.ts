import type { GlobalConfig } from 'payload'

import { revalidateHeader } from './hooks/revalidateHeader'
import { administrator, anyone } from '@/collections/access'
import { link } from '@/environments/fields/link'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    update: administrator,
    read: anyone,
  },
  fields: [
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
          RowLabel: '@/components/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
