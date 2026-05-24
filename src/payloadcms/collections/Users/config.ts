import type { CollectionConfig } from 'payload'

import userAccess from '../../access/user'
import adminAccess from '../../access/admin'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    read: userAccess,
    update: userAccess,
    delete: adminAccess,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      saveToJWT: true,
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
      defaultValue: 'user',
      access: {
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
  ],
  timestamps: true,
}
