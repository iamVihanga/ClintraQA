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
    {
      name: 'requestUrl',
      type: 'text',
      label: 'CTA Destination URL',
      defaultValue: '/contact',
      admin: {
        description:
          'URL that all "Request" buttons link to. Accepts a path (e.g. /contact) or anchor.',
      },
    },
  ],
}
