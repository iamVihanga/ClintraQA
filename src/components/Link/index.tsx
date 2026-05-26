import { Button, buttonVariants } from '@/components/ui/button'
import { type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import NextLink from 'next/link'
import React from 'react'

import type { Page } from '@/payload-types'

type ButtonVariant = VariantProps<typeof buttonVariants>['variant']
type ButtonSize = VariantProps<typeof buttonVariants>['size']

export type CMSLinkType = {
  appearance?: 'inline' | ButtonVariant
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages'
    value: Page | string | number
  } | null
  size?: ButtonSize | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = ({
  type,
  appearance = 'inline',
  children,
  className,
  label,
  newTab,
  reference,
  size,
  url,
}) => {
  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? reference.relationTo === 'pages' && reference.value.slug === 'home'
        ? '/'
        : `${reference.relationTo !== 'pages' ? `/${reference.relationTo}` : ''}/${reference.value.slug}`
      : url

  if (!href) return null

  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' as const } : {}

  if (appearance === 'inline') {
    return (
      <NextLink className={cn(className)} href={href} {...newTabProps}>
        {label}
        {children}
      </NextLink>
    )
  }

  return (
    <Button asChild className={cn(className)} size={size ?? undefined} variant={appearance}>
      <NextLink href={href} {...newTabProps}>
        {label}
        {children}
      </NextLink>
    </Button>
  )
}
