import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

// --- Blocks ---
import { HeroBlock } from './hero/Component'
import { AvailabilityPanel } from './availability-panel/Component'
import { SectionHeader } from './section-header/Component'
import { ServiceGrid } from './service-grid/Component'
import { DarkLayout } from './layout-blocks/dark/Component'
import { ApproachSteps } from './approach-steps/Component'

const blockComponents = {
  hero: HeroBlock,
  'availability-panel': AvailabilityPanel,
  'section-header': SectionHeader,
  'service-grid': ServiceGrid,
  'dark-layout': DarkLayout,
  'approach-steps-block': ApproachSteps,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
