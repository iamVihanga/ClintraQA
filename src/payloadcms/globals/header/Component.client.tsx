'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

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

/** Mirrors CMSLink's href resolution so we can detect the active page. */
function getNavHref(link: {
  type?: string | null
  reference?: { relationTo: string; value: unknown } | null
  url?: string | null
}): string | null | undefined {
  if (
    link.type === 'reference' &&
    link.reference &&
    typeof link.reference.value === 'object' &&
    link.reference.value !== null &&
    'slug' in (link.reference.value as object)
  ) {
    const val = link.reference.value as { slug?: string | null }
    if (val.slug) {
      const { relationTo } = link.reference
      if (relationTo === 'pages' && val.slug === 'home') return '/'
      return `${relationTo !== 'pages' ? `/${relationTo}` : ''}/${val.slug}`
    }
  }
  return link.url
}

const drawerEase = [0.22, 1, 0.36, 1]

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, logo, siteName }) => {
  const navItems = data?.navigationLinks || []
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  // Close drawer whenever the route changes
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Prevent background scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-warm-gray-200 bg-white backdrop-blur-sm">
        <div
          className="mx-auto flex h-16 items-center justify-between px-6"
          style={{ maxWidth: '1160px' }}
        >
          <Link href="/" className="shrink-0">
            <Logo resource={logo} siteName={siteName} loading="eager" priority={true} />
          </Link>

          {/* Desktop nav — hidden below md */}
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map(({ link }, i) => (
              <CMSLink
                key={i}
                {...link}
                appearance="inline"
                className={cn(
                  'text-sm font-medium text-warm-gray-600 transition-colors hover:text-navy-main/80',
                  { 'text-navy-main': getNavHref(link) === pathname },
                )}
              />
            ))}
          </nav>

          {/* Desktop CTA — hidden below md */}
          {data.callToAction?.link && (
            <CMSLink
              {...data.callToAction.link}
              appearance="default"
              className="hidden h-11 shrink-0 px-6 md:inline-flex"
            />
          )}

          {/* Mobile hamburger — hidden from md */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-md text-navy transition-colors hover:bg-warm-gray-100 md:hidden"
          >
            <svg width="20" height="15" viewBox="0 0 20 15" fill="none" aria-hidden>
              <rect width="20" height="1.75" rx="0.875" fill="currentColor" />
              <rect y="6.5" width="20" height="1.75" rx="0.875" fill="currentColor" />
              <rect y="13" width="20" height="1.75" rx="0.875" fill="currentColor" />
            </svg>
          </button>
        </div>
      </header>

      {/* ── Mobile slide-in drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-51 bg-black/40"
              onClick={() => setMenuOpen(false)}
              aria-hidden
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.32, ease: drawerEase as any }}
              className="fixed right-0 top-0 z-52 flex h-full w-72 flex-col bg-white shadow-2xl"
            >
              {/* Top bar */}
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-warm-gray-200 px-5">
                <Link href="/" className="shrink-0" onClick={() => setMenuOpen(false)}>
                  <Logo resource={logo} siteName={siteName} />
                </Link>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="flex h-8 w-8 items-center justify-center rounded-md text-warm-gray-500 transition-colors hover:bg-warm-gray-100"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path
                      d="M1 1L13 13M13 1L1 13"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col gap-0.5 overflow-y-auto p-3">
                {navItems.map(({ link }, i) => (
                  <CMSLink
                    key={i}
                    {...link}
                    appearance="inline"
                    className={cn(
                      'block rounded-lg px-3 py-2.5 text-sm font-medium text-warm-gray-700 transition-colors hover:bg-warm-gray-100 hover:text-navy-main',
                      { 'bg-navy/5 text-navy-main': getNavHref(link) === pathname },
                    )}
                  />
                ))}
              </nav>

              {/* CTA pinned to bottom */}
              {data.callToAction?.link && (
                <div className="mt-auto shrink-0 border-t border-warm-gray-100 p-4">
                  <CMSLink
                    {...data.callToAction.link}
                    appearance="default"
                    className="w-full justify-center"
                  />
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
