import type { Block } from 'payload'

export const ServiceGridBlock: Block = {
  slug: 'service-grid',
  interfaceName: 'ServiceGridBlock',
  labels: {
    singular: 'Service Grid',
    plural: 'Service Grids',
  },
  fields: [
    {
      name: 'showAll',
      type: 'checkbox',
      label: 'Show All Services',
      defaultValue: true,
      admin: {
        description:
          'When enabled, all visible services are displayed. Uncheck to handpick specific services.',
      },
    },
    {
      name: 'showFilterOptions',
      type: 'checkbox',
      label: 'Show Filter Options',
      defaultValue: true,
      admin: {
        description: 'Display status filter buttons (All, Open, Limited, Closed) above the grid.',
      },
    },
    {
      name: 'showStatusBadge',
      type: 'checkbox',
      label: 'Show Status Badge',
      defaultValue: true,
      admin: {
        description:
          'Display a badge indicating the status of each service card in grid (All, Open, Limited, Closed).',
      },
    },
    {
      name: 'isSelectable',
      type: 'checkbox',
      label: 'Enable Service Selection',
      defaultValue: false,
      admin: {
        description:
          'Display a call-to-action button on each service card, to perform select service action',
      },
    },
    {
      name: 'selectedServices',
      label: 'Services to Display',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      maxRows: 12,
      admin: {
        condition: (_data, siblingData) => siblingData?.showAll === false,
        description: 'Choose which services appear in this grid.',
      },
    },
    {
      name: 'showDeliverables',
      type: 'checkbox',
      label: 'Show Deliverables',
      defaultValue: true,
      admin: {
        description: 'Display deliverable tags on each service card.',
      },
    },
  ],
}
