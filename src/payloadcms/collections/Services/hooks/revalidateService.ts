// src/payloadcms/collections/Services/hooks/revalidateService.ts
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath } from 'next/cache'

async function revalidatePagesWithServiceGrid(payload: any) {
  const result = await payload.find({
    collection: 'pages',
    depth: 0,
    limit: 100,
    pagination: false,
    where: {
      'layout.blockType': { equals: 'service-grid' },
    },
  })

  for (const page of result.docs) {
    const path = page.slug === 'home' ? '/' : `/${page.slug}`
    payload.logger.info(`Revalidating page with service-grid block: ${path}`)
    revalidatePath(path)
  }
}

export const revalidateService: CollectionAfterChangeHook = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    await revalidatePagesWithServiceGrid(payload)
  }
  return doc
}

export const revalidateServiceDelete: CollectionAfterDeleteHook = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    await revalidatePagesWithServiceGrid(payload)
  }
  return doc
}
