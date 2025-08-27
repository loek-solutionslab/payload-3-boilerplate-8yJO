import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../hooks/populatePublishedAt'
import { generatePreviewPath } from '../utilities/generatePreviewPath'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { getServerSideURL } from '@/utilities/getURL'

export const Courses: CollectionConfig<'courses'> = {
  slug: 'courses',
  labels: {
    singular: 'Cursus',
    plural: 'Cursussen',
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
    description: true,
    price: true,
    duration: true,
  },
  admin: {
    defaultColumns: ['title', 'price', 'duration', 'publishedAt'],
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
      name: 'description',
      label: 'Beschrijving',
      type: 'textarea',
      required: true,
    },
    {
      name: 'fullDescription',
      label: 'Volledige Beschrijving',
      type: 'richText',
    },
    {
      name: 'image',
      label: 'Afbeelding',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'price',
      label: 'Prijs',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Prijs in euro\'s',
      },
    },
    {
      name: 'duration',
      label: 'Duur',
      type: 'text',
      required: true,
      admin: {
        description: 'Bijvoorbeeld: "4 weken" of "2 dagen"',
      },
    },
    {
      name: 'targetAudience',
      label: 'Doelgroep',
      type: 'select',
      options: [
        { label: 'Ouders', value: 'parents' },
        { label: 'Kinderdagverblijven', value: 'daycare' },
        { label: 'Scholen', value: 'schools' },
        { label: 'Gemeenten', value: 'municipalities' },
      ],
      hasMany: true,
    },
    {
      name: 'features',
      label: 'Kenmerken',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'sessions',
      label: 'Sessies',
      type: 'array',
      fields: [
        {
          name: 'title',
          label: 'Sessie Titel',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Sessie Beschrijving',
          type: 'textarea',
        },
        {
          name: 'duration',
          label: 'Duur',
          type: 'text',
        },
      ],
    },
    {
      name: 'testimonials',
      label: 'Testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
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