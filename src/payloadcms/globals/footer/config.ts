import type { GlobalConfig } from 'payload'

import { link } from '@/payloadcms/fields/link'
import { anyone } from '@/payloadcms/access/anyone'

import { revalidateFooter } from './hooks/revalidate-footer'

export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: {
    group: 'Navigation & Layout',
  },
  access: {
    read: anyone,
  },
  fields: [
    {
      name: 'footerLogo',
      type: 'upload',
      relationTo: 'media',
      label: 'Footer Logo',
    },
    {
      name: 'footerTagline',
      type: 'text',
      label: 'Footer Tagline',
    },
    {
      name: 'references',
      label: 'Page References',
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
          RowLabel: '@/payloadcms/globals/footer/RowLabel#ReferencesRowLabel',
        },
      },
    },
    {
      name: 'legal-references',
      label: 'Legal References',
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
          RowLabel: '@/payloadcms/globals/footer/RowLabel#LegalReferencesRowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
