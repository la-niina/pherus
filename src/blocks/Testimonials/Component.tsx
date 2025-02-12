import { AnimatedTestimonials } from '@/components/ui/animated-testimonials'
import { TestimonialBlock as TestimonialBlockProps } from '@/payload-types'

export const TestimonialBlock: React.FC<TestimonialBlockProps> = (props) => {
  const { testimonials, autoPlay } = props
  return (
    <div className="container my-16">
      <AnimatedTestimonials autoplay={autoPlay!!} testimonials={testimonials!!} />
    </div>
  )
}
