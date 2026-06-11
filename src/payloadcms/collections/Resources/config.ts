import type { CollectionConfig } from 'payload'

import { populateAuthors } from './hooks/populateAuthors'
import { revalidateDelete, revalidateResource } from './hooks/revalidateResource'
import editorAccess from '../../access/editor'
import { published } from '../../access/published'

import { generatePreviewPath } from '../../utils/generate-preview-path'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from 'payload'
import { AdminGroups } from '@/payloadcms/utils/admin-groups'
import { defaultLexicalEditor } from '@/payloadcms/fields/default-lexical-editor'

export const Resources: CollectionConfig<'resources'> = {
  slug: 'resources',
  labels: {
    singular: 'Resource',
    plural: 'Resources',
  },
  access: {
    create: editorAccess,
    delete: editorAccess,
    read: published,
    update: editorAccess,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    'resource-category': true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    group: AdminGroups.ContentManagement,
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'resources',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'resources',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'thumbnail',
              label: 'Thumbnail',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'shortDescription',
              label: 'Short Description',
              type: 'textarea',
              maxLength: 160,
            },
            {
              name: 'content',
              label: 'Content',
              type: 'richText',
              editor: defaultLexicalEditor,
              required: true,
            },
          ],
        },
        {
          fields: [
            {
              name: 'relatedResources',
              label: 'Related Resources',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
              hasMany: true,
              relationTo: 'resources',
            },
            {
              name: 'resource-category',
              label: 'Category',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              hasMany: false,
              relationTo: 'resource-categories',
            },
          ],
          label: 'Relations',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'users',
    },
    {
      name: 'populatedAuthors',
      type: 'array',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateResource],
    afterRead: [populateAuthors],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
