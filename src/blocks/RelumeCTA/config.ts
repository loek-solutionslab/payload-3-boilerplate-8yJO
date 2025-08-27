import type { Block } from 'payload'
import { backgroundColorField } from '@/fields/backgroundColor'

export const RelumeCTA: Block = {
  slug: 'relumeCTA',
  interfaceName: 'RelumeCTABlock',
  fields: [
    {
      name: 'variant',
      type: 'select',
      label: 'CTA Variant',
      defaultValue: 'cta-02',
      required: true,
      options: [
        { label: 'CTA 02 - Two Column with Image', value: 'cta-02' },
        { label: 'CTA 20 - Simple Left Aligned', value: 'cta-20' },
        { label: 'CTA 26 - Centered', value: 'cta-26' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Schrijf je nu in!',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue: 'Begin vandaag nog met het creëren van een gezonde digitale balans voor je gezin.',
    },
    {
      name: 'image',
      type: 'upload',
      label: 'CTA Image',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData.variant === 'cta-02',
        description: 'Image for two-column CTA layout',
      },
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
      defaultValue: 'Inschrijven',
    },
    {
      name: 'buttonVariant',
      type: 'select',
      label: 'Button Style',
      defaultValue: 'primary',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
      ],
    },
    {
      name: 'emailPlaceholder',
      type: 'text',
      label: 'Email Placeholder',
      defaultValue: 'Voer je e-mail in',
    },
    {
      name: 'privacyText',
      type: 'textarea',
      label: 'Privacy Text',
      defaultValue: 'Door je aan te melden ga je akkoord met onze Algemene Voorwaarden.',
    },
    {
      name: 'alignment',
      type: 'select',
      label: 'Text Alignment',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
      ],
      admin: {
        condition: (_, siblingData) => siblingData.variant !== 'cta-02',
      },
    },
    backgroundColorField,
  ],
  labels: {
    plural: 'Relume CTAs',
    singular: 'Relume CTA',
  },
}