'use client'

import Link from 'next/link'
import React from 'react'

import type { Header, Media } from '@/payload-types'

import { Logo } from '@/components/Logo'
import { CMSLink } from '@/components/Link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

interface HeaderClientProps {
  data: Header
  logo?: (number | null) | Media
  siteName?: string | null
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, logo, siteName }) => {
  const navItems = data?.navigationLinks || []
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-warm-gray-200 bg-white backdrop-blur-sm">
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
              className={cn(
                'text-sm font-medium text-warm-gray-600 transition-colors hover:text-navy',
                {
                  'text-navy':
                    (link.type === 'reference' &&
                    typeof link.reference?.value === 'object' &&
                    link.reference.value.slug
                      ? `/${
                          link.reference.relationTo === 'pages' &&
                          link.reference.value.slug === 'home'
                            ? ''
                            : `${link.reference.relationTo !== 'pages' ? `${link.reference.relationTo}/` : ''}${link.reference.value.slug}`
                        }`
                      : link.url) === pathname,
                },
              )}
            />
          ))}
        </nav>

        {data.callToAction?.link && (
          <CMSLink
            {...data.callToAction.link}
            appearance="default"
            className="shrink-0 h-11 px-6"
          />
        )}
      </div>
    </header>
  )
}
