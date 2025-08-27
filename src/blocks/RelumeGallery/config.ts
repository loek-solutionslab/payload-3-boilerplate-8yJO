import type { Block } from 'payload'

import { backgroundColorField } from '@/fields/backgroundColor'

export const RelumeGallery: Block = {
  slug: 'relumeGallery',
  interfaceName: 'RelumeGalleryBlock',
  labels: {
    singular: 'Relume Gallery Block',
    plural: 'Relume Gallery Blocks',
  },
  admin: {
    description: 'Gallery components for displaying image collections with different layouts',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      label: 'Gallery Variant',
      defaultValue: 'gallery-04',
      options: [
        {
          label: 'Gallery 04 - Grid Layout',
          value: 'gallery-04',
        },
        {
          label: 'Gallery 08 - Masonry Layout',
          value: 'gallery-08',
        },
      ],
      admin: {
        description: 'Choose the gallery layout style',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Afbeeldingen Galerij',
      admin: {
        description: 'Main heading for the gallery section',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Optional description text below the title',
      },
    },
    {
      name: 'images',
      type: 'array',
      label: 'Gallery Images',
      minRows: 1,
      maxRows: 20,
      labels: {
        singular: 'Image',
        plural: 'Images',
      },
      admin: {
        components: {
          RowLabel: ({ data, index }) => {
            return data?.image?.alt || `Image ${String(index + 1).padStart(2, '0')}`
          },
        },
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Select an image for the gallery',
          },
        },
        {
          name: 'link',
          type: 'group',
          label: 'Optional Link',
          admin: {
            collapsed: true,
            description: 'Add a link when users click on this image',
          },
          fields: [
            {
              name: 'type',
              type: 'radio',
              options: [
                {
                  label: 'None',
                  value: 'none',
                },
                {
                  label: 'Internal Page',
                  value: 'reference',
                },
                {
                  label: 'External URL',
                  value: 'custom',
                },
              ],
              defaultValue: 'none',
              admin: {
                layout: 'horizontal',
              },
            },
            {
              name: 'reference',
              type: 'relationship',
              relationTo: ['pages'],
              required: true,
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'reference',
              },
            },
            {
              name: 'url',
              type: 'text',
              label: 'External URL',
              required: true,
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'custom',
              },
            },
          ],
        },
      ],
    },
    backgroundColorField,
  ],
}