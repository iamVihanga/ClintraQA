import React from 'react'

import { getCachedGlobal } from '@/payloadcms/utils/get-globals'
import { FooterClient } from './Component.client'

export async function Footer() {
  const [footerData, siteSettingsData, contactInfoData] = await Promise.all([
    getCachedGlobal('footer', 2)(),
    getCachedGlobal('site-settings', 1)(),
    getCachedGlobal('contact-info', 1)(),
  ])

  const siteName = siteSettingsData?.globalVariables?.siteName
  const copyrightText = siteSettingsData?.globalVariables?.copyrightText

  return (
    <FooterClient
      data={footerData}
      contactInfo={contactInfoData}
      siteName={siteName}
      copyrightText={copyrightText}
    />
  )
}
