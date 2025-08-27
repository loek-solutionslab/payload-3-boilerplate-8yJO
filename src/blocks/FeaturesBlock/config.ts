import type { Block } from 'payload'
import { link } from '@/fields/link'

export const FeaturesBlock: Block = {
  slug: 'features',
  labels: {
    singular: 'Features Sectie',
    plural: 'Features Secties',
  },
  fields: [
    {
      name: 'title',
      label: 'Titel',
      type: 'text',
      required: true,
    },
    {
      name: 'features',
      label: 'Features',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'icon',
          label: 'Icoon',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'title',
          label: 'Feature Titel',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Beschrijving',
          type: 'textarea',
        },
        link({
          disableLabel: false,
          overrides: {
            name: 'link',
            label: 'Link (optioneel)',
          },
        }),
      ],
    },
  ],
}