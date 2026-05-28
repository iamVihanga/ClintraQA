import type { Block } from 'payload'

import { SectionHeaderBlock } from '@/payloadcms/blocks/section-header/config'
import { ApproachStepsBlock } from '@/payloadcms/blocks/approach-steps/config'
import { GridLayoutBlock } from '@/payloadcms/blocks/layout-blocks/grid/config'

export const ThemedLayoutBlock: Block = {
  slug: 'themed-layout',
  interfaceName: 'ThemedLayoutBlock',
  labels: {
    singular: 'Themed Layout Block',
    plural: 'Themed Layout Blocks',
  },
  fields: [
    {
      name: 'theme',
      type: 'select',
      label: 'Layout Theme',
      options: [
        { label: 'Secondary', value: 'secondary' },
        { label: 'Navy', value: 'navy' },
      ],
      defaultValue: 'secondary',
      required: true,
    },
    {
      name: 'innerBlocks',
      type: 'blocks',
      label: 'Inner Blocks',
      blocks: [SectionHeaderBlock, ApproachStepsBlock, GridLayoutBlock],
    },
  ],
}
