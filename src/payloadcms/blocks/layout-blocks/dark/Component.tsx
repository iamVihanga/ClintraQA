import React, { Fragment } from 'react'

import type { DarkLayoutBlock as DarkLayoutProps } from '@/payload-types'

// --- Nested Blocks ---
import { SectionHeader } from '../../section-header/Component'
import { ApproachSteps } from '../../approach-steps/Component'

const blockComponents = {
  'section-header': SectionHeader,
  'approach-steps-block': ApproachSteps,
}

type Props = {
  className?: string
} & DarkLayoutProps

export function DarkLayout({ className, innerBlocks }: Props) {
  const hasBlocks = innerBlocks && Array.isArray(innerBlocks) && innerBlocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        <div className="pb-16 bg-navy">
          {innerBlocks.map((block, index) => {
            const { blockType } = block

            if (blockType && blockType in blockComponents) {
              const Block = blockComponents[blockType]

              if (Block) {
                return (
                  <div className="" key={index}>
                    {/* @ts-expect-error there may be some mismatch between the expected types here */}
                    <Block {...block} isDark={true} disableInnerContainer />
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
