import React from 'react'

import type { ApproachStepsBlock as ApproachStepsBlockProps } from '@/payload-types'
import { ApproachSteps as ApproachStepsComponent } from '@/payloadcms/globals/approach-steps/Component'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
} & ApproachStepsBlockProps

export function ApproachSteps({ className, theme, bottomPadding }: Props) {
  return <ApproachStepsComponent className={cn(bottomPadding && 'pb-16')} theme={theme} />
}
