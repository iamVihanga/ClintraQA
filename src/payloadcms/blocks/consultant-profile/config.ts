import type { Block } from 'payload'

import { defaultLexicalEditor } from '@/payloadcms/fields/default-lexical-editor'

export const ConsultantProfileBlock: Block = {
  slug: 'consultant-profile',
  interfaceName: 'ConsultantProfileBlock',
  labels: {
    singular: 'Consultant Profile',
    plural: 'Consultant Profiles',
  },
  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
      label: 'Section Label',
      defaultValue: 'About',
      admin: {
        description: 'Small uppercase label above the heading (e.g. "About")',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Photo',
    },
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: true,
    },
    {
      name: 'credentials',
      type: 'text',
      label: 'Credentials / Title',
      admin: {
        description: 'e.g. "Senior GCP QA Consultant · Independent Consultancy"',
      },
    },
    {
      name: 'bio',
      type: 'richText',
      label: 'Bio',
      editor: defaultLexicalEditor,
    },
    {
      name: 'expertiseAreas',
      type: 'array',
      label: 'Areas of Expertise',
      fields: [
        {
          name: 'tag',
          type: 'text',
          label: 'Tag',
          required: true,
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
  ],
}
