import { HeaderClient } from './Component.client'
import React from 'react'

import type { Header } from '@/payload-types'
import { getCachedGlobal } from '@/environments/getGlobals'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()

  return <HeaderClient data={headerData} />
}
