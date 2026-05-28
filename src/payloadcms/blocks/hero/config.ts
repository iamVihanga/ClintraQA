import type { Block } from 'payload'

import { link } from '@/payloadcms/fields/link'
import { defaultLexicalEditor } from '@/payloadcms/fields/default-lexical-editor'

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
    },
    {
      name: 'headline',
      type: 'group',
      label: 'Headline',
      fields: [
        {
          name: 'beforeText',
          type: 'text',
          label: 'Before Text',
        },
        {
          name: 'animativeWords',
          type: 'array',
          label: 'Animative Words',
          fields: [
            {
              name: 'word',
              type: 'text',
              label: 'Word',
              required: true,
            },
          ],
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: '@/payloadcms/blocks/hero/RowLabel#AnimativeWordRowLabel',
            },
          },
        },
        {
          name: 'afterText',
          type: 'text',
          label: 'After Text',
        },
      ],
    },
    {
      name: 'subtitle',
      type: 'richText',
      label: 'Subtitle',
      editor: defaultLexicalEditor,
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Call to Action',
      fields: [
        {
          name: 'primaryCta',
          type: 'group',
          label: 'Primary CTA',
          fields: [
            {
              name: 'enabled',
              type: 'checkbox',
              label: 'Enable Primary CTA',
              defaultValue: true,
            },
            link({
              appearances: false,
              overrides: {
                label: '',
                admin: {
                  condition: (_, siblingData) => !!siblingData?.enabled,
                },
              },
            }),
          ],
        },
        {
          name: 'secondaryCta',
          type: 'group',
          label: 'Secondary CTA',
          fields: [
            {
              name: 'enabled',
              type: 'checkbox',
              label: 'Enable Secondary CTA',
              defaultValue: false,
            },
            link({
              appearances: false,
              overrides: {
                label: '',
                admin: {
                  condition: (_, siblingData) => !!siblingData?.enabled,
                },
              },
            }),
          ],
        },
      ],
    },
    {
      name: 'credibilityStats',
      type: 'group',
      label: 'Credibility Stats',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Enable Credibility Stats',
          defaultValue: true,
        },
        {
          name: 'stats',
          type: 'array',
          label: 'Stats',
          fields: [
            {
              name: 'number',
              type: 'number',
              label: 'Number',
              required: true,
              admin: {
                width: '33%',
              },
            },
            {
              name: 'suffix',
              type: 'text',
              label: 'Suffix',
              admin: {
                description: 'e.g. "+", "%"',
                width: '33%',
              },
            },
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              required: true,
              admin: {
                width: '33%',
              },
            },
          ],
          admin: {
            initCollapsed: true,
            condition: (_, siblingData) => !!siblingData?.enabled,
          },
        },
      ],
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Image',
    },
  ],
}
