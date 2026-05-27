import { link } from '@/payloadcms/fields/link'
import type { Block } from 'payload'

export const SectionHeaderBlock: Block = {
  slug: 'section-header',
  interfaceName: 'SectionHeaderBlock',
  labels: {
    singular: 'Section Header',
    plural: 'Section Headers',
  },
  fields: [
    {
      name: 'label',
      label: 'Label',
      type: 'text',
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'textarea',
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Header CTA',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Enable Header CTA',
          defaultValue: true,
        },
        link({
          overrides: {
            label: '',
            admin: {
              condition: (_, siblingData) => !!siblingData?.enabled,
            },
          },
        }),
      ],
    },
  ],
}
