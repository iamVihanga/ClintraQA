import type { GlobalConfig } from 'payload'

import { anyone } from '@/payloadcms/access/anyone'
import { AdminGroups } from '@/payloadcms/utils/admin-groups'

import { revalidateSiteSettings } from './hooks/revalidate-site-settings'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: AdminGroups.GlobalSettings,
  },
  access: {
    read: anyone,
  },
  fields: [
    {
      name: 'globalVariables',
      type: 'group',
      label: 'Global Variables',
      fields: [
        {
          name: 'siteName',
          type: 'text',
          label: 'Site Name',
        },
        {
          name: 'tagline',
          type: 'text',
          label: 'Tagline',
        },
        {
          name: 'copyrightText',
          type: 'text',
          label: 'Copyright Text',
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo',
        },
        {
          name: 'favicon',
          type: 'upload',
          relationTo: 'media',
          label: 'Favicon',
        },
      ],
    },
    {
      name: 'notificationSettings',
      type: 'group',
      label: 'Notification Settings',
      fields: [
        {
          name: 'toEmail',
          type: 'email',
          label: 'To Email',
        },
        {
          name: 'subjectPrefix',
          type: 'textarea',
          label: 'Subject Prefix',
        },
        {
          name: 'bccEmail',
          type: 'email',
          label: 'BCC Email',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
}
