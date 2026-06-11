import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Resource, ResourcesGridBlock as ResourcesGridProps } from '@/payload-types'
import { ResourcesGridClient } from './Component.client'

async function getResources(): Promise<Resource[]> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'resources',
    depth: 1,
    limit: 100,
    pagination: false,
  })

  return result.docs as Resource[]
}

export async function ResourcesGrid({ showAll, selectedResources }: ResourcesGridProps) {
  let resources: Resource[]

  if (showAll !== false) {
    resources = await getResources()
  } else {
    resources = (selectedResources ?? []).filter(
      (r): r is Resource => typeof r === 'object' && r !== null,
    )
  }

  return <ResourcesGridClient resources={resources} />
}
