import React from 'react'

import { Card, CardPostData } from '@/components/Card'
import { cn } from '@/environments/ui'

export type Props = {
  posts: CardPostData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {posts?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-1" key={index}>
                  <Card className="h-full" doc={result} showTags />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
