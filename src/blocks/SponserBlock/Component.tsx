import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/environments/ui'
import { Heart } from 'lucide-react'

export const SponserBlock: React.FC = (props) => {
  return (
    <div className={cn('container my-6')}>
      <Card className={cn('bg-red-300/80')}>
        <CardContent className={cn('grid grid-cols-2 p-5')}>
          <div className={cn('col-span-1')}>
            <h2 className={cn('text-2xl font-bold mb-4')}>Become a sponsor to Mona Octocat</h2>
            <p className={cn('text-lg mb-4')}>
              Your dedicated companion in the world of coding, committed to making your Github
              experience seamless and productive
            </p>
            <a className="font-bold">Sponsors</a>
          </div>
          <div className={cn('flex flex-col col-span-1 gap-5')}>
            <Card className={cn('bg-white/60')}>
              <CardContent className={cn('flex flex-col justify-between gap-10 p-5')}>
                <div className={cn('flex flex-col')}>
                  <h3 className={cn('text-lg font-bold mb-2')}>$12,000 a month</h3>
                  <p className={cn('text-sm mb-4')}>
                    This is a description of the sponsorship package. This is a description of the
                    sponsorship package.
                  </p>
                </div>

                <div className={cn('flex flex-col')}>
                  <a>87 % towards $15,000 goal</a>
                  <progress
                    className={cn('w-full h-2 bg-gray-200 rounded-full')}
                    value="87"
                    max="100"
                  />
                </div>
              </CardContent>
            </Card>

            <Button size={'sm'} variant={'default'} className="w-full">
              <Heart className="fill-red-300" />
              Sponsor
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
