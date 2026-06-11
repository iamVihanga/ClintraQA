'use client'
import React from 'react'
import { type RowLabelProps, useRowLabel } from '@payloadcms/ui'
import type { Service } from '@/payload-types'

type Deliverable = NonNullable<Service['deliverables']>[number]

export const DeliverableRowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<Deliverable>()

  const label = data?.item?.trim() ? data.item : `Deliverable ${(rowNumber ?? 0) + 1}`

  return <div>{label}</div>
}
