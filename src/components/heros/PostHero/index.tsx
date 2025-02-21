import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { Badge } from '@/components/ui/badge'
import { formatAuthors } from '@/environments/formatAuthors'
import { cn } from '@/environments/ui'
import { formatDateTime } from '@/environments/formatDateTime'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { tags, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="relative -mt-[10.4rem] flex items-end" suppressHydrationWarning>
      <div className="container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white pb-8">
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          <div className="">
            <h1 className="mb-6 font-bold text-3xl md:text-5xl lg:text-6xl">{title}</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-16">
            {hasAuthors && (
              <div className={cn('flex flex-row items-center gap-3')}>
                {populatedAuthors.map((items) => {
                  return (
                    <Media
                      key={items.id}
                      className="size-[45px] rounded-full"
                      imgClassName="object-cover size-[45px] rounded-full border"
                      resource={items?.avatar!!}
                    />
                  )
                })}

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-base font-bold">{formatAuthors(populatedAuthors)}</p>
                    {publishedAt && (
                      <time className="text-sm font-light" dateTime={publishedAt}>
                        {formatDateTime(publishedAt)}
                      </time>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-row gap-2 mt-5">
            {tags?.map((items) => {
              if (typeof items === 'object' && items !== null) {
                const { title } = items
                const titleToUse = title || 'Untitled Tags'

                return (
                  <Badge
                    key={items.id}
                    variant={'destructive'}
                    className={cn('rounded-full p-2 cursor-pointer')}
                  >
                    {titleToUse}
                  </Badge>
                )
              }
              return null
            })}
          </div>
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {heroImage && typeof heroImage !== 'string' && (
          <Media fill priority imgClassName="-z-10 object-cover" resource={heroImage} />
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>
  )
}
