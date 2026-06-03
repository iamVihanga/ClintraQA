'use client'
import React from 'react'
import { type RowLabelProps, useRowLabel } from '@payloadcms/ui'

type FaqItem = {
  question?: string | null
  answer?: string | null
  category?: string | null
  id?: string | null
}

export const FaqRowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<FaqItem>()
  const n = String((rowNumber ?? 0) + 1).padStart(2, '0')
  const label = data?.question ? `Q${n}: ${data.question}` : `FAQ Item ${n}`

  return <div>{label}</div>
}
