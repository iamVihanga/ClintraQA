'use client'
import React from 'react'
import { Faq } from '@/payload-types'
import { type RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const FaqRowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<NonNullable<Faq['items']>[number]>()

  const label = data?.question ? `Q ${rowNumber} : ${data?.question}` : 'Row'

  return <div>{label}</div>
}
