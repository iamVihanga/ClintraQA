import type { Block } from 'payload'

import { SectionHeaderBlock } from '@/payloadcms/blocks/section-header/config'
import { ApproachStepsBlock } from '@/payloadcms/blocks/approach-steps/config'

export const DarkLayoutBlock: Block = {
  slug: 'dark-layout',
  interfaceName: 'DarkLayoutBlock',
  labels: {
    singular: 'Dark Layout Block',
    plural: 'Dark Layout Blocks',
  },
  fields: [
    {
      name: 'innerBlocks',
      type: 'blocks',
      label: 'Inner Blocks',
      blocks: [SectionHeaderBlock, ApproachStepsBlock],
    },
  ],
}
