import { ImageMedia } from '@/components/Media/ImageMedia'
import { Button, buttonVariants } from '@/components/ui/button'
import type { GithubBlock as GithubBlockProps } from '@/payload-types'
import { cn } from '@/environments/ui'
import { GithubIcon } from 'lucide-react'
import Link from 'next/link'

export const GithubBlock: React.FC<GithubBlockProps> = (props) => {
  const { title, description, projects, githubUrl } = props

  return (
    <div className="container my-16">
      <div className="flex flex-col gap-5 items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center">
          <Button
            size={'icon'}
            variant={'ghost'}
            className={'bg-green-300/30 hover:bg-green-300/30 rounded-xl'}
          >
            <GithubIcon />
          </Button>
          <h2 className="text-lg font-bold mt-3">{title}</h2>
          <p className="text-xs font-light">{description}</p>
        </div>

        <div className="flex-1 grid grid-flow-col gap-3 w-fit max-w-md">
          {projects?.map((project, index) => (
            <ImageMedia
              key={index}
              className={cn('rounded-2xl hover:transition-transform size-56 col-auto')}
              resource={project.potrait}
              imgClassName={cn('rounded-2xl size-full')}
            />
          ))}
        </div>

        <Link
          target={'_blank'}
          href={githubUrl}
          className={cn(
            buttonVariants({
              variant: 'link',
              size: 'sm',
            }),
            'mt-4 text-green-300',
          )}
        >
          more details...
        </Link>
      </div>
    </div>
  )
}
