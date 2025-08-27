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

export const Services: CollectionConfig<'services'> = {
  slug: 'services',
  labels: {
    singular: 'Dienst',
    plural: 'Diensten',
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
    serviceType: true,
  },
  admin: {
    defaultColumns: ['title', 'serviceType', 'publishedAt'],
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
      name: 'serviceType',
      label: 'Type Dienst',
      type: 'select',
      required: true,
      options: [
        { label: 'Kinderdagverblijf', value: 'daycare' },
        { label: 'Gemeente', value: 'municipality' },
        { label: 'School', value: 'school' },
        { label: 'Ouders', value: 'parents' },
        { label: 'Algemeen', value: 'general' },
      ],
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
      name: 'benefits',
      label: 'Voordelen',
      type: 'array',
      fields: [
        {
          name: 'icon',
          label: 'Icoon',
          type: 'text',
          admin: {
            description: 'Naam van het icoon (bijvoorbeeld: "check", "star", "heart")',
          },
        },
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
      ],
    },
    {
      name: 'features',
      label: 'Kenmerken',
      type: 'array',
      fields: [
        {
          name: 'title',
          label: 'Kenmerk Titel',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Kenmerk Beschrijving',
          type: 'textarea',
        },
        {
          name: 'image',
          label: 'Kenmerk Afbeelding',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'process',
      label: 'Proces',
      type: 'array',
      fields: [
        {
          name: 'step',
          label: 'Stap Nummer',
          type: 'number',
          required: true,
        },
        {
          name: 'title',
          label: 'Stap Titel',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Stap Beschrijving',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'pricing',
      label: 'Prijzen',
      type: 'group',
      fields: [
        {
          name: 'hasCustomPricing',
          label: 'Maatwerk Prijzen',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'price',
          label: 'Prijs',
          type: 'number',
          min: 0,
          admin: {
            condition: (data, siblingData) => !siblingData?.hasCustomPricing,
            description: 'Prijs in euro\'s',
          },
        },
        {
          name: 'priceDescription',
          label: 'Prijs Beschrijving',
          type: 'textarea',
          admin: {
            description: 'Bijvoorbeeld: "Vanaf €500" of "Op aanvraag"',
          },
        },
      ],
    },
    {
      name: 'callToAction',
      label: 'Call to Action',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'CTA Titel',
          type: 'text',
          defaultValue: 'Neem contact op',
        },
        {
          name: 'description',
          label: 'CTA Beschrijving',
          type: 'textarea',
        },
        {
          name: 'buttonText',
          label: 'Knop Tekst',
          type: 'text',
          defaultValue: 'Contact',
        },
        {
          name: 'buttonLink',
          label: 'Knop Link',
          type: 'text',
          defaultValue: '/contact',
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
      name: 'relatedServices',
      label: 'Gerelateerde Diensten',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      filterOptions: ({ id }) => {
        return {
          id: {
            not_equals: id,
          },
        }
      },
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