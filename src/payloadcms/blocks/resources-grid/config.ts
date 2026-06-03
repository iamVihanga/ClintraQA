import type { Block } from 'payload'

export const ResourcesGridBlock: Block = {
  slug: 'resources-grid',
  interfaceName: 'ResourcesGridBlock',
  labels: {
    singular: 'Resources Grid',
    plural: 'Resources Grids',
  },
  fields: [
    {
      name: 'showAll',
      type: 'checkbox',
      label: 'Show All Resources',
      defaultValue: true,
      admin: {
        description:
          'When enabled, all visible resources are displayed. Uncheck to handpick specific resources.',
      },
    },
    {
      name: 'selectedResources',
      label: 'Resources to Display',
      type: 'relationship',
      relationTo: 'resources',
      hasMany: true,
      maxRows: 12,
      admin: {
        condition: (_data, siblingData) => siblingData?.showAll === false,
        description: 'Choose which resources appear in this grid.',
      },
    },
  ],
}
