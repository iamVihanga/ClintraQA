'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const AnimativeWordRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{ word?: string }>()

  const label = data?.data?.word
    ? `Word ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data?.data?.word}`
    : 'Word'

  return <div>{label}</div>
}
