import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../hooks/populatePublishedAt'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const AgeGroups: CollectionConfig<'ageGroups'> = {
  slug: 'ageGroups',
  labels: {
    singular: 'Leeftijdsgroep',
    plural: 'Leeftijdsgroepen',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    ageRange: true,
    description: true,
  },
  admin: {
    defaultColumns: ['title', 'ageRange', 'order', 'publishedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Titel',
      type: 'text',
      required: true,
    },
    {
      name: 'ageRange',
      label: 'Leeftijdsbereik',
      type: 'text',
      required: true,
      admin: {
        description: 'Bijvoorbeeld: "0-1 jaar" of "4-6 jaar"',
      },
    },
    {
      name: 'description',
      label: 'Korte Beschrijving',
      type: 'textarea',
      required: true,
    },
    {
      name: 'heroImage',
      label: 'Hero Afbeelding',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'order',
      label: 'Volgorde',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Bepaalt de volgorde waarin leeftijdsgroepen worden weergegeven',
      },
    },
    {
      name: 'content',
      label: 'Inhoud Secties',
      type: 'array',
      fields: [
        {
          name: 'title',
          label: 'Sectie Titel',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          label: 'Sectie Inhoud',
          type: 'richText',
          required: true,
        },
        {
          name: 'image',
          label: 'Sectie Afbeelding',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'imagePosition',
          label: 'Afbeelding Positie',
          type: 'select',
          defaultValue: 'right',
          options: [
            { label: 'Links', value: 'left' },
            { label: 'Rechts', value: 'right' },
          ],
        },
      ],
    },
    {
      name: 'tips',
      label: 'Tips',
      type: 'array',
      fields: [
        {
          name: 'tip',
          label: 'Tip',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'resources',
      label: 'Hulpbronnen',
      type: 'array',
      fields: [
        {
          name: 'title',
          label: 'Titel',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Beschrijving',
          type: 'textarea',
        },
        {
          name: 'link',
          label: 'Link',
          type: 'text',
        },
        {
          name: 'type',
          label: 'Type',
          type: 'select',
          options: [
            { label: 'Artikel', value: 'article' },
            { label: 'Video', value: 'video' },
            { label: 'App', value: 'app' },
            { label: 'Website', value: 'website' },
            { label: 'Boek', value: 'book' },
          ],
        },
      ],
    },
    {
      name: 'faqs',
      label: 'Veelgestelde Vragen',
      type: 'relationship',
      relationTo: 'faq',
      hasMany: true,
    },
    {
      name: 'relatedCourses',
      label: 'Gerelateerde Cursussen',
      type: 'relationship',
      relationTo: 'courses',
      hasMany: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'meta',
      label: 'SEO',
      type: 'group',
      fields: [
        OverviewField({
          titlePath: 'meta.title',
          descriptionPath: 'meta.description',
          imagePath: 'meta.image',
        }),
        MetaTitleField({
          hasGenerateFn: true,
        }),
        MetaImageField({
          relationTo: 'media',
        }),
        MetaDescriptionField({}),
        PreviewField({
          hasGenerateFn: true,
          titlePath: 'meta.title',
          descriptionPath: 'meta.description',
        }),
      ],
    },
    ...slugField(),
  ],
  hooks: {
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
    maxPerDoc: 50,
  },
}