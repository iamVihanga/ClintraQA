import type { GlobalConfig } from 'payload'

import { link } from '@/payloadcms/fields/link'
import { anyone } from '@/payloadcms/access/anyone'
import { AdminGroups } from '@/payloadcms/utils/admin-groups'

import { revalidateHeader } from './hooks/revalidate-header'

export const Header: GlobalConfig = {
  slug: 'header',
  admin: {
    group: AdminGroups.NavigationAndLayout,
  },
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
          RowLabel: '@/payloadcms/globals/header/RowLabel#RowLabel',
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
