import { BeforeEmail } from '@payloadcms/plugin-form-builder/types'

import { FormSubmission } from '@/payload-types'

export const beforeEmail: BeforeEmail<FormSubmission> = (emails, beforeChangeParams) => {
  // Default from address and name from environment variables
  const defaultFromName = process.env.ZEPTOMAIL_SENDER_NAME || 'ClintraQA'
  const defaultFromAddress = process.env.ZEPTOMAIL_SENDER_EMAIL || 'no-reply@clintraqa.com'
  const defaultFrom = `"${defaultFromName}" <${defaultFromAddress}>`

  return emails.map((email) => ({
    ...email,
    // Ensure 'from' is always set to a valid Zeptomail verified sender
    from: email.from && email.from.trim() !== '' ? email.from : defaultFrom,
    html: `
      <div>
        <style>
          h1 { font-size: 3rem }
          p { font-size: 1rem; font-weight: bold; padding: 1rem; border: 1px solid darkgreen; border-radius: 0.5rem; }
        </style>

        <div>
          ${email.html}
        </div>
      </div>
    `,
  }))
}
