'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

import type { Service, ServiceGridBlock as ServiceGridBlockProps } from '@/payload-types'
import { cn } from '@/lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterOption = 'all' | 'open' | 'limited' | 'closed'

type ServiceGridClientProps = ServiceGridBlockProps & {
  services: Service[]
  className?: string
  selectAction?: (service: Service) => void
  /** Slugs of currently selected services — drives the checked visual state on cards */
  selectedSlugs?: Set<string>
}

type ServiceCardProps = {
  service: Service
  showDeliverables: boolean
  showStatusBadge?: boolean
  isSelectable?: boolean
  isSelected?: boolean
  selectAction?: (service: Service) => void
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1] as const

const STATUS_CONFIG = {
  open: {
    barClass: 'bg-teal',
    badgeClass: 'bg-teal-light text-teal-dark',
    label: 'Open',
  },
  limited: {
    barClass: 'bg-amber',
    badgeClass: 'bg-amber-light text-amber-dark',
    label: 'Limited',
  },
  closed: {
    barClass: 'bg-warm-gray-200',
    badgeClass: 'bg-warm-gray-200 text-warm-gray-600',
    label: 'Closed',
  },
} as const

const FILTER_LABELS: Record<FilterOption, string> = {
  all: 'All',
  open: 'Open',
  limited: 'Limited',
  closed: 'Closed',
}

// ─── Service Card ─────────────────────────────────────────────────────────────

function ServiceCard({
  service,
  showDeliverables,
  showStatusBadge,
  isSelectable,
  isSelected,
  selectAction,
}: ServiceCardProps) {
  const status = (service.status ?? 'closed') as keyof typeof STATUS_CONFIG
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.closed
  const deliverables = service.deliverables ?? []
  const isClosed = status === 'closed'

  return (
    <div
      className={cn(
        'relative flex h-full flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all',
        isSelectable && !isClosed && 'cursor-pointer',
        isSelected
          ? 'border-navy ring-2 ring-navy/20 shadow-md'
          : 'border-warm-gray-200 hover:shadow-md',
        isClosed && isSelectable && 'opacity-60',
      )}
      onClick={() => {
        if (isSelectable && !isClosed && selectAction) {
          selectAction(service)
        }
      }}
    >
      {/* Status colour bar */}
      <div className={cn('absolute left-0 right-0 top-0 h-0.75', config.barClass)} />

      {/* Selected checkmark */}
      {isSelectable && isSelected && (
        <div className="absolute right-3 top-3.5 flex h-5 w-5 items-center justify-center rounded-full bg-navy text-white">
          <svg
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 pt-7">
        {/* Title + status badge */}
        <div className={cn('mb-3 flex items-start gap-3', isSelected ? 'pr-7' : '')}>
          <h3 className="font-heading text-xl leading-snug text-navy">{service.title}</h3>
          {showStatusBadge && !isSelected && (
            <span
              className={cn(
                'ml-auto shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
                config.badgeClass,
              )}
            >
              {config.label}
            </span>
          )}
          {showStatusBadge && isSelected && (
            <span
              className={cn(
                'ml-auto shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
                config.badgeClass,
              )}
            >
              {config.label}
            </span>
          )}
        </div>

        {/* Short description */}
        <p className="mb-5 text-sm leading-relaxed text-warm-gray-600">
          {service.shortDescription}
        </p>

        {/* Deliverables */}
        {showDeliverables && deliverables.length > 0 && (
          <div className="mb-5">
            <p className="mb-2 text-[10px] font-semibold tracking-[0.15em] uppercase text-warm-gray-400">
              Deliverables
            </p>
            <div className="flex flex-wrap gap-1.5">
              {deliverables.map((d) => (
                <span
                  key={d.id}
                  className="inline-flex items-center rounded-full bg-navy-tint px-2.5 py-1 text-xs text-navy"
                >
                  {d.item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA — only shown when NOT in selectable mode (i.e. standalone grid on services page) */}
        {isSelectable && (
          <div className="mt-auto pt-2">
            {isClosed ? (
              <span className="flex w-full cursor-not-allowed select-none items-center justify-center rounded-lg bg-warm-gray-100 px-4 py-2.5 text-sm font-medium text-warm-gray-400">
                Currently Closed
              </span>
            ) : (
              <span
                className={cn(
                  'flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
                  isSelected
                    ? 'bg-navy/10 text-navy font-semibold'
                    : status === 'limited'
                      ? 'border border-amber bg-amber-light text-amber-dark hover:bg-amber hover:text-white'
                      : 'bg-navy text-white hover:bg-navy-mid',
                )}
              >
                {isSelected
                  ? 'Selected — click to remove'
                  : status === 'limited'
                    ? 'Select (Limited availability)'
                    : 'Select Service'}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Grid Client ──────────────────────────────────────────────────────────────

export function ServiceGridClient({
  services,
  showDeliverables,
  showFilterOptions,
  showStatusBadge,
  className,
  isSelectable,
  selectAction,
  selectedSlugs,
}: ServiceGridClientProps) {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all')

  const filteredServices =
    activeFilter === 'all' ? services : services.filter((s) => s.status === activeFilter)

  const counts: Record<FilterOption, number> = {
    all: services.length,
    open: services.filter((s) => s.status === 'open').length,
    limited: services.filter((s) => s.status === 'limited').length,
    closed: services.filter((s) => s.status === 'closed').length,
  }

  return (
    <div
      className={cn('mx-auto pb-14 pt-2 px-6 sm:px-0', className)}
      style={{ maxWidth: '1160px' }}
    >
      {/* Filter pills */}
      {showFilterOptions && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease }}
          className="mb-8 flex flex-wrap items-center gap-2"
        >
          {(['all', 'open', 'limited', 'closed'] as const).map((f) => {
            const isActive = activeFilter === f
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-navy text-white'
                    : 'bg-warm-gray-100 text-navy-main hover:bg-warm-gray-200',
                )}
              >
                {FILTER_LABELS[f]}
                <span
                  className={cn(
                    'rounded-full px-1.5 py-0.5 text-xs font-semibold',
                    isActive ? 'bg-white/20 text-white' : 'bg-warm-gray-200 text-warm-gray-600',
                  )}
                >
                  {counts[f]}
                </span>
              </button>
            )
          })}
        </motion.div>
      )}

      {/* Card grid */}
      <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredServices.map((service, i) => (
            <motion.div
              key={service.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: i * 0.05, ease }}
              className="flex"
            >
              <ServiceCard
                service={service}
                showDeliverables={showDeliverables || false}
                showStatusBadge={showStatusBadge || false}
                isSelectable={isSelectable || false}
                isSelected={selectedSlugs?.has(service.slug) ?? false}
                selectAction={selectAction}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {filteredServices.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-14 text-center text-sm text-warm-gray-400"
        >
          No services match this filter.
        </motion.p>
      )}
    </div>
  )
}
