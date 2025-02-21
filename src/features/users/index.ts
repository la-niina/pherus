import type { CollectionConfig } from 'payload'
import { administrator, authenticated } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: administrator,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    //defaultColumns: ['name', 'email'],
    useAsTitle: 'username',
  },
  auth: {
    loginWithUsername: {
      allowEmailLogin: true,
      requireEmail: true,
      requireUsername: true,
    },
    tokenExpiration: 2592000,
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'user',
      options: [
        { label: 'Owner', value: 'owner' },
        { label: 'Moderator', value: 'moderator' },
        { label: 'User', value: 'user' },
      ],
      admin: {
        description: 'Role of the user',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      required: false,
      relationTo: 'media',
      admin: {
        position: 'sidebar',
        description: 'Upload an avatar for the user',
      },
    },
  ],
  timestamps: true,
}
