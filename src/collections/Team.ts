import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

export const Team: CollectionConfig<'team'> = {
  slug: 'team',
  labels: {
    singular: 'Teamlid',
    plural: 'Team',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    name: true,
    role: true,
    image: true,
  },
  admin: {
    defaultColumns: ['name', 'role', 'order', 'active'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      label: 'Naam',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      label: 'Functie',
      type: 'text',
      required: true,
      admin: {
        description: 'Bijvoorbeeld: "Oprichter & Media-adviseur", "Pedagogisch Expert"',
      },
    },
    {
      name: 'image',
      label: 'Profielfoto',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'bio',
      label: 'Biografie',
      type: 'richText',
      required: true,
      admin: {
        description: 'Korte beschrijving van achtergrond en expertise',
      },
    },
    {
      name: 'expertise',
      label: 'Expertisegebieden',
      type: 'array',
      fields: [
        {
          name: 'area',
          label: 'Expertisegebied',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Bijvoorbeeld: "Schermtijd balans", "Pedagogische ontwikkeling"',
      },
    },
    {
      name: 'qualifications',
      label: 'Kwalificaties',
      type: 'array',
      fields: [
        {
          name: 'qualification',
          label: 'Kwalificatie',
          type: 'text',
          required: true,
        },
        {
          name: 'institution',
          label: 'Instelling',
          type: 'text',
        },
        {
          name: 'year',
          label: 'Jaar',
          type: 'number',
        },
      ],
    },
    {
      name: 'socialMedia',
      label: 'Social Media',
      type: 'group',
      fields: [
        {
          name: 'linkedin',
          label: 'LinkedIn',
          type: 'text',
        },
        {
          name: 'twitter',
          label: 'Twitter/X',
          type: 'text',
        },
        {
          name: 'instagram',
          label: 'Instagram',
          type: 'text',
        },
        {
          name: 'website',
          label: 'Persoonlijke Website',
          type: 'text',
        },
      ],
    },
    {
      name: 'order',
      label: 'Volgorde',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Bepaalt de volgorde waarin teamleden worden weergegeven',
      },
    },
    {
      name: 'active',
      label: 'Actief',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Schakel uit om tijdelijk te verbergen zonder te verwijderen',
      },
    },
    {
      name: 'featuredQuote',
      label: 'Uitgelichte Quote',
      type: 'textarea',
      admin: {
        description: 'Optionele quote om te tonen op de over-ons pagina',
      },
    },
  ],
  defaultSort: 'order',
}