import type { Block } from 'payload'

export const NewsletterCTA: Block = {
  slug: 'newsletterCTA',
  interfaceName: 'NewsletterCTABlock',
  labels: {
    singular: 'Newsletter CTA',
    plural: 'Newsletter CTAs',
  },
  fields: [
    {
      name: 'title',
      label: 'Titel',
      type: 'text',
      required: true,
      defaultValue: 'Schrijf je nu in!',
    },
    {
      name: 'description',
      label: 'Beschrijving',
      type: 'textarea',
      defaultValue: 'Begin vandaag nog met het creëren van een gezonde digitale balans voor je gezin.',
    },
    {
      name: 'buttonText',
      label: 'Knop Tekst',
      type: 'text',
      defaultValue: 'Inschrijven',
    },
    {
      name: 'image',
      label: 'Afbeelding',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'privacyText',
      label: 'Privacy Tekst',
      type: 'textarea',
      defaultValue: 'Door op Inschrijven te klikken, ga je akkoord met onze <a href="/privacy" class="underline">Algemene Voorwaarden</a>.',
      admin: {
        description: 'HTML toegestaan voor links',
      },
    },
  ],
}