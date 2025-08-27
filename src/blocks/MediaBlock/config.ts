import type { Block } from 'payload'
import { backgroundColorField } from '@/fields/backgroundColor'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    backgroundColorField,
  ],
}
