'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header, Media } from '@/payload-types'

import { Logo } from '@/components/Logo'
import { CMSLink } from '@/components/Link'
import { Button } from '@/components/ui/button'

interface HeaderClientProps {
  data: Header
  logo?: (number | null) | Media
  siteName?: string | null
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, logo, siteName }) => {
  const pathname = usePathname()
  const navItems = data?.navigationLinks || []

  return (
    <header className="w-full relative z-20">
      <div className="py-4 flex justify-between container mx-auto">
        <Link href="/">
          <Logo resource={logo} siteName={siteName} loading="eager" priority={true} />
        </Link>

        {/* Navigation */}
        <nav className="flex gap-3 items-center justify-center">
          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
          {navItems.map(({ link }, i) => {
            return <CMSLink key={i} {...link} appearance="link" />
          })}
        </nav>

        <CMSLink {...data.callToAction.link} appearance="default" />
      </div>
    </header>
  )
}
