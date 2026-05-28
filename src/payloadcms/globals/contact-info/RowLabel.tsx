'use client'
import { Footer } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const SocialMediaLinksRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<ContactInfo['socialMediaLinks']>[number]>()

  const label = data?.data?.link?.label
    ? `Social Media Link ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data?.data?.link?.label}`
    : 'Row'

  return <div>{label}</div>
}
