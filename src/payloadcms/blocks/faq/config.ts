import type { Block } from 'payload'

export const FaqBlock: Block = {
  slug: 'faq-block',
  interfaceName: 'FaqBlock',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  fields: [
    {
      name: 'label',
      label: 'Label',
      type: 'text',
      admin: {
        description: 'Small eyebrow label above the heading (e.g. "FAQ")',
      },
    },
    {
      name: 'heading',
      label: 'Heading',
      type: 'textarea',
    },
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'textarea',
    },
    {
      name: 'theme',
      type: 'select',
      label: 'Theme',
      defaultValue: 'light',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
      ],
    },
    {
      name: 'filterCategory',
      label: 'Filter Category',
      type: 'text',
      admin: {
        description:
          'Optional. Only show FAQ items matching this category. Leave blank to show all.',
      },
    },
  ],
}
