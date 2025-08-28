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
      },
      fields: [
        {
          name: 'type',
          type: 'radio',
          label: 'Navigation Type',
          options: [
            {
              label: 'Simple Link',
              value: 'link',
            },
            {
              label: 'Dropdown Menu',
              value: 'dropdown',
            },
          ],
          defaultValue: 'link',
          admin: {
            layout: 'horizontal',
          },
        },
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
        {
          name: 'dropdownSections',
          type: 'array',
          label: 'Dropdown Sections',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'dropdown',
            description: 'Configure the dropdown menu sections that appear when hovering/clicking this item',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Section Title',
              required: true,
              admin: {
                description: 'Title for this section of the dropdown menu',
              },
            },
            {
              name: 'links',
              type: 'array',
              label: 'Section Links',
              maxRows: 6,
              fields: [
                {
                  name: 'icon',
                  type: 'upload',
                  label: 'Icon',
                  relationTo: 'media',
                  admin: {
                    description: 'Optional icon to display next to the link',
                  },
                },
                link({
                  appearances: false,
                  disableLabel: false,
                  overrides: {
                    label: {
                      label: 'Link Text',
                    },
                  },
                }),
                {
                  name: 'description',
                  type: 'text',
                  label: 'Link Description',
                  admin: {
                    description: 'Optional description shown below the link',
                  },
                },
              ],
            },
          ],
          maxRows: 4,
        },
        {
          name: 'featuredContent',
          type: 'group',
          label: 'Featured Content',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'dropdown',
            description: 'Optional featured content area in the dropdown (like a highlighted blog post or promotion)',
          },
          fields: [
            {
              name: 'show',
              type: 'checkbox',
              label: 'Show Featured Content',
              defaultValue: false,
            },
            {
              name: 'title',
              type: 'text',
              label: 'Featured Section Title',
              admin: {
                condition: (_, siblingData) => Boolean(siblingData.show),
              },
            },
            {
              name: 'image',
              type: 'upload',
              label: 'Featured Image',
              relationTo: 'media',
              admin: {
                condition: (_, siblingData) => Boolean(siblingData.show),
              },
            },
            link({
              appearances: false,
              disableLabel: false,
              overrides: {
                admin: {
                  condition: (_, siblingData) => Boolean(siblingData.show),
                },
                label: {
                  label: 'Featured Link Text',
                },
              },
            }),
            {
              name: 'description',
              type: 'textarea',
              label: 'Featured Description',
              admin: {
                condition: (_, siblingData) => Boolean(siblingData.show),
              },
            },
            {
              name: 'backgroundColor',
              type: 'select',
              label: 'Background Color',
              options: [
                { label: 'Default', value: 'default' },
                { label: 'Secondary', value: 'secondary' },
                { label: 'Muted', value: 'muted' },
              ],
              defaultValue: 'secondary',
              admin: {
                condition: (_, siblingData) => Boolean(siblingData.show),
              },
            },
          ],
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
