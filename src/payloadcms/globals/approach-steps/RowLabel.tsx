'use client'
import React from 'react'
import type { ApproachStep } from '@/payload-types'
import { type RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const ApproachStepsRowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<NonNullable<ApproachStep['steps']>[number]>()

  const num = data?.number ?? String((rowNumber ?? 0) + 1).padStart(2, '0')
  const label = data?.title ? `${num} — ${data.title}` : `Step ${num}`

  return <div>{label}</div>
}
