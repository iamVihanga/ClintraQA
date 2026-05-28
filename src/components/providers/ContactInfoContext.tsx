'use client'

import { createContext, useContext } from 'react'

import type { ContactInfo } from '@/payload-types'

export const ContactInfoContext = createContext<ContactInfo | null>(null)

export function ContactInfoProvider({
  data,
  children,
}: {
  data: ContactInfo
  children: React.ReactNode
}) {
  return <ContactInfoContext.Provider value={data}>{children}</ContactInfoContext.Provider>
}

export function useContactInfo() {
  return useContext(ContactInfoContext)
}
