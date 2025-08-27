import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header & Navigation',
  access: {
    read: () => true,
  },
  admin: {
    description: 'Configure the site header, logo, and main navigation.',
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      label: 'Logo',
      relationTo: 'media',
      admin: {
        description: 'Upload your site logo. Will be displayed in the header.',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Items',
      admin: {
        description: 'Add navigation links that will appear in the main header menu.',
        components: {
          RowLabel: ({ data, index }) => {
            return data?.link?.label || data?.link?.url || `Nav Item ${String(index + 1).padStart(2, '0')}`
          },
        },
      },
      fields: [
        link({
          appearances: false,
          disableLabel: false,
          overrides: {
            label: {
              label: 'Menu Text',
              admin: {
                description: 'Text that will appear in the navigation menu',
              },
            },
          },
        }),
        {
          name: 'description',
          type: 'text',
          label: 'Description',
          admin: {
            description: 'Optional description for accessibility and tooltips',
          },
        },
        {
          name: 'featured',
          type: 'checkbox',
          label: 'Featured Item',
          admin: {
            description: 'Highlight this navigation item (e.g., different styling)',
          },
        },
      ],
      maxRows: 8,
    },
    {
      name: 'ctaButton',
      type: 'group',
      label: 'Call-to-Action Button',
      admin: {
        description: 'Optional prominent button in the header (e.g., "Contact Us", "Sign Up")',
        collapsed: true,
      },
      fields: [
        {
          name: 'show',
          type: 'checkbox',
          label: 'Show CTA Button',
          defaultValue: false,
        },
        link({
          appearances: false,
          disableLabel: false,
          overrides: {
            admin: {
              condition: (_, siblingData) => Boolean(siblingData.show),
            },
          },
        }),
        {
          name: 'style',
          type: 'select',
          label: 'Button Style',
          defaultValue: 'primary',
          options: [
            { label: 'Primary (Filled)', value: 'primary' },
            { label: 'Secondary (Outline)', value: 'secondary' },
            { label: 'Accent', value: 'accent' },
          ],
          admin: {
            condition: (_, siblingData) => Boolean(siblingData.show),
          },
        },
      ],
    },
    {
      name: 'showSearch',
      type: 'checkbox',
      label: 'Show Search Icon',
      defaultValue: true,
      admin: {
        description: 'Display a search icon in the header navigation',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
