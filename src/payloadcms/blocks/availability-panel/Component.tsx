'use client'

import React from 'react'
import { motion } from 'motion/react'
import type { AvailabilityPanelBlock as AvailabilityPanelBlockType, Service } from '@/payload-types'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
} & AvailabilityPanelBlockType

const ease = [0.22, 1, 0.36, 1] as const

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

const separatorVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
}

export function AvailabilityPanel({ className, selectedServices }: Props) {
  const services = (selectedServices ?? []).filter(
    (s): s is Service => typeof s === 'object' && s !== null && s.visible === true,
  )

  if (!services.length) return null

  return (
    <section className={cn('hidden md:block', className)} aria-label="Service availability">
      <div className="border-b border-warm-gray-200 bg-warm-gray-100">
        <motion.div
          className="mx-auto flex items-center justify-start flex-wrap gap-y-0 py-6 gap-x-9"
          style={{ maxWidth: '1160px' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20px' }}
          variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } }}
        >
          {services.map((service, i) => (
            <React.Fragment key={service.id}>
              <motion.div variants={itemVariants} className="flex items-center gap-2">
                {/* Status dot — pulses when limited */}
                <span
                  className={cn(
                    'h-1.5 w-1.5 rounded-full shrink-0',
                    service.status === 'open' && 'bg-teal',
                    service.status === 'limited' && 'bg-amber animate-pulse',
                    service.status === 'closed' && 'bg-warm-gray-400',
                  )}
                  aria-hidden
                />

                {/* Service name */}
                <span className={cn('text-sm whitespace-nowrap leading-none text-gray-600')}>
                  {service.title}
                </span>
              </motion.div>
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
