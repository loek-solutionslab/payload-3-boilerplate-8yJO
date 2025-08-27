import type { Block } from 'payload'

import { backgroundColorField } from '@/fields/backgroundColor'

export const RelumeTeam: Block = {
  slug: 'relumeTeam',
  interfaceName: 'RelumeTeamBlock',
  labels: {
    singular: 'Relume Team Block',
    plural: 'Relume Team Blocks',
  },
  admin: {},
  fields: [
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
      defaultValue: 'Team',
      admin: {
        description: 'Small text above the title',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Ons Team',
      admin: {
        description: 'Main heading for the team section',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue: 'Professionele mediacoaches voor de onderbouw',
      admin: {
        description: 'Description text below the title',
      },
    },
    {
      name: 'teamMembers',
      type: 'array',
      label: 'Team Members',
      minRows: 1,
      maxRows: 20,
      labels: {
        singular: 'Team Member',
        plural: 'Team Members',
      },
      admin: {},
      fields: [
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Professional headshot photo',
          },
        },
        {
          name: 'name',
          type: 'text',
          label: 'Full Name',
          required: true,
          admin: {
            description: 'Team member\'s full name',
          },
        },
        {
          name: 'position',
          type: 'text',
          label: 'Job Title/Position',
          required: true,
          admin: {
            description: 'Team member\'s role or job title',
          },
        },
        {
          name: 'bio',
          type: 'textarea',
          label: 'Short Bio',
          required: true,
          admin: {
            description: 'Brief description of their expertise or role',
          },
        },
        {
          name: 'socialLinks',
          type: 'array',
          label: 'Social Media Links',
          maxRows: 5,
          labels: {
            singular: 'Social Link',
            plural: 'Social Links',
          },
          admin: {},
          fields: [
            {
              name: 'platform',
              type: 'select',
              label: 'Platform',
              options: [
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'Twitter/X', value: 'twitter' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'Facebook', value: 'facebook' },
                { label: 'Dribbble', value: 'dribbble' },
                { label: 'GitHub', value: 'github' },
                { label: 'Website', value: 'website' },
              ],
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              label: 'Profile URL',
              required: true,
              admin: {
                description: 'Full URL to the social media profile',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'hiringSection',
      type: 'group',
      label: 'Hiring Section',
      admin: {
        description: 'Optional section to promote open positions',
      },
      fields: [
        {
          name: 'show',
          type: 'checkbox',
          label: 'Show Hiring Section',
          defaultValue: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Hiring Title',
          defaultValue: 'We werven!',
          admin: {
            condition: (_, siblingData) => Boolean(siblingData.show),
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Hiring Description',
          defaultValue: 'Word onderdeel van ons groeiende team!',
          admin: {
            condition: (_, siblingData) => Boolean(siblingData.show),
          },
        },
        {
          name: 'buttonText',
          type: 'text',
          label: 'Button Text',
          defaultValue: 'Open posities',
          admin: {
            condition: (_, siblingData) => Boolean(siblingData.show),
          },
        },
        {
          name: 'buttonLink',
          type: 'group',
          label: 'Button Link',
          admin: {
            condition: (_, siblingData) => Boolean(siblingData.show),
          },
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