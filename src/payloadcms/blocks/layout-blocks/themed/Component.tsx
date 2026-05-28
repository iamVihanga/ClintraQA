import React, { Fragment } from 'react'

import type { ThemedLayoutBlock as ThemedLayoutProps } from '@/payload-types'
import { cn } from '@/lib/utils'

// --- Nested Blocks ---
import { SectionHeader } from '../../section-header/Component'
import { ApproachSteps } from '../../approach-steps/Component'
import { GridLayout } from '../grid/Component'

const blockComponents = {
  'section-header': SectionHeader,
  'approach-steps-block': ApproachSteps,
  'grid-layout': GridLayout,
}

type Props = {
  className?: string
} & ThemedLayoutProps

export function ThemedLayout({ className, theme, innerBlocks }: Props) {
  const hasBlocks = innerBlocks && Array.isArray(innerBlocks) && innerBlocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        <div
          className={cn('pb-16', {
            'bg-navy': theme === 'navy',
            'bg-warm-gray-100': theme === 'secondary',
          })}
        >
          {innerBlocks.map((block, index) => {
            const { blockType } = block

            if (blockType && blockType in blockComponents) {
              const Block = blockComponents[blockType]

              if (Block) {
                return (
                  <div className="" key={index}>
                    {/* @ts-expect-error there may be some mismatch between the expected types here */}
                    <Block {...block} isDark={theme === 'navy' && true} disableInnerContainer />
                  </div>
                )
              }
            }
            return null
          })}
        </div>
      </Fragment>
    )
  }

  return null
}
