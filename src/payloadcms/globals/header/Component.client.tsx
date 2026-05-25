'use client'

import Link from 'next/link'
import React from 'react'

import type { Header, Media } from '@/payload-types'

import { Logo } from '@/components/Logo'
import { CMSLink } from '@/components/Link'

interface HeaderClientProps {
  data: Header
  logo?: (number | null) | Media
  siteName?: string | null
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, logo, siteName }) => {
  const navItems = data?.navigationLinks || []

  return (
    <header className="sticky top-0 z-50 border-b border-warm-gray-200 bg-white/95 backdrop-blur-sm">
      <div
        className="mx-auto flex h-16 items-center justify-between px-6"
        style={{ maxWidth: '1160px' }}
      >
        <Link href="/" className="shrink-0">
          <Logo resource={logo} siteName={siteName} loading="eager" priority={true} />
        </Link>

        <nav className="flex items-center gap-8">
          {navItems.map(({ link }, i) => (
            <CMSLink
              key={i}
              {...link}
              appearance="inline"
              className="text-sm font-medium text-warm-gray-600 transition-colors hover:text-navy"
            />
          ))}
        </nav>

        {data.callToAction?.link && (
          <CMSLink {...data.callToAction.link} appearance="default" className="shrink-0" />
        )}
      </div>
    </header>
  )
}
