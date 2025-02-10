import React from 'react'
import { cn } from '@/utilities/ui'
import { Card, CardContent } from '../ui/card'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NotebookPen, PenBoxIcon, Stars, Upload } from 'lucide-react'

const BeforeDashboard: React.FC = async () => {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 10000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const listCons = [
    {
      icons: <NotebookPen />,
      title: 'Collections',
      description: pages.docs.length.toString(),
    },
    {
      icons: <PenBoxIcon />,
      title: 'Posts',
      description: posts.docs.length.toString(),
    },
    {
      icons: <Upload />,
      title: 'Node Version',
      description: process.version,
    },
    {
      icons: <Stars />,
      title: 'Status',
      description: process.env.NODE_ENV,
    },
  ]

  return (
    <div className={cn('flex flex-col gap-5 w-full')}>
      <h1 className={cn('text-base font-normal')}>Overview</h1>
      <div className={cn('grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 w-full')}>
        {listCons.map((item, index) => {
          return (
            <Card key={index} className={cn(`rounded-2xl z-10 bg-muted/20`)}>
              <CardContent className={cn('flex flex-col p-5 gap-5')}>
                <h2 className={cn('flex flex-row items-center text-lg font-bold gap-3')}>
                  {item.icons}
                  {item.title}
                </h2>
                <p className={cn('text-4xl text-primary/40')}>{item.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default BeforeDashboard
