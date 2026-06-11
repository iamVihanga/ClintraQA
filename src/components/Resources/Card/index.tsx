'use client'
import { cn } from '@/lib/utils'
import useClickableCard from '@/payloadcms/utils/use-clickable-card'
import Link from 'next/link'
import React from 'react'

import type { Resource } from '@/payload-types'

import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'

export type CardResourceData = Pick<
  Resource,
  'slug' | 'resource-category' | 'meta' | 'title' | 'thumbnail' | 'shortDescription'
>

export const ResourceCard: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardResourceData
  relationTo?: 'resources'
  showCategory?: boolean
  title?: string
}> = (props) => {
  const { card } = useClickableCard({})
  const { className, doc, relationTo, showCategory, title: titleFromProps } = props

  const { slug, 'resource-category': resourceCategory, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategory = typeof resourceCategory === 'object'
  const titleToUse = titleFromProps || title || doc?.meta?.title
  const sanitizedDescription = doc?.shortDescription || description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <Link href={href} passHref>
      <article
        className={cn(
          'group relative flex h-full flex-col gap-4 overflow-hidden rounded-xl border border-warm-gray-200 bg-white transition-shadow hover:shadow-sm p-6',
          className,
        )}
        ref={card.ref}
      >
        {hasCategory && (
          <p className={cn('text-xs font-semibold tracking-[0.18em] uppercase text-navy-main')}>
            {resourceCategory?.title}
          </p>
        )}

        {doc?.thumbnail && (
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <Media
              resource={doc.thumbnail}
              fill
              htmlElement={null}
              imgClassName="object-cover object-top"
            />
          </div>
        )}

        {titleToUse && (
          <h3 className="font-heading text-2xl leading-snug text-navy">{titleToUse}</h3>
        )}

        {sanitizedDescription && (
          <p className="text-sm text-warm-gray-600">{sanitizedDescription}</p>
        )}

        <Button variant="link" className="group text-left w-fit">
          Read More
          <span
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          >
            →
          </span>
        </Button>
      </article>
    </Link>
  )
}
