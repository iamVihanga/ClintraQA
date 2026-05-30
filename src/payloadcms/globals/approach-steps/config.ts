import type { GlobalConfig } from 'payload'

import { link } from '@/payloadcms/fields/link'
import { anyone } from '@/payloadcms/access/anyone'
import { AdminGroups } from '@/payloadcms/utils/admin-groups'

import { revalidateApproachSteps } from './hooks/revalidate-approach-steps'

export const ApproachSteps: GlobalConfig = {
  slug: 'approachSteps',
  admin: {
    group: AdminGroups.ContentManagement,
  },
  access: {
    read: anyone,
  },
  fields: [
    {
      name: 'steps',
      type: 'array',
      label: 'Steps',
      fields: [
        {
          name: 'number',
          type: 'text',
          label: 'Step Number',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Step Title',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Step Description',
        },
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/payloadcms/globals/approach-steps/RowLabel#ApproachStepsRowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateApproachSteps],
  },
}
