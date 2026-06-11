'use client'

import React from 'react'
import { motion } from 'motion/react'
import type { SectionHeaderBlock as SectionHeaderProps } from '@/payload-types'
import { cn } from '@/lib/utils'
import { CMSLink, type CMSLinkType } from '@/components/Link'

type Props = {
  className?: string
  isDark?: boolean
} & SectionHeaderProps

const ease = [0.22, 1, 0.36, 1] as const

export function SectionHeader({ className, isDark, ...props }: Props) {
  const { label, title, subtitle, cta } = props
  const hasCTA = cta?.enabled && cta.link?.label

  return (
    <div
      className={cn('mx-auto py-14 bg-transparent px-6 sm:px-0', className)}
      style={{ maxWidth: '1160px' }}
    >
      <div className={cn('flex flex-wrap items-end justify-between gap-x-12 gap-y-6')}>
        {/* Left: label / title / subtitle */}
        <div className="min-w-0">
          {label && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease }}
              className={cn(
                'mb-3 text-xs font-semibold tracking-[0.18em] uppercase text-navy-main',
              )}
            >
              {label}
            </motion.p>
          )}

          {title && (
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.07, ease }}
              className={cn(
                'font-heading text-4xl leading-tight whitespace-pre-line md:text-[2.625rem]',
                {
                  'text-white': isDark,
                  'text-navy': !isDark,
                },
              )}
            >
              {title}
            </motion.h2>
          )}

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.15, ease }}
              className={cn('mt-4 max-w-lg text-base leading-relaxed', {
                'text-white/60': isDark,
                'text-warm-gray-600': !isDark,
              })}
            >
              {subtitle}
            </motion.p>
          )}

          {/* Mobile CTA — below subtitle, hidden from md upward */}
          {hasCTA && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
              className="mt-5 md:hidden"
            >
              <CMSLink
                type={cta.link!.type}
                reference={cta.link!.reference as CMSLinkType['reference']}
                url={cta.link!.url}
                label={cta.link!.label}
                newTab={cta.link!.newTab}
                appearance="default"
                className="h-10 px-6 text-sm"
              />
            </motion.div>
          )}
        </div>

        {/* Right: CTA — hidden on mobile, revealed from md */}
        {hasCTA && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.18, ease }}
            className="hidden shrink-0 md:block"
          >
            <CMSLink
              type={cta.link!.type}
              reference={cta.link!.reference as CMSLinkType['reference']}
              url={cta.link!.url}
              label={cta.link!.label}
              newTab={cta.link!.newTab}
              appearance="inline"
              className={cn(
                'group inline-flex items-center gap-1.5 text-sm font-medium transition-colors',
                {
                  'text-white/60 hover:text-white': isDark,
                  'text-navy-main': !isDark,
                },
              )}
            >
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                →
              </span>
            </CMSLink>
          </motion.div>
        )}
      </div>
    </div>
  )
}
