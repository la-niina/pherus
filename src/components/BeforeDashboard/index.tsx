import React from 'react'
import { cn } from '@/utilities/ui'
import { Card, CardContent } from '../ui/card'

const BeforeDashboard: React.FC = () => {
  const listCons = [
    {
      title: 'Lorem ipsum dolor sit amet',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor',
    },
    {
      title: 'Lorem ipsum dolor sit amet',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor',
    },
    {
      title: 'Lorem ipsum dolor sit amet',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor',
    },
    {
      title: 'Lorem ipsum dolor sit amet',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor',
    },
  ]
  return (
    <div className={cn('flex flex-col gap-5 w-full')}>
      <h1 className={cn('text-base font-normal')}>Overview</h1>
      <div className={cn('grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 w-full')}>
        {listCons.map((item, index) => (
          <Card key={index} className={cn('rounded-lg z-10 bg-background/30')}>
            <CardContent className={cn('p-5')}>
              <h2 className={cn('text-lg font-bold')}>{item.title}</h2>
              <p className={cn('text-sm text-gray-500')}>{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default BeforeDashboard
