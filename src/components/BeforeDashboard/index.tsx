import React from 'react'
import { cn } from '@/utilities/ui'
import { Card, CardContent } from '../ui/card'

const BeforeDashboard: React.FC = () => {
  const listCons = [
    {
      title: 'Pages',
      description: '3',
    },
    {
      title: 'Posts',
      description: '12',
    },
    {
      title: 'Active',
      description: 'Active',
    },
    {
      title: 'Status',
      description: 'Hosted',
    },
  ]
  return (
    <div className={cn('flex flex-col gap-5 w-full')}>
      <h1 className={cn('text-base font-normal')}>Overview</h1>
      <div className={cn('grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 w-full')}>
        {listCons.map((item, index) => (
          <Card key={index} className={cn('rounded-lg z-10 bg-background/30')}>
            <CardContent className={cn('flex flex-col p-5 gap-5')}>
              <h2 className={cn('text-lg font-bold')}>{item.title}</h2>
              <p className={cn('text-4xl text-gray-500')}>{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default BeforeDashboard
