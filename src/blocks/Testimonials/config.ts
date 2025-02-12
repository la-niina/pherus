import { Block } from 'payload'

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialBlock',
  fields: [
    {
      name: 'autoPlay',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'testimonials',
      type: 'array',
      fields: [
        {
          name: 'quote',
          type: 'textarea',
        },
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'designation',
          type: 'text',
        },
        {
          name: 'src',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
