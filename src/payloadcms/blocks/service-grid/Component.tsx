import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Service } from '@/payload-types'
import { ServiceGridClient } from './Component.client'

type ServiceGridBlockProps = {
  showAll?: boolean | null
  selectedServices?: (number | Service)[] | null
  showDeliverables?: boolean | null
  requestUrl?: string | null
  className?: string
}

async function getAllVisibleServices(): Promise<Service[]> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'services',
    depth: 1,
    limit: 100,
    pagination: false,
    where: {
      visible: { equals: true },
    },
  })

  return result.docs as Service[]
}

export async function ServiceGrid({
  showAll,
  selectedServices,
  showDeliverables,
  requestUrl,
  className,
}: ServiceGridBlockProps) {
  let services: Service[]

  if (showAll !== false) {
    services = await getAllVisibleServices()
  } else {
    services = (selectedServices ?? []).filter(
      (s): s is Service => typeof s === 'object' && s !== null && s.visible === true,
    )
  }

  return (
    <ServiceGridClient
      services={services}
      showDeliverables={showDeliverables ?? true}
      requestUrl={requestUrl ?? '/contact'}
      className={className}
    />
  )
}
