'use client'
import NextLink from 'next/link'
import {
  FaLinkedinIn,
  FaXTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaGithub,
  FaTiktok,
  FaPinterest,
  FaWhatsapp,
  FaGlobe,
} from 'react-icons/fa6'
import type { IconType } from 'react-icons'

import type { Page } from '@/payload-types'
import { cn } from '@/lib/utils'
import { useContactInfo } from '@/components/providers/ContactInfoContext'
import { detectPlatform, type Platform } from './detect-platform'

const PLATFORM_ICONS: Record<Platform, IconType> = {
  linkedin: FaLinkedinIn,
  twitter: FaXTwitter,
  facebook: FaFacebook,
  instagram: FaInstagram,
  youtube: FaYoutube,
  github: FaGithub,
  tiktok: FaTiktok,
  pinterest: FaPinterest,
  whatsapp: FaWhatsapp,
  default: FaGlobe,
}

type Props = {
  className?: string
  divider?: boolean | null
}

type Link = {
  type?: ('reference' | 'custom') | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages'
    value: number | Page
  } | null
  url?: string | null
  label: string
}

interface SocialLinkProps {
  link: Link
  className?: string
}

function SocialLink({ link, className }: SocialLinkProps) {
  const { type, reference, label, newTab, url } = link

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? reference.relationTo === 'pages' && reference.value.slug === 'home'
        ? '/'
        : `${reference.relationTo !== 'pages' ? `/${reference.relationTo}` : ''}/${reference.value.slug}`
      : url

  if (!href) return null

  const platform = detectPlatform(url, label)
  const Icon = PLATFORM_ICONS[platform]

  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' as const } : {}

  return (
    <NextLink
      href={href}
      {...newTabProps}
      className={cn('group flex items-center gap-4', className)}
    >
      <div className="size-10 flex items-center justify-center rounded-lg bg-navy-light/50 text-navy-main">
        <Icon className="size-5" />
      </div>

      <span className="text-navy font-medium group-hover:underline duration-100">{label}</span>
    </NextLink>
  )
}

export function SocialLinksConverter({ className, divider }: Props) {
  const contactInfo = useContactInfo()
  const links = contactInfo?.socialMediaLinks ?? []

  if (!links.length) return null

  return (
    <div className={cn('', className)}>
      {links.map((link) => (
        <SocialLink
          key={link.id}
          link={link.link}
          className={cn({
            'pb-3 last:pb-0 mb-3 last:mb-0 border-b border-secondary last:border-b-0': divider,
          })}
        />
      ))}
    </div>
  )
}
