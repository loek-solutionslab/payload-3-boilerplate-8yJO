import type { Block } from 'payload'

import { backgroundColorField } from '@/fields/backgroundColor'

export const RelumePricing: Block = {
  slug: 'relumePricing',
  interfaceName: 'RelumePricingBlock',
  labels: {
    singular: 'Relume Pricing Block',
    plural: 'Relume Pricing Blocks',
  },
  admin: {},
  fields: [
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
      defaultValue: 'Prijzen',
      admin: {
        description: 'Small text above the title',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Prijsplan',
      admin: {
        description: 'Main heading for the pricing section',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue: 'Ontdek onze flexibele cursusopties voor ouders.',
      admin: {
        description: 'Description text below the title',
      },
    },
    {
      name: 'monthlyTabLabel',
      type: 'text',
      label: 'Monthly Tab Label',
      defaultValue: 'Maandelijks',
      admin: {
        description: 'Label for the monthly pricing tab',
      },
    },
    {
      name: 'yearlyTabLabel',
      type: 'text',
      label: 'Yearly Tab Label',
      defaultValue: 'Jaarlijks',
      admin: {
        description: 'Label for the yearly pricing tab',
      },
    },
    {
      name: 'plans',
      type: 'array',
      label: 'Pricing Plans',
      minRows: 1,
      maxRows: 4,
      labels: {
        singular: 'Plan',
        plural: 'Plans',
      },
      admin: {},
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Plan Name',
          required: true,
          admin: {
            description: 'Name of the pricing plan (e.g., "Basisplan")',
          },
        },
        {
          name: 'monthlyPrice',
          type: 'text',
          label: 'Monthly Price',
          required: true,
          admin: {
            description: 'Monthly price display (e.g., "$19/mo")',
          },
        },
        {
          name: 'yearlyPrice',
          type: 'text',
          label: 'Yearly Price',
          required: true,
          admin: {
            description: 'Yearly price display (e.g., "$180/yr")',
          },
        },
        {
          name: 'yearlyDiscount',
          type: 'text',
          label: 'Yearly Discount Text',
          admin: {
            description: 'Optional discount text for yearly plan (e.g., "Bespaar 20% met het jaarplan")',
          },
        },
        {
          name: 'features',
          type: 'array',
          label: 'Features',
          minRows: 1,
          maxRows: 10,
          labels: {
            singular: 'Feature',
            plural: 'Features',
          },
          admin: {},
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Feature Text',
              required: true,
              admin: {
                description: 'Description of the feature included in this plan',
              },
            },
          ],
        },
        {
          name: 'buttonText',
          type: 'text',
          label: 'Button Text',
          defaultValue: 'Aan de slag',
          admin: {
            description: 'Text for the call-to-action button',
          },
        },
        {
          name: 'buttonLink',
          type: 'group',
          label: 'Button Link',
          fields: [
            {
              name: 'type',
              type: 'radio',
              options: [
                {
                  label: 'Internal Page',
                  value: 'reference',
                },
                {
                  label: 'External URL',
                  value: 'custom',
                },
              ],
              defaultValue: 'reference',
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