import type { Block } from 'payload'

export const FormBlock: Block = {
  slug: 'form-block',
  interfaceName: 'FormBlock',
  labels: {
    singular: 'Form',
    plural: 'Forms',
  },
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      label: 'Form',
      admin: {
        description: 'Select a form created in the Forms collection.',
      },
    },
  ],
}
