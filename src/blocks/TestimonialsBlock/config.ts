import type { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  labels: {
    singular: 'Testimonials Sectie',
    plural: 'Testimonials Secties',
  },
  fields: [
    {
      name: 'title',
      label: 'Titel',
      type: 'text',
    },
    {
      name: 'description',
      label: 'Beschrijving',
      type: 'textarea',
    },
    {
      name: 'testimonials',
      label: 'Testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      minRows: 1,
      maxRows: 6,
      required: true,
      admin: {
        description: 'Selecteer tot 6 testimonials om weer te geven',
      },
      filterOptions: {
        active: {
          equals: true,
        },
      },
    },
  ],
}