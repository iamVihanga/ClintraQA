import type { RichLinkBlock as RichLinkProps } from '@/payload-types'

import { cn } from '@/lib/utils'
import NextLink from 'next/link'
import { ArrowUpRight } from 'lucide-react'

type Props = {
  className?: string
} & RichLinkProps

export function RichLink({ className, link }: Props) {
  const { type, reference, label, newTab, url } = link

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? reference.relationTo === 'pages' && reference.value.slug === 'home'
        ? '/'
        : `${reference.relationTo !== 'pages' ? `/${reference.relationTo}` : ''}/${reference.value.slug}`
      : url

  if (!href) return null

  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' as const } : {}

  return (
    <NextLink
      href={href}
      {...newTabProps}
      className={cn('group flex items-center gap-4', className)}
    >
      <div className="size-10 flex items-center justify-center rounded-lg bg-navy-light/50 text-navy-main">
        <ArrowUpRight className="size-5" />
      </div>

      <span className="text-navy font-medium group-hover:underline duration-100">{label}</span>
    </NextLink>
  )
}
