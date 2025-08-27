import type { Block } from 'payload'
import { backgroundColorField } from '@/fields/backgroundColor'

export const RelumeHeader: Block = {
  slug: 'relumeHeader',
  interfaceName: 'RelumeHeaderBlock',
  fields: [
    {
      name: 'variant',
      type: 'select',
      label: 'Header Variant',
      defaultValue: 'header-01',
      required: true,
      options: [
        { label: 'Header 01 - Side by Side with Image', value: 'header-01' },
        { label: 'Header 05 - Full Background Image', value: 'header-05' },
        { label: 'Header 46 - Centered Simple', value: 'header-46' },
        { label: 'Header 47 - Centered with Background', value: 'header-47' },
        { label: 'Header 50 - Simple Centered', value: 'header-50' },
        { label: 'Header 54 - Two Column', value: 'header-54' },
        { label: 'Header 62 - Feature List', value: 'header-62' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Schermtijd weer helemaal in balans',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue: 'Bij Schermblij helpen we ouders om een gezonde balans te creëren tussen online en offline activiteiten.',
    },
    {
      name: 'primaryButton',
      type: 'group',
      label: 'Primary Button',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Button Text',
          defaultValue: 'Leer Meer',
        },
        {
          name: 'link',
          type: 'text',
          label: 'Button Link',
          defaultValue: '#',
        },
        {
          name: 'show',
          type: 'checkbox',
          label: 'Show Button',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'secondaryButton',
      type: 'group',
      label: 'Secondary Button',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Button Text',
          defaultValue: 'Aanmelden',
        },
        {
          name: 'link',
          type: 'text',
          label: 'Button Link',
          defaultValue: '#',
        },
        {
          name: 'show',
          type: 'checkbox',
          label: 'Show Button',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Header Image',
      relationTo: 'media',
      admin: {
        description: 'The main image for the header section',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      label: 'Background Image',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => ['header-05', 'header-47'].includes(siblingData.variant),
        description: 'Background image for full-screen header variants',
      },
    },
    {
      name: 'imagePosition',
      type: 'select',
      label: 'Image Position',
      defaultValue: 'right',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
      admin: {
        condition: (_, siblingData) => ['header-01', 'header-54'].includes(siblingData.variant),
      },
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features',
      admin: {
        condition: (_, siblingData) => siblingData.variant === 'header-62',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Feature Text',
        },
      ],
    },
    {
      name: 'alignment',
      type: 'select',
      label: 'Text Alignment',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      admin: {
        condition: (_, siblingData) => ['header-46', 'header-47', 'header-50'].includes(siblingData.variant),
      },
    },
    {
      name: 'overlayOpacity',
      type: 'number',
      label: 'Background Overlay Opacity',
      defaultValue: 50,
      min: 0,
      max: 100,
      admin: {
        condition: (_, siblingData) => ['header-05', 'header-47'].includes(siblingData.variant),
        description: 'Opacity of the dark overlay on background image (0-100)',
      },
    },
    backgroundColorField,
  ],
  labels: {
    plural: 'Relume Headers',
    singular: 'Relume Header',
  },
}