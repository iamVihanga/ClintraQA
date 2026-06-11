'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import type { HeroBlock as HeroBlockProps } from '@/payload-types'

import { cn } from '@/lib/utils'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

type Props = {
  className?: string
} & HeroBlockProps

/** Smooth "ease-out-expo" curve used throughout the hero entrance. */
const ease = [0.22, 1, 0.36, 1] as const

/** Returns initial/animate/transition props for a fade-up entrance. */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease },
})

export const HeroBlock: React.FC<Props> = ({
  className,
  eyebrow,
  headline,
  subtitle,
  cta,
  credibilityStats,
  heroImage,
}) => {
  const { beforeText, animativeWords, afterText } = headline ?? {}
  const { primaryCta, secondaryCta } = cta ?? {}
  const hasImage = heroImage && typeof heroImage === 'object'

  // Cycle through animative words
  const [wordIndex, setWordIndex] = useState(0)
  useEffect(() => {
    if (!animativeWords?.length || animativeWords.length <= 1) return
    const id = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % animativeWords.length)
    }, 2800)
    return () => clearInterval(id)
  }, [animativeWords])

  return (
    <section className={cn('relative overflow-hidden bg-navy px-6 py-16 md:py-25', className)}>
      {/* Decorative subtle grid — slow fade in, hidden on mobile */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.06 }}
        transition={{ duration: 2, delay: 0.6, ease: 'easeOut' }}
        aria-hidden
      >
        <svg viewBox="0 0 600 600" className="h-full w-full" fill="none">
          {Array.from({ length: 6 }).map((_, r) =>
            Array.from({ length: 6 }).map((_, c) => (
              <rect
                key={`${r}-${c}`}
                x={c * 100}
                y={r * 100}
                width="96"
                height="96"
                rx="4"
                stroke="#378ADD"
                strokeWidth="1"
              />
            )),
          )}
        </svg>
      </motion.div>

      <div
        className={cn(
          'relative mx-auto grid items-start gap-10 lg:gap-16',
          hasImage ? 'grid-cols-1 lg:grid-cols-[1fr_480px] lg:items-center' : 'grid-cols-1',
        )}
        style={{ maxWidth: '1160px' }}
      >
        {/* ── Left: content ── */}
        <div>
          {/* Eyebrow badge */}
          {eyebrow && (
            <motion.div
              {...fadeUp(0.05)}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-navy-light/35 px-3.5 py-1.5"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-navy-light" />
              <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-navy-light">
                {eyebrow}
              </span>
            </motion.div>
          )}

          {/* Headline — each line is an animated block span */}
          {(beforeText || !!animativeWords?.length || afterText) && (
            <h1 className="mb-6 font-heading text-[36px] leading-[1.1] tracking-[-0.5px] text-white sm:text-[44px] lg:text-[52px]">
              {beforeText && (
                <motion.span {...fadeUp(0.15)} className="block">
                  {beforeText}
                </motion.span>
              )}
              {!!animativeWords?.length && (
                <AnimatePresence mode="wait">
                  <motion.em
                    key={wordIndex}
                    initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
                    transition={{ duration: 0.45, ease }}
                    className="block text-navy-light"
                  >
                    {animativeWords[wordIndex]?.word}
                  </motion.em>
                </AnimatePresence>
              )}
              {afterText && (
                <motion.span {...fadeUp(0.35)} className="block">
                  {afterText}
                </motion.span>
              )}
            </h1>
          )}

          {/* Subtitle */}
          {subtitle && (
            <motion.div {...fadeUp(0.45)}>
              <RichText
                data={subtitle}
                enableGutter={false}
                enableProse={false}
                className="mb-10 max-w-full text-[17px] leading-[1.75] text-white/70 lg:max-w-130"
              />
            </motion.div>
          )}

          {/* CTA buttons */}
          {(primaryCta?.enabled || secondaryCta?.enabled) && (
            <motion.div
              {...fadeUp(0.55)}
              className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:flex-wrap"
            >
              {primaryCta?.enabled && primaryCta.link?.label && (
                <CMSLink
                  {...primaryCta.link}
                  appearance="default"
                  className="h-auto px-7 py-3.5 text-[15px]"
                />
              )}
              {secondaryCta?.enabled && secondaryCta.link?.label && (
                <CMSLink
                  {...secondaryCta.link}
                  appearance="inline"
                  className="inline-flex items-center justify-center rounded-md border border-white/25 px-7 py-3.5 text-[15px] font-medium text-white/85 transition-all hover:border-white/60 hover:text-white"
                />
              )}
            </motion.div>
          )}

          {/* Credibility stats */}
          {credibilityStats?.enabled && !!credibilityStats.stats?.length && (
            <motion.div
              {...fadeUp(0.65)}
              className="mt-10 flex flex-wrap gap-y-6 border-t border-white/10 pt-8 md:mt-14 md:pt-10"
            >
              {credibilityStats.stats.map((stat, i) => (
                <motion.div key={stat.id ?? i} {...fadeUp(0.7 + i * 0.08)} className="flex-1 pr-6">
                  <div className="font-heading text-[32px] leading-none text-white">
                    {stat.number}
                    {stat.suffix}
                  </div>
                  <div className="mt-1.5 text-[13px] leading-snug text-white/55">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* ── Right: hero image — slides in from right ── */}
        {hasImage && (
          <motion.div
            initial={{ opacity: 0, x: 48, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="relative h-64 overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10 sm:h-80 lg:h-130"
          >
            <Media resource={heroImage} fill htmlElement={null} imgClassName="object-cover" />
          </motion.div>
        )}
      </div>
    </section>
  )
}
