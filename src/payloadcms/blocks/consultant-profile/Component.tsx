'use client'

import React from 'react'
import { motion } from 'motion/react'

import type {
  Media as MediaType,
  ConsultantProfileBlock as ConsultantProfileProps,
} from '@/payload-types'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

const ease = [0.22, 1, 0.36, 1] as const

type Props = {
  className?: string
  sectionLabel?: string | null
  headline?: string | null
} & ConsultantProfileProps

export function ConsultantProfileBlock({
  photo,
  name,
  credentials,
  bio,
  expertiseAreas,
  sectionLabel,
  headline,
}: Props) {
  const hasPhoto = photo && typeof photo === 'object'

  return (
    <section className="px-6 py-14 md:py-22">
      <div
        className="mx-auto grid grid-cols-1 items-start gap-10 lg:gap-22 lg:grid-cols-2"
        style={{ maxWidth: '1160px' }}
      >
        {/* ── Portrait card ── */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease }}
          className="relative flex aspect-4/5 items-end overflow-hidden rounded-xl border border-warm-gray-200 p-8"
        >
          {/* Gradient background */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #e6f1fb 0%, #c5dff5 100%)',
            }}
          />

          {/* Photo or initials placeholder */}
          {hasPhoto ? (
            <Media
              resource={photo as MediaType}
              fill
              htmlElement={null}
              imgClassName="object-cover object-top"
            />
          ) : (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[-65%] select-none font-heading text-[96px] leading-none text-navy/15">
              CQA
            </div>
          )}

          {/* Name card at bottom */}
          {(name || credentials) && (
            <div className="relative z-10 w-full rounded-lg border border-warm-gray-200 bg-white px-5 py-3.5">
              {name && <p className="text-[15px] font-medium text-navy">{name}</p>}
              {credentials && (
                <p className="mt-0.5 text-[13px] text-warm-gray-600">{credentials}</p>
              )}
            </div>
          )}
        </motion.div>

        {/* ── Content ── */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          {/* Section label */}
          {sectionLabel && (
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-main">
              {sectionLabel}
            </p>
          )}

          {/* Headline */}
          {headline && (
            <h2 className="mb-6 font-heading text-[38px] leading-[1.15] text-navy">{headline}</h2>
          )}

          {/* Bio rich text */}
          {bio && (
            <RichText
              data={bio}
              enableGutter={false}
              enableProse={false}
              className="[&_h2]:mb-6 [&_h2]:font-heading [&_h2]:text-[38px] [&_h2]:leading-[1.15] [&_h2]:text-navy [&_h3]:mb-4 [&_h3]:font-heading [&_h3]:text-2xl [&_h3]:text-navy [&_p]:mb-6 [&_p]:text-[16px] [&_p]:leading-[1.8] [&_p]:text-warm-gray-600"
            />
          )}

          {/* Expertise tags */}
          {expertiseAreas && expertiseAreas.length > 0 && (
            <div className="mt-8">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-warm-gray-400">
                Areas of Expertise
              </p>
              <div className="flex flex-wrap gap-2">
                {expertiseAreas.map((area, i) =>
                  area.tag ? (
                    <span
                      key={area.id ?? i}
                      className="rounded-full border border-navy-main/15 bg-navy-tint px-3.5 py-1.5 text-[12px] font-medium text-navy-mid"
                    >
                      {area.tag}
                    </span>
                  ) : null,
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
