import React, { Suspense } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Form, Service } from '@/payload-types'
import { RequestSupportForm } from './Form.client'

type FormBlockProps = {
  form: number | Form
}

export async function FormBlockComponent({ form }: FormBlockProps) {
  const payload = await getPayload({ config: configPromise })

  const formId = typeof form === 'number' ? form : form.id

  const [formDoc, servicesResult] = await Promise.all([
    payload.findByID({
      collection: 'forms',
      id: formId,
      depth: 0,
    }),
    payload.find({
      collection: 'services',
      depth: 0,
      limit: 100,
      pagination: false,
      where: {
        and: [{ status: { in: ['open', 'limited'] } }, { visible: { equals: true } }],
      },
    }),
  ])

  const services = servicesResult.docs as Service[]

  return (
    <div className="mx-auto w-full max-w-2xl" style={{ maxWidth: '1160px' }}>
      <Suspense>
        <RequestSupportForm form={formDoc} services={services} />
      </Suspense>
    </div>
  )
}
