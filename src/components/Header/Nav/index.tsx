'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { AlignRight, SearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/utilities/ui'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <div className="flex flex-1 items-center gap-2 justify-end">
      <nav className="flex items-center gap-5">
        <div className="mr-4 hidden md:flex">
          <nav className="flex items-center gap-4 text-sm xl:gap-6">
            {navItems.map(({ link }, i) => {
              return <CMSLink key={i} {...link} className={cn('')} appearance="link" />
            })}
          </nav>
        </div>
        <Link href="/search">
          <span className="sr-only">Search</span>
          <SearchIcon className="w-5 text-primary" />
        </Link>
        <div className="mr-4 md:hidden flex">
          <Sheet>
            <SheetTrigger>
              <AlignRight />
            </SheetTrigger>
            <SheetContent side={'left'} className="flex flex-col gap-5 border-0">
              <SheetHeader className="flex flex-col items-start">
                <SheetTitle>Pherus</SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-4">
                {navItems.map(({ link }, i) => {
                  return <CMSLink key={i} {...link} appearance="link" />
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  )
}
