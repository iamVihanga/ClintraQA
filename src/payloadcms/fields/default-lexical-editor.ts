import type { TextFieldSingleValidation } from 'payload'
import {
  AlignFeature,
  BlockquoteFeature,
  BoldFeature,
  ChecklistFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  IndentFeature,
  InlineCodeFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  type LinkFields,
  OrderedListFeature,
  ParagraphFeature,
  RelationshipFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
  BlocksFeature,
} from '@payloadcms/richtext-lexical'
import { RichLinkBlock } from '../blocks/lexical-blocks/rich-link/config'
import { SocialLinksBlock } from '../blocks/lexical-blocks/social-links/config'
import { MediaBlock } from '../blocks/lexical-blocks/media/config'

export const defaultLexicalEditor = lexicalEditor({
  features: [
    // Block structure
    ParagraphFeature(),
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
    BlockquoteFeature(),
    HorizontalRuleFeature(),

    // Inline text formatting
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    StrikethroughFeature(),
    SubscriptFeature(),
    SuperscriptFeature(),
    InlineCodeFeature(),

    // Alignment & indentation
    AlignFeature(),
    IndentFeature(),

    // Lists
    UnorderedListFeature(),
    OrderedListFeature(),
    ChecklistFeature(),

    // Media & relationships
    UploadFeature(),
    RelationshipFeature({ disabledCollections: ['users'] }),

    // Links
    LinkFeature({
      enabledCollections: ['pages', 'services'],
      fields: ({ defaultFields }) => {
        const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
          if ('name' in field && field.name === 'url') return false
          return true
        })

        return [
          ...defaultFieldsWithoutUrl,
          {
            name: 'url',
            type: 'text',
            admin: {
              condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
            },
            label: ({ t }) => t('fields:enterURL'),
            required: true,
            validate: ((value, options) => {
              if ((options?.siblingData as LinkFields)?.linkType === 'internal') {
                return true // no validation needed for internal links
              }
              return value ? true : 'URL is required'
            }) as TextFieldSingleValidation,
          },
        ]
      },
    }),

    // Toolbars
    InlineToolbarFeature(),
    FixedToolbarFeature(),

    // Blocks
    BlocksFeature({
      blocks: [RichLinkBlock, SocialLinksBlock, MediaBlock],
    }),
  ],
})
