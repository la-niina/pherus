import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Card, CardContent } from '@/components/ui/card'
import { CardBlock as CardBlockProp } from '@/payload-types'
import { cn } from '@/environments/ui'

export type CardBlockProps = CardBlockProp & {
  className?: string
}
export const CardBlock: React.FC<CardBlockProps> = (props) => {
  const { className, cardType, gridCards, wideCards } = props

  return (
    <div className={cn(className === '' ? `${className}` : `container my-6`)}>
      {cardType === 'gridcard' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gridCards?.map((items, index) => {
            const { gridRichText } = items
            return (
              <Card key={index} className="w-full col-span-1 rounded-2xl bg-muted/35">
                <CardContent className="p-5">
                  {gridRichText && <RichText data={gridRichText} enableGutter={false} />}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
      {cardType === 'widecard' && (
        <div className={cn('grid grid-cols-1 gap-4')}>
          {wideCards?.map((items, index) => {
            const { wideRichText, wideImage, links } = items
            return (
              <Card key={index} className="w-full h-fit rounded-2xl bg-muted/35">
                <CardContent className="grid grid-cols-1 h-fit md:grid-cols-3 lg:grid-cols-3 gap-5 p-3 md:p-5">
                  <div
                    className={cn(
                      'flex flex-col col-span-1 md:col-span-2 pr-0 lg:pr-[16rem] gap-5',
                    )}
                  >
                    {wideRichText && <RichText data={wideRichText} enableGutter={false} />}
                    {Array.isArray(links) && links.length > 0 && (
                      <ul className="flex justify-start gap-4">
                        {links.map(({ link }, i) => {
                          return (
                            <li key={i}>
                              <CMSLink {...link} />
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </div>
                  {wideImage && (
                    <Media
                      className={cn('col-span-1')}
                      imgClassName="rounded-xl"
                      resource={wideImage}
                    />
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
