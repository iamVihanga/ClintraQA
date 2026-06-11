// Customized Zeptomail Email Adapter for Payload CMS
import nodemailer from 'nodemailer'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { EmailAdapter } from 'payload'

export default function zeptomailAdapter(): Promise<EmailAdapter> {
  const port = Number(process.env.SMTP_PORT)

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  // Add this temporarily:
  transport.verify((error, success) => {
    if (error) console.error('SMTP verify failed:', error)
    else console.log('SMTP ready, server:', success)
  })

  return nodemailerAdapter({
    defaultFromName: process.env.ZEPTOMAIL_SENDER_NAME!,
    defaultFromAddress: process.env.ZEPTOMAIL_SENDER_EMAIL!,
    transport,
  })
}
