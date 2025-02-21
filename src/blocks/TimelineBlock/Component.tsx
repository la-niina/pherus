import { Timeline } from '@/components/ui/timeline'
import type { TimelineBlock as TimelineBlockProps } from '@/payload-types'
import { cn } from '@/environments/ui'

export const TimelineBlock: React.FC<TimelineBlockProps> = (props) => {
  return <Timeline className={cn('container my-16')} data={props} />
}
