import React from 'react'

import type { GridLayoutBlock as GridLayoutProps } from '@/payload-types'
import { cn } from '@/lib/utils'
import RichText from '@/components/RichText'

type Props = {
  className?: string
} & GridLayoutProps

export function GridLayout({ className, ...props }: Props) {
  const { cards } = props

  return (
    <section className={cn('mx-auto px-6 sm:px-0', className)} style={{ maxWidth: '1160px' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards?.map((card) => (
          <div
            key={card.id}
            className={cn('rounded-xl border p-7 bg-white border-gray-300 shadow-none')}
          >
            {card.content && (
              <RichText
                data={card.content}
                enableGutter={false}
                enableProse={false}
                className="[&_h2]:mb-6 [&_h2]:font-heading [&_h2]:text-[38px] [&_h2]:leading-[1.15] [&_h2]:text-navy [&_h3]:mb-4 [&_h3]:font-sans [&_h3]:tracking-tighter [&_h3]:text-2xl [&_h3]:text-navy [&_h4]:mb-2 [&_h4]:font-sans [&_h4]:tracking-tighter [&_h4]:font-semibold  [&_h4]:text-lg [&_h4]:text-navy [&_p]:text-sm [&_p]:text-warm-gray-600"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
