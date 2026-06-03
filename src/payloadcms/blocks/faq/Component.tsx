import React from 'react'

import { FaqComponent } from '@/payloadcms/globals/faq/Component'

type Props = {
  blockType: 'faq-block'
  id?: string | null
  label?: string | null
  heading?: string | null
  subtitle?: string | null
  theme?: 'light' | 'dark' | null
  filterCategory?: string | null
}

export function FaqBlockComponent({ theme, label, heading, subtitle, filterCategory }: Props) {
  return (
    <FaqComponent
      theme={theme}
      label={label}
      heading={heading}
      subtitle={subtitle}
      filterCategory={filterCategory}
    />
  )
}
