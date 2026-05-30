import { defaultLexicalEditor } from '@/payloadcms/fields/default-lexical-editor'
import type { Block } from 'payload'

export const GridLayoutBlock: Block = {
  slug: 'grid-layout',
  interfaceName: 'GridLayoutBlock',
  labels: {
    singular: 'Grid Layout',
    plural: 'Grid Layouts',
  },
  fields: [
    {
      name: 'cards',
      type: 'array',
      fields: [
        {
          name: 'content',
          type: 'richText',
          label: 'Card Content',
          editor: defaultLexicalEditor,
          required: true,
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
  ],
}
