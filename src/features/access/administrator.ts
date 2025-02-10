import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

type isAuthenticated = (args: AccessArgs<User>) => boolean

export const administrator: isAuthenticated = ({ req: { user } }) => {
  if (user) {
    return user.role === 'owner'
  }
  return false
}
