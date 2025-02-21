import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { ThemeSelector } from '../providers/Theme/ThemeSelector'
import { Button } from '../ui/button'
import {
  LucideFacebook,
  LucideGithub,
  LucideInstagram,
  LucideLinkedin,
  LucideTwitch,
  LucideTwitter,
  LucideYoutube,
} from 'lucide-react'
import {
  IconBrandMedium,
  IconBrandPinterest,
  IconBrandReddit,
  IconBrandSnapchat,
  IconBrandTiktok,
  IconBrandTumblr,
  IconBrandVimeo,
  IconBrandWhatsapp,
} from '@tabler/icons-react'
import { StaticImageData } from 'next/image'
import { cn } from '@/environments/ui'
import { getCachedGlobal } from '@/environments/getGlobals'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const { logo, footer, social, copyright } = footerData
  const navItems = footer || []
  let src: StaticImageData | string = ''

  const getIconByName = (label: string) => {
    if (label.includes('facebook')) return <LucideFacebook />
    if (label.includes('twitter')) return <LucideTwitter />
    if (label.includes('instagram')) return <LucideInstagram />
    if (label.includes('linkedin')) return <LucideLinkedin />
    if (label.includes('github')) return <LucideGithub />
    if (label.includes('youtube')) return <LucideYoutube />
    if (label.includes('twitch')) return <LucideTwitch />
    if (label.includes('reddit')) return <IconBrandReddit />
    if (label.includes('tiktok')) return <IconBrandTiktok />
    if (label.includes('pinterest')) return <IconBrandPinterest />
    if (label.includes('snapchat')) return <IconBrandSnapchat />
    if (label.includes('vimeo')) return <IconBrandVimeo />
    if (label.includes('tumblr')) return <IconBrandTumblr />
    if (label.includes('medium')) return <IconBrandMedium />
    if (label.includes('whatsapp')) return <IconBrandWhatsapp />
    return null
  }

  if (!src && logo && typeof logo === 'object' && 'url' in logo) {
    const { url } = logo
    src = `${url}`
  }

  return (
    <footer className="mt-auto border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-16 flex flex-col gap-5 md:gap-10">
        <Link className="flex items-center w-fit" href="/">
          {/** WILL COMFIRM THE {logo url} WHEN I GET TIME, FOR NOW GET A LIFE **/}
          {/**logo ? <Logo src={src} /> : <Logo /> **/}
          <Logo loading="eager" priority="high" className="" />
        </Link>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto w-full">
          {navItems.map((item, index) => {
            const { header, navItems } = item
            return (
              <div key={index} className={cn('flex flex-col gap-5 col-span-1')}>
                <h1
                  className="text-[13px] md:text-[16px] font-[400]"
                  style={{
                    letterSpacing: '.25em',
                    lineHeight: 1,
                  }}
                >
                  {header}
                </h1>
                <div className="flex flex-col gap-3">
                  {navItems?.map((navItem, i) => {
                    const { link } = navItem
                    return <CMSLink className="font-extralight hover:underline" key={i} {...link} />
                  })}
                </div>
              </div>
            )
          })}
          <div className={cn('flex flex-col gap-5 col-span-1')}>
            <h1
              className="text-[13px] md:text-[16px] font-[400]"
              style={{
                letterSpacing: '.25em',
                lineHeight: 1,
              }}
            >
              DISPLAY OPTIONS
            </h1>
            <ThemeSelector />
          </div>
        </div>
        {social && (
          <div className={cn('flex flex-row gap-3 items-center')}>
            {social.map((item) => {
              const { label, id, links } = item
              const icon = getIconByName(label.toLowerCase())

              return (
                <Button
                  className="rounded-full bg-orange-400 hover:bg-orange-400"
                  variant={'ghost'}
                  size={'icon'}
                  key={id}
                  suppressHydrationWarning
                  asChild
                >
                  <Link href={links} rel={'noopener noreferrer'} target={'_blank'}>
                    {icon}
                  </Link>
                </Button>
              )
            })}
          </div>
        )}
        {copyright && (
          <a className="text-lg font-extralight md:max-w-xs cursor-none">{copyright}</a>
        )}
      </div>
    </footer>
  )
}
