import type { GlobalConfig } from 'payload'

import { link } from '@/payloadcms/fields/link'
import { anyone } from '@/payloadcms/access/anyone'

import { revalidateHeader } from './hooks/revalidate-header'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: anyone,
  },
  fields: [
    {
      name: 'navigationLinks',
      label: 'Navigation Links',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 8,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'callToAction',
      label: 'Call to Action',
      type: 'group',
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
