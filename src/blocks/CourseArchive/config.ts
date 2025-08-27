import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const CourseArchive: Block = {
  slug: 'courseArchive',
  interfaceName: 'CourseArchiveBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: 'Cursussen & Trainingen',
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
          label: 'All Courses',
          value: 'collection',
        },
        {
          label: 'Selected Courses',
          value: 'selection',
        },
        {
          label: 'By Target Audience',
          value: 'targetAudience',
        },
      ],
    },
    {
      name: 'targetAudience',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'targetAudience',
      },
      label: 'Target Audience Filter',
      options: [
        { label: 'Voor Ouders', value: 'parents' },
        { label: 'Voor Kinderdagverblijven', value: 'daycare' },
        { label: 'Voor Scholen', value: 'schools' },
        { label: 'Voor Gemeenten', value: 'municipalities' },
      ],
      hasMany: true,
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection' || siblingData.populateBy === 'targetAudience',
        step: 1,
      },
      defaultValue: 10,
      label: 'Limit',
    },
    {
      name: 'selectedCourses',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      label: 'Selected Courses',
      relationTo: 'courses',
    },
    {
      name: 'showCategories',
      type: 'checkbox',
      label: 'Show Category Filter Buttons',
      defaultValue: true,
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Layout Style',
      defaultValue: 'grid',
      options: [
        { label: 'Grid Layout', value: 'grid' },
        { label: 'List Layout', value: 'list' },
      ],
    },
  ],
  labels: {
    plural: 'Course Archives',
    singular: 'Course Archive',
  },
}