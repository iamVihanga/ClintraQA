import { slugField } from 'payload'
import type { CollectionConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { authenticated } from '@/payloadcms/access/authenticated'
import { published } from '@/payloadcms/access/published'
import { populatePublishedAt } from '@/payloadcms/hooks/populate-publishedAt'
import { generatePreviewPath } from '@/payloadcms/utils/generate-preview-path'
import { revalidatePage, revalidateDelete } from './hooks/revalidatePage'
import { AdminGroups } from '@/payloadcms/utils/admin-groups'

// --- Blocks ---
import { HeroBlock } from '@/payloadcms/blocks/hero/config'
import { AvailabilityPanelBlock } from '@/payloadcms/blocks/availability-panel/config'
import { SectionHeaderBlock } from '@/payloadcms/blocks/section-header/config'
import { ServiceGridBlock } from '@/payloadcms/blocks/service-grid/config'
import { ThemedLayoutBlock } from '@/payloadcms/blocks/layout-blocks/themed/config'
import { GridLayoutBlock } from '@/payloadcms/blocks/layout-blocks/grid/config'
import { ApproachStepsBlock } from '@/payloadcms/blocks/approach-steps/config'
import { ConsultantProfileBlock } from '@/payloadcms/blocks/consultant-profile/config'
import { CredibilityStripe } from '@/payloadcms/blocks/credibility-strip/config'
import { FormBlock } from '@/payloadcms/blocks/form/config'
import { ResourcesGridBlock } from '@/payloadcms/blocks/resources-grid/config'
// --- End Blocks ---

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: published,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
    group: AdminGroups.ContentManagement,
  },
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
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
  fields: [
    {
      name: 'title',
      label: 'Page Title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Page Layout',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                HeroBlock,
                AvailabilityPanelBlock,
                CredibilityStripe,
                SectionHeaderBlock,
                ServiceGridBlock,
                ThemedLayoutBlock,
                ApproachStepsBlock,
                ConsultantProfileBlock,
                GridLayoutBlock,
                FormBlock,
                ResourcesGridBlock,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
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
        position: 'sidebar',
      },
    },
    slugField(),
  ],
}
