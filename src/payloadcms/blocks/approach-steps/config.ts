import type { Block } from 'payload'

export const ApproachStepsBlock: Block = {
  slug: 'approach-steps-block',
  interfaceName: 'ApproachStepsBlock',
  labels: {
    singular: 'Approach Step',
    plural: 'Approach Steps',
  },
  fields: [
    {
      name: 'theme',
      type: 'select',
      label: 'Theme',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
      ],
    },
    {
      name: 'bottomPadding',
      type: 'checkbox',
      label: 'Add Bottom Padding',
      defaultValue: false,
    },
  ],
}
