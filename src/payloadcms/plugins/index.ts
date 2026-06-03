import { Plugin } from 'payload'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { seoPlugin } from '@payloadcms/plugin-seo'

import type { Page, Resource } from '@/payload-types'
import { revalidateRedirects } from '../hooks/revalidate-redirects'
import { getServerSideURL } from '../utils/get-url'
import { AdminGroups } from '../utils/admin-groups'
import { beforeEmail } from '../utils/form-config'

// -------- SEO Plugin Helpers --------
const generateTitle: GenerateTitle<Page | Resource> = ({ doc }) => {
  return doc?.title ? `${doc.title} | ClintraQA` : 'ClintraQA - GCP QA & TMF Audit Consultancy'
}

const generateURL: GenerateURL<Page | Resource> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}
// -----------------------------------

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages'],
    overrides: {
      admin: {
        group: AdminGroups.Administration,
      },
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),

  // -----------------

  seoPlugin({
    generateTitle,
    generateURL,
  }),

  // -----------------

  formBuilderPlugin({
    fields: {
      payment: false,
    },
    redirectRelationships: ['pages'],
    beforeEmail: beforeEmail,
    defaultToEmail: process?.env?.ZEPTOMAIL_TO_EMAIL || '',
    formSubmissionOverrides: {
      admin: {
        group: AdminGroups.FormsAndSubmissions,
      },
    },
    formOverrides: {
      admin: {
        group: AdminGroups.FormsAndSubmissions,
      },
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
  }),
]
