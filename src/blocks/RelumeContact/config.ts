import type { Block } from 'payload'

import { backgroundColorField } from '@/fields/backgroundColor'

export const RelumeContact: Block = {
  slug: 'relumeContact',
  interfaceName: 'RelumeContactBlock',
  labels: {
    singular: 'Relume Contact Block',
    plural: 'Relume Contact Blocks',
  },
  admin: {
    description: 'Contact information cards with icons, descriptions, and contact details',
  },
  fields: [
    {
      name: 'contactMethods',
      type: 'array',
      label: 'Contact Methods',
      minRows: 1,
      maxRows: 6,
      defaultValue: [
        {
          icon: 'email',
          title: 'E-mail',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.',
          contactInfo: 'hello@relume.io',
          link: 'mailto:hello@relume.io'
        },
        {
          icon: 'phone',
          title: 'Telefoon',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.',
          contactInfo: '+31 (0)20 123 4567',
          link: 'tel:+31201234567'
        },
        {
          icon: 'location',
          title: 'Kantoor',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.',
          contactInfo: 'Hoofdstraat 123, Amsterdam 1012 AB NL',
          link: 'https://maps.google.com/?q=Hoofdstraat+123,+Amsterdam'
        }
      ],
      labels: {
        singular: 'Contact Method',
        plural: 'Contact Methods',
      },
      admin: {
        components: {
          RowLabel: ({ data, index }) => {
            return data?.title || `Contact Method ${String(index + 1).padStart(2, '0')}`
          },
        },
      },
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          required: true,
          defaultValue: 'email',
          options: [
            {
              label: 'Email',
              value: 'email',
            },
            {
              label: 'Phone',
              value: 'phone',
            },
            {
              label: 'Location/Map',
              value: 'location',
            },
            {
              label: 'Calendar',
              value: 'calendar',
            },
            {
              label: 'Message',
              value: 'message',
            },
            {
              label: 'Clock',
              value: 'clock',
            },
          ],
          admin: {
            description: 'Choose an icon to represent this contact method',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
          admin: {
            description: 'Heading for this contact method (e.g., "E-mail", "Telefoon")',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
          admin: {
            description: 'Brief description or context for this contact method',
          },
        },
        {
          name: 'contactInfo',
          type: 'text',
          label: 'Contact Information',
          required: true,
          admin: {
            description: 'The actual contact info (email, phone number, address, etc.)',
          },
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link URL',
          admin: {
            description: 'Optional link (mailto:, tel:, maps URL, etc.)',
          },
        },
      ],
    },
    backgroundColorField,
  ],
}