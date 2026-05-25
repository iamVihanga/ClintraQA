import React from 'react'
import { Metadata } from 'next'

import './globals.css'
import { getServerSideURL } from '@/payloadcms/utils/get-url'
import { mergeOpenGraph } from '@/payloadcms/utils/merge-openGraph'
import { cn } from '@/lib/utils'
import { fontClass } from '@/lib/fonts'

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('', fontClass)}>{children}</body>
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
