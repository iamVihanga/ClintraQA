'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

import { cn } from '@/lib/utils'

type FaqItem = {
  question?: string | null
  answer?: string | null
  category?: string | null
  id?: string | null
}

type FaqClientProps = {
  items: FaqItem[]
  className?: string
  theme?: 'light' | 'dark' | null
  label?: string | null
  heading?: string | null
  subtitle?: string | null
}

const ease = [0.22, 1, 0.36, 1] as const

export function FaqClient({ items, className, theme, label, heading, subtitle }: FaqClientProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const isDark = theme === 'dark'

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i))

  return (
    <section
      className={cn('px-6 py-22', className, {
        'bg-navy': isDark,
        'bg-white': !isDark,
      })}
    >
      <div className="mx-auto" style={{ maxWidth: '1160px' }}>
        {/* Section header */}
        {(label || heading || subtitle) && (
          <div className="mb-14">
            {label && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease }}
                className={cn('mb-3 text-xs font-semibold tracking-[0.18em] uppercase', {
                  'text-navy-light': isDark,
                  'text-navy-main': !isDark,
                })}
              >
                {label}
              </motion.p>
            )}
            {heading && (
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
                {heading}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: 0.15, ease }}
                className={cn('mt-4 max-w-xl text-base leading-relaxed', {
                  'text-white/60': isDark,
                  'text-warm-gray-600': !isDark,
                })}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}

        {/* Accordion list */}
        <div
          className={cn('divide-y', {
            'divide-white/10': isDark,
            'divide-warm-gray-200': !isDark,
          })}
        >
          {items.map((item, i) => {
            const isOpen = openIndex === i

            return (
              <motion.div
                key={item.id ?? i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: i * 0.06, ease }}
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className={cn(
                    'flex w-full items-start justify-between gap-6 py-6 text-left transition-colors',
                    {
                      'text-white hover:text-white/80': isDark,
                      'text-navy hover:text-navy-main': !isDark,
                    },
                  )}
                >
                  <span className="font-heading text-lg leading-snug md:text-xl">
                    {item.question}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      'mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-sm font-light transition-colors',
                      {
                        'border-white/20 text-white/60': isDark,
                        'border-navy/20 text-navy/60': !isDark,
                      },
                    )}
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease }}
                      className="overflow-hidden"
                    >
                      <p
                        className={cn('pb-6 text-base leading-relaxed', {
                          'text-white/60': isDark,
                          'text-warm-gray-600': !isDark,
                        })}
                      >
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
