import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { anyone } from '@/payloadcms/access/anyone'
import editor from '@/payloadcms/access/editor'
import { AdminGroups } from '@/payloadcms/utils/admin-groups'

export const ResourceCategories: CollectionConfig = {
  slug: 'resource-categories',
  labels: {
    singular: 'Resource Category',
    plural: 'Resource Categories',
  },
  access: {
    create: editor,
    delete: editor,
    read: anyone,
    update: editor,
  },
  admin: {
    useAsTitle: 'title',
    group: AdminGroups.ContentManagement,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField({
      position: 'main',
    }),
  ],
}
