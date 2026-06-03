import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'

import type { Resource } from '@/payload-types'

import { ResourceCard } from '../Card'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export type RelatedPostsProps = {
  className?: string
  docs?: Resource[]
  introContent?: DefaultTypedEditorState
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={clsx('mx-auto', className)} style={{ maxWidth: '1160px' }}>
      {introContent && <RichText data={introContent} enableGutter={false} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return <ResourceCard key={index} doc={doc} relationTo="resources" showCategory />
        })}
      </div>
    </div>
  )
}
