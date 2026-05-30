import type { Block } from 'payload'

export const CredibilityStripe: Block = {
  slug: 'credibility-stripe',
  interfaceName: 'CredibilityStripeBlock',
  labels: {
    singular: 'Credibility Stripe',
    plural: 'Credibility Stripes',
  },
  fields: [
    {
      name: 'credibilities',
      label: 'List of Credibilities to Display',
      type: 'array',
      fields: [
        {
          name: 'credibility',
          label: 'Credibility',
          type: 'text',
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
  ],
}
