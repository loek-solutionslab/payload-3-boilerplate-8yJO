import type { Block } from 'payload'
import { backgroundColorField } from '@/fields/backgroundColor'

export const RelumeLayout: Block = {
  slug: 'relumeLayout',
  interfaceName: 'RelumeLayoutBlock',
  fields: [
    {
      name: 'variant',
      type: 'select',
      label: 'Layout Variant',
      defaultValue: 'layout-03',
      required: true,
      options: [
        { label: 'Layout 01 - Two Column with Tagline & Buttons', value: 'layout-01' },
        { label: 'Layout 03 - Simple Two Column', value: 'layout-03' },
        { label: 'Layout 10 - Two Column with Feature Grid', value: 'layout-10' },
        { label: 'Layout 192 - Two Column with Image Left', value: 'layout-192' },
        { label: 'Layout 238 - Three Column with Icons', value: 'layout-238' },
        { label: 'Layout 239 - Three Column with Images & Center Header', value: 'layout-239' },
      ],
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
      admin: {
        description: 'Small text above the main title',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Ontdek de voordelen van digitale media',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue: 'Digitale media kunnen een waardevolle aanvulling zijn op de ontwikkeling van uw kinderen.',
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
          name: 'variant',
          type: 'select',
          label: 'Button Style',
          defaultValue: 'secondary',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Link', value: 'link' },
          ],
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
          defaultValue: 'Ontdek Meer',
        },
        {
          name: 'link',
          type: 'text',
          label: 'Button Link',
          defaultValue: '#',
        },
        {
          name: 'variant',
          type: 'select',
          label: 'Button Style',
          defaultValue: 'link',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Link', value: 'link' },
          ],
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
      name: 'mainImage',
      type: 'upload',
      label: 'Main Image',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => ['layout-01', 'layout-03', 'layout-10', 'layout-192'].includes(siblingData.variant),
        description: 'Main image for two-column layouts',
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
        condition: (_, siblingData) => ['layout-01', 'layout-03', 'layout-10', 'layout-192'].includes(siblingData.variant),
      },
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features',
      admin: {
        condition: (_, siblingData) => siblingData.variant === 'layout-10',
      },
      fields: [
        {
          name: 'icon',
          type: 'upload',
          label: 'Icon',
          relationTo: 'media',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Feature Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Feature Description',
        },
      ],
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Content Columns',
      admin: {
        condition: (_, siblingData) => ['layout-238', 'layout-239'].includes(siblingData.variant),
      },
      maxRows: 3,
      minRows: 3,
      fields: [
        {
          name: 'icon',
          type: 'upload',
          label: 'Icon/Image',
          relationTo: 'media',
          admin: {
            description: 'Icon for layout-238, image for layout-239',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Column Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Column Description',
        },
        {
          name: 'buttonText',
          type: 'text',
          label: 'Column Button Text',
        },
        {
          name: 'buttonLink',
          type: 'text',
          label: 'Column Button Link',
          defaultValue: '#',
        },
      ],
    },
    {
      name: 'textAlignment',
      type: 'select',
      label: 'Text Alignment',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      admin: {
        condition: (_, siblingData) => ['layout-238', 'layout-239'].includes(siblingData.variant),
      },
    },
    backgroundColorField,
  ],
  labels: {
    plural: 'Relume Layouts',
    singular: 'Relume Layout',
  },
}