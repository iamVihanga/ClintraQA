import type { GlobalConfig } from 'payload'

import { anyone } from '@/payloadcms/access/anyone'
import { AdminGroups } from '@/payloadcms/utils/admin-groups'

import { revalidateFaq } from './hooks/revalidate-faq'

export const Faq: GlobalConfig = {
  slug: 'faq',
  admin: {
    group: AdminGroups.ContentManagement,
  },
  access: {
    read: anyone,
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'FAQ Items',
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Question',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          label: 'Answer',
          required: true,
        },
        {
          name: 'category',
          type: 'text',
          label: 'Category',
          admin: {
            description:
              'Optional. Group items by category for selective display in blocks.',
          },
        },
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/payloadcms/globals/faq/RowLabel#FaqRowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFaq],
  },
}
