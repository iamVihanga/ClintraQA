import { postgresAdapter } from '@payloadcms/db-postgres'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './payloadcms/collections/Users/config'
import { Media } from './payloadcms/collections/Media/config'
import { Pages } from './payloadcms/collections/Pages/config'
import { Services } from './payloadcms/collections/Services/config'
import { defaultLexicalEditor } from './payloadcms/fields/default-lexical-editor'
import { getServerSideURL } from './payloadcms/utils/get-url'
import { plugins } from './payloadcms/plugins'
import { SiteSettings } from './payloadcms/globals/site-settings/config'
import { AvailabilityNotices } from './payloadcms/globals/availability-notices/config'
import { Header } from './payloadcms/globals/header/config'
import { Footer } from './payloadcms/globals/footer/config'
import { ContactInfo } from './payloadcms/globals/contact-info/config'
import { ApproachSteps } from './payloadcms/globals/approach-steps/config'
import zeptomailAdapter from './payloadcms/utils/adapters/email'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // --- Admin Configurations ---
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },

  // --- Database Collection Injections ---
  collections: [Users, Media, Pages, Services],

  // --- Globals ---
  globals: [SiteSettings, AvailabilityNotices, Header, Footer, ContactInfo, ApproachSteps],

  // --- Database Adapter ---
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  // --- Email Adapter ---
  email: zeptomailAdapter(),

  // --- Additional Configurations ---
  editor: defaultLexicalEditor,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  sharp,
  cors: [getServerSideURL()].filter(Boolean),

  // --- Plugins ---
  plugins,

  // --- Jobs ---
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
