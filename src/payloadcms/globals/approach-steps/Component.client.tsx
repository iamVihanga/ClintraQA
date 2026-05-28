'use client'

import { motion } from 'motion/react'

import type { ApproachStep } from '@/payload-types'
import { cn } from '@/lib/utils'

import type { ApproachStepsBlock as BlockProps } from '@/payload-types'

type Step = NonNullable<ApproachStep['steps']>[number]

type ApproachStepsClientProps = {
  steps: Step[]
  className?: string
  theme?: BlockProps['theme']
}

const ease = [0.22, 1, 0.36, 1] as const

export function ApproachStepsClient({ steps, className, theme }: ApproachStepsClientProps) {
  if (!steps.length) return null

  return (
    <div className={cn('mx-auto', className)} style={{ maxWidth: '1160px' }}>
      {/* 1px gap on bg-white/10 creates the subtle divider lines between cells */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease }}
        className={cn(
          'grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/10 sm:grid-cols-2 lg:grid-cols-4',
          {
            'bg-white/10': theme !== 'light',
            'border-none bg-navy': theme === 'light',
          },
        )}
      >
        {steps.map((step, i) => (
          <motion.div
            key={step.id ?? i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08, ease }}
            className={cn('bg-navy/60 px-7 py-8 transition-colors hover:bg-navy-main/20', {
              'bg-navy hover:bg-navy-mid': theme === 'light',
            })}
          >
            {/* Decorative step number */}
            <div className="mb-5 font-heading text-4xl leading-none text-navy-light/40">
              {step.number ?? String(i + 1).padStart(2, '0')}
            </div>

            {/* Title */}
            {step.title && (
              <div className="mb-2.5 text-[15px] font-medium leading-snug text-white">
                {step.title}
              </div>
            )}

            {/* Description */}
            {step.description && (
              <p className="text-[13px] leading-[1.65] text-white/55">{step.description}</p>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
