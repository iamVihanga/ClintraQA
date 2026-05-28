import type { Block } from 'payload'

import { link } from '@/payloadcms/fields/link'

export const RichLinkBlock: Block = {
  slug: 'rich-link',
  interfaceName: 'RichLinkBlock',
  labels: {
    singular: 'Rich Link',
    plural: 'Rich Links',
  },
  fields: [
    link({
      appearances: false,
    }),
  ],
}
