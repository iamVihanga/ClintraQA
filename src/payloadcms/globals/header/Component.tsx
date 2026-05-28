import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/payloadcms/utils/get-globals'
import React from 'react'

export async function Header() {
  const [headerData, siteSettingsData] = await Promise.all([
    getCachedGlobal('header', 1)(),
    getCachedGlobal('site-settings', 1)(),
  ])

  const logo = siteSettingsData?.globalVariables?.logo
  const siteName = siteSettingsData?.globalVariables?.siteName

  return <HeaderClient data={headerData} logo={logo} siteName={siteName} />
}
