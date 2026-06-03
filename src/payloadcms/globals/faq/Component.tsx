import React from 'react'

import { getCachedGlobal } from '@/payloadcms/utils/get-globals'
import { FaqClient } from './Component.client'

type Props = {
  className?: string
  theme?: 'light' | 'dark' | null
  label?: string | null
  heading?: string | null
  subtitle?: string | null
  filterCategory?: string | null
}

export async function FaqComponent({
  className,
  theme,
  label,
  heading,
  subtitle,
  filterCategory,
}: Props) {
  const data = await getCachedGlobal('faq', 1)()
  let items = data?.items ?? []

  if (filterCategory) {
    items = items.filter((item) => item.category === filterCategory)
  }

  if (!items.length) return null

  return (
    <FaqClient
      items={items}
      className={className}
      theme={theme}
      label={label}
      heading={heading}
      subtitle={subtitle}
    />
  )
}
