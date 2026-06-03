import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const getResourcesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://clintraqa.com'

    const results = await payload.find({
      collection: 'resources',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const sitemap = results.docs
      ? results.docs
          .filter((post) => Boolean(post?.slug))
          .map((post) => ({
            loc: `${SITE_URL}/resources/${post?.slug}`,
            lastmod: post.updatedAt || dateFallback,
          }))
      : []

    return sitemap
  },
  ['resources-sitemap'],
  {
    tags: ['resources-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getResourcesSitemap()

  return getServerSideSitemap(sitemap)
}
