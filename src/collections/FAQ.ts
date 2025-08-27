import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

export const FAQ: CollectionConfig<'faq'> = {
  slug: 'faq',
  labels: {
    singular: 'Vraag',
    plural: 'Veelgestelde Vragen',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    question: true,
    answer: true,
    category: true,
  },
  admin: {
    defaultColumns: ['question', 'category', 'order', 'active'],
    useAsTitle: 'question',
  },
  fields: [
    {
      name: 'question',
      label: 'Vraag',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      label: 'Antwoord',
      type: 'richText',
      required: true,
    },
    {
      name: 'category',
      label: 'Categorie',
      type: 'select',
      required: true,
      options: [
        { label: 'Algemeen', value: 'general' },
        { label: 'Schermtijd', value: 'screen-time' },
        { label: 'Baby (0-1 jaar)', value: 'baby' },
        { label: 'Peuter (1-3 jaar)', value: 'toddler' },
        { label: 'Kleuter (3-6 jaar)', value: 'preschooler' },
        { label: 'Basisschool (6-12 jaar)', value: 'elementary' },
        { label: 'Cursussen', value: 'courses' },
        { label: 'Kinderdagverblijf', value: 'daycare' },
        { label: 'Gemeente', value: 'municipality' },
        { label: 'School', value: 'school' },
        { label: 'Technisch', value: 'technical' },
      ],
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Opvoeding', value: 'parenting' },
        { label: 'Educatie', value: 'education' },
        { label: 'Balans', value: 'balance' },
        { label: 'Veiligheid', value: 'safety' },
        { label: 'Ontwikkeling', value: 'development' },
        { label: 'Media', value: 'media' },
        { label: 'Apps', value: 'apps' },
        { label: 'Games', value: 'games' },
        { label: 'Video\'s', value: 'videos' },
        { label: 'Social Media', value: 'social-media' },
      ],
    },
    {
      name: 'order',
      label: 'Volgorde',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Bepaalt de volgorde waarin vragen worden weergegeven binnen een categorie',
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
      name: 'helpful',
      label: 'Vaak Nuttig Gevonden',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Markeer als deze vraag vaak als nuttig wordt beoordeeld door bezoekers',
      },
    },
    {
      name: 'relatedQuestions',
      label: 'Gerelateerde Vragen',
      type: 'relationship',
      relationTo: 'faq',
      hasMany: true,
      filterOptions: ({ id }) => {
        return {
          id: {
            not_equals: id,
          },
        }
      },
      admin: {
        description: 'Koppel gerelateerde vragen die bezoekers ook interessant kunnen vinden',
      },
    },
  ],
  defaultSort: 'order',
}