import type { GlobalConfig } from 'payload'

import { link } from '@/payloadcms/fields/link'
import { anyone } from '@/payloadcms/access/anyone'

import { revalidateContactInfo } from './hooks/revalidate-contact-info'

export const ContactInfo: GlobalConfig = {
  slug: 'contact-info',
  admin: {
    group: 'Contact & Communication',
  },
  access: {
    read: anyone,
  },
  fields: [
    {
      name: 'direct-contacts',
      type: 'group',
      label: 'Direct Contacts',
      fields: [
        {
          name: 'primaryEmail',
          type: 'email',
          label: 'Primary Email',
        },
        {
          name: 'secondaryEmail',
          type: 'email',
          label: 'Secondary Email',
        },
        {
          name: 'phoneNumbers',
          type: 'array',
          label: 'Phone Numbers',
          fields: [
            {
              name: 'phoneNumber',
              type: 'text',
              label: 'Phone Number',
            },
          ],
        },
        {
          name: 'responseTimeNote',
          type: 'text',
          label: 'Response Time Note',
        },
      ],
    },
    {
      name: 'address',
      type: 'group',
      label: 'Address Information',
      fields: [
        {
          name: 'streetAddress',
          type: 'text',
          label: 'Street Address',
        },
        {
          name: 'city',
          type: 'text',
          label: 'City',
        },
        {
          name: 'state',
          type: 'text',
          label: 'State/Province',
        },
        {
          name: 'postalCode',
          type: 'text',
          label: 'Postal Code',
        },
        {
          name: 'country',
          type: 'text',
          label: 'Country',
        },
      ],
    },
    {
      name: 'socialMediaLinks',
      type: 'array',
      label: 'Social Media Links',
      fields: [
        link({
          appearances: false,
        }),
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/payloadcms/globals/contact-info/RowLabel#SocialMediaLinksRowLabel',
        },
      },
    },
    {
      name: 'businessHours',
      type: 'group',
      label: 'Business Hours',
      fields: [
        {
          name: 'weekdays',
          type: 'text',
          label: 'Weekdays',
        },
        {
          name: 'weekends',
          type: 'text',
          label: 'Weekends',
        },
        {
          name: 'additionalNotes',
          type: 'text',
          label: 'Additional Notes',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateContactInfo],
  },
}
