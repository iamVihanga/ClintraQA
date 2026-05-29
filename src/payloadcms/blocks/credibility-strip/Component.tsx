'use client'

import React from 'react'
import { motion } from 'motion/react'
import type { CredibilityStripeBlock as CredibilityStripeProps } from '@/payload-types'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
} & CredibilityStripeProps

const ease = [0.22, 1, 0.36, 1] as const

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

export function CredibilityStripe({ className, credibilities }: Props) {
  const _credibilities = (credibilities ?? []).filter((s) => !!s)

  if (!_credibilities.length) return null

  return (
    <section className={cn('hidden md:block', className)} aria-label="Service availability">
      <div className="border-b border-warm-gray-200 bg-warm-gray-100">
        <motion.div
          className="mx-auto flex items-center justify-start flex-wrap gap-y-0 py-6 gap-x-12"
          style={{ maxWidth: '1160px' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20px' }}
          variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } }}
        >
          {_credibilities.map((item, i) => (
            <React.Fragment key={item.id}>
              <motion.div variants={itemVariants} className="flex items-center gap-2">
                {/* Status dot — pulses when limited */}
                <span
                  className={cn('h-1.5 w-1.5 rounded-full shrink-0 bg-navy-main')}
                  aria-hidden
                />

                {/* Service name */}
                <span className={cn('text-sm whitespace-nowrap leading-none text-gray-600')}>
                  {item.credibility}
                </span>
              </motion.div>
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
