import type { Block } from 'payload'

export const FAQBlock: Block = {
  slug: 'faq',
  interfaceName: 'FAQBlock',
  labels: {
    singular: 'FAQ Sectie',
    plural: 'FAQ Secties',
  },
  fields: [
    {
      name: 'title',
      label: 'Titel',
      type: 'text',
      defaultValue: 'Veelgestelde Vragen',
    },
    {
      name: 'description',
      label: 'Beschrijving',
      type: 'textarea',
    },
    {
      name: 'faqs',
      label: 'Vragen',
      type: 'relationship',
      relationTo: 'faq',
      hasMany: true,
      required: true,
      admin: {
        description: 'Selecteer de vragen die je wilt weergeven in deze sectie',
      },
      filterOptions: {
        active: {
          equals: true,
        },
      },
    },
    {
      name: 'filterByCategory',
      label: 'Filter op Categorie',
      type: 'select',
      admin: {
        description: 'Laat leeg om alle geselecteerde vragen te tonen, of kies een categorie om alleen vragen uit die categorie te tonen',
      },
      options: [
        { label: 'Alle categorieën', value: '' },
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
      ],
    },
  ],
}