import React from 'react'
import { Metadata } from 'next'

import './globals.css'
import { getServerSideURL } from '@/payloadcms/utils/get-url'
import { mergeOpenGraph } from '@/payloadcms/utils/merge-openGraph'
import { cn } from '@/lib/utils'
import { fontClass } from '@/lib/fonts'
import { AdminBar } from '@/components/AdminBar'
import { draftMode } from 'next/headers'
import { Header } from '@/payloadcms/globals/header/Component'
import { Footer } from '@/payloadcms/globals/footer/Component'
import { getCachedGlobal } from '@/payloadcms/utils/get-globals'
import { ContactInfoProvider } from '@/components/providers/ContactInfoContext'

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const { isEnabled } = await draftMode()
  const contactInfo = await getCachedGlobal('contact-info', 1)()

  return (
    <html className={cn('', fontClass)} lang="en" suppressHydrationWarning>
      <body>
        <AdminBar
          adminBarProps={{
            preview: isEnabled,
          }}
        />
        <ContactInfoProvider data={contactInfo}>
          <Header />
          {children}
          <Footer />
        </ContactInfoProvider>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
