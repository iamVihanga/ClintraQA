import React from 'react'
import type { HeroBlock as HeroBlockProps } from '@/payload-types'

import { cn } from '@/lib/utils'

type Props = {
  className?: string
} & HeroBlockProps

export const HeroBlock: React.FC<Props> = ({ className, ...props }) => {
  return (
    <div className={cn('mx-auto py-4 w-full border-y', className)}>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  )
}
