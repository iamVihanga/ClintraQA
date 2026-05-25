import type { GlobalConfig } from 'payload'

import { anyone } from '@/payloadcms/access/anyone'
import { defaultLexicalEditor } from '@/payloadcms/fields/default-lexical-editor'

import { revalidateAvailabilityNotices } from './hooks/revalidate-availability-notices'

export const AvailabilityNotices: GlobalConfig = {
  slug: 'availability-notices',
  admin: {
    group: 'Global Settings',
  },
  access: {
    read: anyone,
  },
  fields: [
    {
      name: 'openStatusMessage',
      type: 'richText',
      label: 'Open Status Message',
      editor: defaultLexicalEditor,
    },
    {
      name: 'limitedStatusMessage',
      type: 'richText',
      label: 'Limited Status Message',
      editor: defaultLexicalEditor,
    },
    {
      name: 'closedStatusMessage',
      type: 'richText',
      label: 'Closed Status Message',
      editor: defaultLexicalEditor,
    },
    {
      name: 'highRiskMessage',
      type: 'richText',
      label: 'High Risk Message',
      editor: defaultLexicalEditor,
    },
    {
      name: 'monthlyCapacityNote',
      type: 'richText',
      label: 'Monthly Capacity Note',
      editor: defaultLexicalEditor,
    },
    {
      name: 'landingBannerNotice',
      type: 'richText',
      label: 'Landing Banner Notice',
      editor: defaultLexicalEditor,
    },
  ],
  hooks: {
    afterChange: [revalidateAvailabilityNotices],
  },
}
