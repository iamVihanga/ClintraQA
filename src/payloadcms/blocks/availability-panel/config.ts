import type { Block } from 'payload'

export const AvailabilityPanelBlock: Block = {
  slug: 'availability-panel',
  interfaceName: 'AvailabilityPanelBlock',
  labels: {
    singular: 'Availability Panel',
    plural: 'Availability Panels',
  },
  fields: [
    {
      name: 'selectedServices',
      label: 'Select Services to Display',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      maxRows: 6,
    },
  ],
}
