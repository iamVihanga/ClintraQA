import type { Block } from 'payload'

export const SocialLinksBlock: Block = {
  slug: 'social-links',
  interfaceName: 'SocialLinksBlock',
  labels: {
    singular: 'Social Links Block',
    plural: 'Social Links Blocks',
  },
  fields: [
    {
      name: 'divider',
      type: 'checkbox',
      label: 'Show Divider',
    },
  ],
}
