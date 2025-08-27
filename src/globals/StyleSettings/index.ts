import type { GlobalConfig } from 'payload'

export const StyleSettings: GlobalConfig = {
  slug: 'styleSettings',
  label: 'Style Settings',
  access: {
    read: () => true,
  },
  admin: {
    description: 'Manage site-wide colors, fonts, and design system settings.',
    group: 'Design System',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Colors',
          fields: [
            {
              name: 'backgroundColors',
              type: 'array',
              label: 'Background Colors',
              admin: {
                description: 'Define the available background colors for blocks. These will appear as options in all block configurations.',
                initCollapsed: false,
                components: {
                  RowLabel: ({ data, index }) => {
                    return data?.name || `Color ${String(index).padStart(2, '0')}`
                  },
                },
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  label: 'Color Name',
                  required: true,
                  admin: {
                    description: 'Display name for this color (e.g., "Persian Green Light", "Neutral Dark")',
                  },
                },
                {
                  name: 'value',
                  type: 'text',
                  label: 'CSS Value',
                  required: true,
                  admin: {
                    description: 'CSS color value (e.g., "#01B09A", "rgb(1, 176, 154)", or CSS class like "bg-primary")',
                  },
                },
                {
                  name: 'category',
                  type: 'select',
                  label: 'Color Category',
                  options: [
                    { label: 'Neutrals', value: 'neutrals' },
                    { label: 'Smalt Blue', value: 'smalt-blue' },
                    { label: 'Persian Green', value: 'persian-green' },
                    { label: 'Merino', value: 'merino' },
                    { label: 'Bittersweet', value: 'bittersweet' },
                    { label: 'Regent St Blue', value: 'regent-st-blue' },
                    { label: 'Other', value: 'other' },
                  ],
                  admin: {
                    description: 'Group colors by category for better organization',
                  },
                },
                {
                  name: 'shade',
                  type: 'select',
                  label: 'Shade Level',
                  options: [
                    { label: 'Lightest', value: 'lightest' },
                    { label: 'Lighter', value: 'lighter' },
                    { label: 'Light', value: 'light' },
                    { label: 'Base', value: 'base' },
                    { label: 'Dark', value: 'dark' },
                    { label: 'Darker', value: 'darker' },
                    { label: 'Darkest', value: 'darkest' },
                  ],
                  admin: {
                    description: 'Shade level for better organization (optional)',
                  },
                },
                {
                  name: 'isDefault',
                  type: 'checkbox',
                  label: 'Set as Default',
                  admin: {
                    description: 'Check this to make this the default background color for new blocks',
                  },
                },
              ],
            },
            {
              name: 'textColors',
              type: 'array',
              label: 'Text Colors',
              admin: {
                description: 'Define text colors for typography and content blocks.',
                initCollapsed: true,
                components: {
                  RowLabel: ({ data, index }) => {
                    return data?.name || `Text Color ${String(index).padStart(2, '0')}`
                  },
                },
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  label: 'Color Name',
                  required: true,
                },
                {
                  name: 'value',
                  type: 'text',
                  label: 'CSS Value',
                  required: true,
                },
                {
                  name: 'usage',
                  type: 'select',
                  label: 'Recommended Usage',
                  options: [
                    { label: 'Headings', value: 'headings' },
                    { label: 'Body Text', value: 'body' },
                    { label: 'Links', value: 'links' },
                    { label: 'Accent', value: 'accent' },
                    { label: 'Muted', value: 'muted' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Typography',
          fields: [
            {
              name: 'fontFamilies',
              type: 'array',
              label: 'Font Families',
              admin: {
                description: 'Define available font families for the site.',
                initCollapsed: false,
                components: {
                  RowLabel: ({ data, index }) => {
                    return data?.name || `Font ${String(index).padStart(2, '0')}`
                  },
                },
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  label: 'Font Name',
                  required: true,
                  admin: {
                    description: 'Display name (e.g., "Primary Heading Font", "Body Text")',
                  },
                },
                {
                  name: 'cssValue',
                  type: 'text',
                  label: 'CSS Font Family',
                  required: true,
                  admin: {
                    description: 'CSS font-family value (e.g., "Inter, sans-serif", "font-heading")',
                  },
                },
                {
                  name: 'category',
                  type: 'select',
                  label: 'Font Category',
                  options: [
                    { label: 'Headings', value: 'headings' },
                    { label: 'Body Text', value: 'body' },
                    { label: 'Display', value: 'display' },
                    { label: 'Monospace', value: 'mono' },
                  ],
                },
                {
                  name: 'weights',
                  type: 'array',
                  label: 'Available Weights',
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                      label: 'Weight Name',
                      admin: {
                        description: 'e.g., "Regular", "Medium", "Bold"',
                      },
                    },
                    {
                      name: 'value',
                      type: 'text',
                      label: 'CSS Weight',
                      admin: {
                        description: 'e.g., "400", "500", "700", "font-medium"',
                      },
                    },
                  ],
                },
                {
                  name: 'isDefault',
                  type: 'checkbox',
                  label: 'Set as Default',
                  admin: {
                    description: 'Check this for the default font family',
                  },
                },
              ],
            },
            {
              name: 'fontSizes',
              type: 'array',
              label: 'Font Sizes',
              admin: {
                description: 'Define typography scale for consistent sizing.',
                initCollapsed: true,
                components: {
                  RowLabel: ({ data, index }) => {
                    return data?.name || `Size ${String(index).padStart(2, '0')}`
                  },
                },
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  label: 'Size Name',
                  required: true,
                  admin: {
                    description: 'e.g., "Heading 1", "Body Large", "Caption"',
                  },
                },
                {
                  name: 'value',
                  type: 'text',
                  label: 'CSS Value',
                  required: true,
                  admin: {
                    description: 'e.g., "2.5rem", "18px", "text-xl"',
                  },
                },
                {
                  name: 'category',
                  type: 'select',
                  label: 'Category',
                  options: [
                    { label: 'Display', value: 'display' },
                    { label: 'Heading', value: 'heading' },
                    { label: 'Body', value: 'body' },
                    { label: 'Caption', value: 'caption' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Spacing & Layout',
          fields: [
            {
              name: 'spacing',
              type: 'array',
              label: 'Spacing Scale',
              admin: {
                description: 'Define consistent spacing values for margins, padding, and gaps.',
                initCollapsed: true,
                components: {
                  RowLabel: ({ data, index }) => {
                    return data?.name || `Spacing ${String(index).padStart(2, '0')}`
                  },
                },
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  label: 'Spacing Name',
                  required: true,
                  admin: {
                    description: 'e.g., "Extra Small", "Medium", "Large"',
                  },
                },
                {
                  name: 'value',
                  type: 'text',
                  label: 'CSS Value',
                  required: true,
                  admin: {
                    description: 'e.g., "8px", "1rem", "space-4"',
                  },
                },
                {
                  name: 'usage',
                  type: 'text',
                  label: 'Recommended Usage',
                  admin: {
                    description: 'e.g., "Button padding", "Section margins"',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}