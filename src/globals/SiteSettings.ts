import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  labels: {
    singular: 'Site Instellingen',
    plural: 'Site Instellingen',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      label: 'Site Naam',
      type: 'text',
      required: true,
      defaultValue: 'Schermblij',
    },
    {
      name: 'siteDescription',
      label: 'Site Beschrijving',
      type: 'textarea',
      required: true,
      defaultValue: 'Hulp bij het vinden van de perfecte balans tussen schermtijd en offline activiteiten voor kinderen.',
    },
    {
      name: 'defaultSEO',
      label: 'Standaard SEO',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Standaard Titel',
          type: 'text',
          defaultValue: 'Schermblij - Gezonde schermtijd voor kinderen',
        },
        {
          name: 'description',
          label: 'Standaard Beschrijving',
          type: 'textarea',
          defaultValue: 'Bij Schermblij helpen we ouders om een gezonde balans te creëren tussen online en offline activiteiten. Ontdek hoe digitale media een waardevolle aanvulling kan zijn op het leven van uw kinderen.',
        },
        {
          name: 'keywords',
          label: 'Standaard Keywords',
          type: 'text',
          defaultValue: 'schermtijd, kinderen, opvoeding, digitale media, balans, ouders, educatie',
        },
        {
          name: 'ogImage',
          label: 'Standaard OG Afbeelding',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'analytics',
      label: 'Analytics',
      type: 'group',
      fields: [
        {
          name: 'googleAnalyticsId',
          label: 'Google Analytics ID',
          type: 'text',
          admin: {
            description: 'Bijvoorbeeld: G-XXXXXXXXXX',
          },
        },
        {
          name: 'googleTagManagerId',
          label: 'Google Tag Manager ID',
          type: 'text',
          admin: {
            description: 'Bijvoorbeeld: GTM-XXXXXXX',
          },
        },
        {
          name: 'facebookPixelId',
          label: 'Facebook Pixel ID',
          type: 'text',
        },
      ],
    },
    {
      name: 'maintenance',
      label: 'Onderhoud',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          label: 'Onderhoudsmode Actief',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'message',
          label: 'Onderhoudsbericht',
          type: 'richText',
          admin: {
            condition: (data, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'allowedIPs',
          label: 'Toegestane IP Adressen',
          type: 'array',
          admin: {
            condition: (data, siblingData) => siblingData?.enabled,
            description: 'IP adressen die nog steeds toegang hebben tijdens onderhoud',
          },
          fields: [
            {
              name: 'ip',
              label: 'IP Adres',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'notifications',
      label: 'Notificaties',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          label: 'Site Banner Actief',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'type',
          label: 'Banner Type',
          type: 'select',
          options: [
            { label: 'Info', value: 'info' },
            { label: 'Waarschuwing', value: 'warning' },
            { label: 'Succes', value: 'success' },
            { label: 'Fout', value: 'error' },
          ],
          defaultValue: 'info',
          admin: {
            condition: (data, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'message',
          label: 'Banner Bericht',
          type: 'richText',
          admin: {
            condition: (data, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'dismissible',
          label: 'Wegklikbaar',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            condition: (data, siblingData) => siblingData?.enabled,
          },
        },
      ],
    },
    {
      name: 'forms',
      label: 'Formulier Instellingen',
      type: 'group',
      fields: [
        {
          name: 'contactEmail',
          label: 'Contact E-mail',
          type: 'email',
          required: true,
          admin: {
            description: 'E-mailadres waar contactformulieren naartoe gestuurd worden',
          },
        },
        {
          name: 'newsletterProvider',
          label: 'Newsletter Provider',
          type: 'select',
          options: [
            { label: 'Mailchimp', value: 'mailchimp' },
            { label: 'ConvertKit', value: 'convertkit' },
            { label: 'Klaviyo', value: 'klaviyo' },
            { label: 'Custom', value: 'custom' },
          ],
          admin: {
            description: 'Welke service gebruik je voor de nieuwsbrief?',
          },
        },
        {
          name: 'recaptchaSiteKey',
          label: 'reCAPTCHA Site Key',
          type: 'text',
          admin: {
            description: 'Voor spam bescherming op formulieren',
          },
        },
      ],
    },
  ],
}