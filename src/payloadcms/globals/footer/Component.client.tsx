'use client'

import React from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'

import type { ContactInfo, Footer, Media } from '@/payload-types'
import { Logo } from '@/components/Logo'
import { CMSLink } from '@/components/Link'

interface FooterClientProps {
  data: Footer
  contactInfo: ContactInfo
  siteName?: string | null
  copyrightText?: string | null
}

function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 text-[11px] font-semibold uppercase tracking-widest text-white/35">
      {children}
    </p>
  )
}

export function FooterClient({ data, contactInfo, siteName, copyrightText }: FooterClientProps) {
  const references = data?.references ?? []
  const legalReferences = data?.['legal-references'] ?? []
  const logo = data?.footerLogo
  const tagline = data?.footerTagline

  const directContacts = contactInfo?.['direct-contacts']
  const address = contactInfo?.address
  const socialLinks = contactInfo?.socialMediaLinks ?? []

  const year = new Date().getFullYear()
  const resolvedName = siteName ?? 'Clintra QA'
  const copyright = copyrightText ?? `© ${year} ${resolvedName}. All rights reserved.`

  return (
    <footer className="border-t border-white/8 bg-navy">
      {/* ── 4-column grid ── */}
      <div
        className="mx-auto grid grid-cols-1 gap-10 px-6 py-16 md:grid-cols-2 lg:grid-cols-4"
        style={{ maxWidth: '1160px' }}
      >
        {/* Col 1 — Logo + tagline */}
        <div>
          {logo && typeof logo === 'object' ? (
            <Logo resource={logo as Media} loading="lazy" className="max-h-12 w-auto" />
          ) : (
            <span className="font-heading text-lg text-white">{resolvedName}</span>
          )}
          {tagline && <p className="mt-3 text-[13px] leading-relaxed text-white/45">{tagline}</p>}
        </div>

        {/* Col 2 — Explore (page references) */}
        <div>
          <ColHeading>Explore</ColHeading>
          {references.length > 0 ? (
            <nav className="flex flex-col gap-2.5">
              {references.map((item) => (
                <CMSLink
                  key={item.id ?? item.link.label}
                  {...item.link}
                  appearance="inline"
                  className="text-[13px] text-white/55 transition-colors hover:text-white/90"
                />
              ))}
            </nav>
          ) : null}
        </div>

        {/* Col 3 — Legal */}
        <div>
          <ColHeading>Legal</ColHeading>
          {legalReferences.length > 0 ? (
            <nav className="flex flex-col gap-2.5">
              {legalReferences.map((item) => (
                <CMSLink
                  key={item.id ?? item.link.label}
                  {...item.link}
                  appearance="inline"
                  className="text-[13px] text-white/55 transition-colors hover:text-white/90"
                />
              ))}
            </nav>
          ) : null}
        </div>

        {/* Col 4 — Get in Touch */}
        <div>
          <ColHeading>Get in Touch</ColHeading>
          <div className="flex flex-col gap-2.5">
            {directContacts?.primaryEmail && (
              <a
                href={`mailto:${directContacts.primaryEmail}`}
                className="flex items-start gap-2.5 text-[13px] text-white/55 transition-colors hover:text-white/90"
              >
                <Mail size={14} className="mt-0.5 shrink-0 text-white/35" />
                {directContacts.primaryEmail}
              </a>
            )}
            {directContacts?.phoneNumbers?.[0]?.phoneNumber && (
              <a
                href={`tel:${directContacts.phoneNumbers[0].phoneNumber.replace(/\s/g, '')}`}
                className="flex items-start gap-2.5 text-[13px] text-white/55 transition-colors hover:text-white/90"
              >
                <Phone size={14} className="mt-0.5 shrink-0 text-white/35" />
                {directContacts.phoneNumbers[0].phoneNumber}
              </a>
            )}
            {(address?.city || address?.country) && (
              <p className="flex items-start gap-2.5 text-[13px] text-white/55">
                <MapPin size={14} className="mt-0.5 shrink-0 text-white/35" />
                {[address.city, address.country].filter(Boolean).join(', ')}
              </p>
            )}
          </div>

          {/* Social media links */}
          {socialLinks.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
              {socialLinks.map((item) => (
                <CMSLink
                  key={item.id ?? item.link.label}
                  {...item.link}
                  appearance="inline"
                  className="text-[13px] text-white/55 transition-colors hover:text-white/90"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/8">
        <div
          className="mx-auto flex flex-wrap items-center justify-between gap-4 px-6 py-5"
          style={{ maxWidth: '1160px' }}
        >
          <p className="text-[12px] text-white/30">{copyright}</p>
          <p className="text-[12px] text-white/30">
            Developed by <span className="text-white/45">Codeville</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
