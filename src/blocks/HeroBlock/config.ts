import type { Block } from 'payload'
import { backgroundColorField } from '@/fields/backgroundColor'
import { link } from '@/fields/link'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero Sectie',
    plural: 'Hero Secties',
  },
  fields: [
    {
      name: 'title',
      label: 'Titel',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Beschrijving',
      type: 'textarea',
    },
    {
      name: 'image',
      label: 'Afbeelding',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imagePosition',
      label: 'Afbeelding Positie',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Links', value: 'left' },
        { label: 'Rechts', value: 'right' },
      ],
    },
    link({
      disableLabel: false,
      overrides: {
        name: 'primaryButton',
        label: 'Primaire Knop',
      },
    }),
    link({
      disableLabel: false,
      overrides: {
        name: 'secondaryButton',
        label: 'Secundaire Knop (optioneel)',
      },
    }),
    backgroundColorField,
  ],
}