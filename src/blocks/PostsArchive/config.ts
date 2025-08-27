import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const PostsArchive: Block = {
  slug: 'postsArchive',
  interfaceName: 'PostsArchiveBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: 'Blog',
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
          label: 'All Posts',
          value: 'collection',
        },
        {
          label: 'Selected Posts',
          value: 'selection',
        },
        {
          label: 'By Category',
          value: 'category',
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'category',
      },
      hasMany: true,
      label: 'Categories Filter',
      relationTo: 'categories',
    },
    {
      name: 'selectedPosts',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      label: 'Selected Posts',
      relationTo: 'posts',
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection' || siblingData.populateBy === 'category',
        step: 1,
      },
      defaultValue: 10,
      label: 'Limit',
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
        { label: 'Magazine Layout', value: 'magazine' },
      ],
    },
  ],
  labels: {
    plural: 'Posts Archives',
    singular: 'Posts Archive',
  },
}