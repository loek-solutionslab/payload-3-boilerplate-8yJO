import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const AgeGroupsArchive: Block = {
  slug: 'ageGroupsArchive',
  interfaceName: 'AgeGroupsArchiveBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: 'Voor Elke Leeftijd',
    },
    {
      name: 'description',
      type: 'textarea', 
      label: 'Description',
    },
    {
      name: 'introContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Intro Content',
    },
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'collection',
      options: [
        {
          label: 'All Age Groups',
          value: 'collection',
        },
        {
          label: 'Selected Age Groups',
          value: 'selection',
        },
      ],
    },
    {
      name: 'selectedAgeGroups',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      label: 'Selected Age Groups',
      relationTo: 'ageGroups',
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        step: 1,
      },
      defaultValue: 10,
      label: 'Limit',
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Layout Style',
      defaultValue: 'grid',
      options: [
        { label: 'Grid Layout', value: 'grid' },
        { label: 'List Layout', value: 'list' },
        { label: 'Timeline Layout', value: 'timeline' },
      ],
    },
  ],
  labels: {
    plural: 'Age Groups Archives',
    singular: 'Age Groups Archive',
  },
}