import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

export const Testimonials: CollectionConfig<'testimonials'> = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    name: true,
    content: true,
    rating: true,
  },
  admin: {
    defaultColumns: ['name', 'rating', 'featured', 'publishedAt'],
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
      label: 'Functie/Rol',
      type: 'text',
      admin: {
        description: 'Bijvoorbeeld: "Moeder van 2", "Pedagoog", "Directeur"',
      },
    },
    {
      name: 'company',
      label: 'Organisatie',
      type: 'text',
      admin: {
        description: 'Naam van kinderdagverblijf, school of gemeente (optioneel)',
      },
    },
    {
      name: 'content',
      label: 'Testimonial Tekst',
      type: 'textarea',
      required: true,
    },
    {
      name: 'rating',
      label: 'Beoordeling',
      type: 'select',
      required: true,
      options: [
        { label: '1 ster', value: '1' },
        { label: '2 sterren', value: '2' },
        { label: '3 sterren', value: '3' },
        { label: '4 sterren', value: '4' },
        { label: '5 sterren', value: '5' },
      ],
      defaultValue: '5',
    },
    {
      name: 'avatar',
      label: 'Foto',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optionele profielfoto',
      },
    },
    {
      name: 'serviceUsed',
      label: 'Gebruikte Dienst/Cursus',
      type: 'select',
      options: [
        { label: 'Algemeen', value: 'general' },
        { label: 'Cursus', value: 'course' },
        { label: 'Kinderdagverblijf Service', value: 'daycare' },
        { label: 'Gemeente Service', value: 'municipality' },
        { label: 'School Service', value: 'school' },
      ],
      defaultValue: 'general',
    },
    {
      name: 'featured',
      label: 'Uitgelicht',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Toon deze testimonial op de homepage en andere belangrijke pagina\'s',
      },
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Schermtijd', value: 'screen-time' },
        { label: 'Opvoeding', value: 'parenting' },
        { label: 'Educatie', value: 'education' },
        { label: 'Balans', value: 'balance' },
        { label: 'Baby', value: 'baby' },
        { label: 'Peuter', value: 'toddler' },
        { label: 'Kleuter', value: 'preschooler' },
        { label: 'Basisschool', value: 'elementary' },
      ],
    },
    {
      name: 'publishedAt',
      label: 'Gepubliceerd op',
      type: 'date',
      defaultValue: () => new Date(),
      admin: {
        position: 'sidebar',
      },
    },
  ],
  defaultSort: '-publishedAt',
}