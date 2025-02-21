'use client'

import { cn } from '@/environments/ui'
import Link from 'next/link'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { Label } from '../ui/label'
import { buttonVariants } from '../ui/button'
import useClickableCard from '@/environments/useClickableCard'

export type CardPostData = Pick<Post, 'id' | 'slug' | 'tags' | 'meta' | 'title'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  showTags?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, showTags, title: titleFromProps } = props

  const { id, slug, tags, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasTags = tags && Array.isArray(tags) && tags.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${id}/${slug}`

  return (
    <article
      className={cn(
        'border border-border rounded-2xl overflow-hidden bg-card hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full ">
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media
            className=""
            imgClassName="rounded-xl md:h-[10rem]"
            resource={metaImage}
            size="33vw"
          />
        )}
      </div>
      <div className="p-4">
        {showTags && hasTags && (
          <div className="text-xs mb-2">
            {showTags && hasTags && (
              <div className="flex flex-row gap-1 overflow-hidden overflow-x-scroll">
                {tags?.map((tag, index) => {
                  if (typeof tag === 'object') {
                    const { title: titleFromTags } = tag
                    const tagsTitle = titleFromTags || ''
                    const isLast = index === tags.length - 1
                    return (
                      <Label
                        key={index}
                        className={cn(
                          buttonVariants({
                            variant: 'default',
                            size: 'sm',
                          }),
                          'rounded-full h-5 text-xs text-yellow-200 bg-muted/60 hover:bg-muted/90',
                        )}
                      >
                        {tagsTitle.trim()}
                      </Label>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className="text-pretty">
            <h3 className={cn('text-sm font-bold line-clamp-1')}>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && (
          <div className="text-xs font-light mt-2">
            {description && (
              <p className="text-xs font-light line-clamp-2 md:line-clamp-3">
                {sanitizedDescription}
              </p>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
