import { CollectionConfig, slugField } from 'payload'

import { anyone as anyoneAccess } from '@/payloadcms/access/anyone'
import adminAccess from '@/payloadcms/access/admin'
import { defaultLexicalEditor } from '@/payloadcms/fields/default-lexical-editor'
import { AdminGroups } from '@/payloadcms/utils/admin-groups'
import { revalidateService, revalidateServiceDelete } from './hooks/revalidateService'

export const Services: CollectionConfig = {
  slug: 'services',
  access: {
    read: anyoneAccess,
    create: adminAccess,
    update: adminAccess,
    delete: adminAccess,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'visible'],
    group: AdminGroups.ContentManagement,
  },
  hooks: {
    afterChange: [revalidateService],
    afterDelete: [revalidateServiceDelete],
  },
  fields: [
    // Root-level fields — required here for slugField watcher to resolve correctly
    {
      name: 'title',
      type: 'text',
      label: 'Service Title',
      required: true,
    },
    {
      name: 'visible',
      type: 'checkbox',
      label: 'Visibility',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Basic Information',
          fields: [
            {
              type: 'textarea',
              name: 'shortDescription',
              label: 'Short Description',
              required: true,
            },
            {
              name: 'deliverables',
              label: 'Deliverables',
              type: 'array',
              fields: [{ name: 'item', label: 'Deliverable Name', type: 'text', required: true }],
              admin: { initCollapsed: true },
            },
            {
              type: 'richText',
              name: 'detailedDescription',
              label: 'Detailed Description',
              // editor: defaultLexicalEditor,
            },
          ],
        },
        {
          label: 'Availability',
          fields: [
            {
              name: 'status',
              label: 'Service Status',
              type: 'select',
              required: true,
              defaultValue: 'open',
              options: [
                { value: 'open', label: 'Open' },
                { value: 'limited', label: 'Limited' },
                { value: 'closed', label: 'Closed' },
              ],
            },

            // Monthly capacity for limited services
            {
              name: 'monthlyCapacity',
              label: 'Monthly Capacity',
              type: 'number',
              min: 0,
              admin: {
                condition: (data) => data?.status === 'limited',
              },
            },

            // Message if service is limited
            {
              name: 'limitedMessage',
              label: 'Limited Service Message',
              type: 'richText',
              editor: defaultLexicalEditor,
              admin: {
                condition: (data) => data?.status === 'limited',
              },
            },

            // Message if service is closed
            {
              name: 'closedMessage',
              label: 'Closed Service Message',
              type: 'richText',
              editor: defaultLexicalEditor,
              admin: {
                condition: (data) => data?.status === 'closed',
              },
            },
          ],
        },
      ],
    },
    slugField(),
  ],
}
