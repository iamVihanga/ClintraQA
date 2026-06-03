'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'

import type { Resource, Media as MediaType } from '@/payload-types'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Media } from '@/components/Media'

import { ResourceCard } from '@/components/Resources/Card'

// ─── Types ────────────────────────────────────────────────────────────────────
type ResourcesGridClientProps = {
  resources: Resource[]
  className?: string
}

// ─── Constants ────────────────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1] as const

// ─── Resource Card ─────────────────────────────────────────────────────────────
// function ResourceCard(props: Resource) {
//   return (
//     <div className="relative flex h-full flex-col gap-4 overflow-hidden rounded-xl border border-warm-gray-200 bg-white transition-shadow hover:shadow-sm p-6">
//       {typeof props['resource-category'] === 'object' && (
//         <p className={cn('text-xs font-semibold tracking-[0.18em] uppercase text-navy-main')}>
//           {props['resource-category']?.title}
//         </p>
//       )}

//       {typeof props['thumbnail'] === 'object' && (
//         <div className="aspect-video relative rounded-lg overflow-hidden">
//           <Media
//             resource={props['thumbnail'] as MediaType}
//             fill
//             htmlElement={null}
//             imgClassName="object-cover object-top"
//           />
//         </div>
//       )}

//       {props.title && (
//         <h3 className="font-heading text-2xl leading-snug text-navy">{props.title}</h3>
//       )}

//       {props.shortDescription && (
//         <p className="text-sm text-warm-gray-600">{props.shortDescription}</p>
//       )}

//       <Button asChild variant="link" className="group text-left w-fit">
//         <Link href={`/resources/${props.slug}`}>
//           Read More
//           <span
//             aria-hidden
//             className="transition-transform duration-200 group-hover:translate-x-0.5"
//           >
//             →
//           </span>
//         </Link>
//       </Button>
//     </div>
//   )
// }

// ─── Grid Client ──────────────────────────────────────────────────────────────
export function ResourcesGridClient({ resources, className }: ResourcesGridClientProps) {
  return (
    <div className={cn('mx-auto pb-14 pt-2', className)} style={{ maxWidth: '1160px' }}>
      {/* Card grid */}
      <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {resources.map((resource, i) => (
            <motion.div
              key={resource.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: i * 0.05, ease }}
              className="flex"
            >
              <ResourceCard doc={resource} relationTo="resources" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {resources.length === 0 && (
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
