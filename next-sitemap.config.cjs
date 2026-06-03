const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://clintraqa.com'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/pages-sitemap.xml', '/*', '/resources-sitemap.xml', '/resources/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '/admin/*',
      },
    ],
    additionalSitemaps: [`${SITE_URL}/pages-sitemap.xml`, `${SITE_URL}/resources-sitemap.xml`],
  },
}
