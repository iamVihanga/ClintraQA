import clsx from 'clsx'
import React from 'react'

import type { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: boolean
  resource?: (number | null) | MediaType
  siteName?: string | null
}

export const Logo = ({ loading, priority, className, resource, siteName }: Props) => {
  if (resource && typeof resource === 'object') {
    return (
      <Media
        resource={resource}
        htmlElement={null}
        imgClassName={clsx('max-h-[34px] w-auto object-contain', className)}
        loading={loading}
        priority={priority}
      />
    )
  }

  if (siteName) {
    return <span className={clsx('font-bold text-xl', className)}>{siteName}</span>
  }

  return null
}
