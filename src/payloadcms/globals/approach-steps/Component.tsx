import React from 'react'

import { getCachedGlobal } from '@/payloadcms/utils/get-globals'
import { ApproachStepsClient } from './Component.client'

import type { ApproachStepsBlock as BlockProps } from '@/payload-types'

type Props = {
  className?: string
  theme?: BlockProps['theme']
}

export async function ApproachSteps({ className, theme }: Props) {
  const data = await getCachedGlobal('approachSteps', 1)()
  const steps = data?.steps ?? []

  return <ApproachStepsClient steps={steps} className={className} theme={theme} />
}
