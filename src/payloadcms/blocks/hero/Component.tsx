import React from 'react'
import type { HeroBlock as HeroBlockProps } from '@/payload-types'

import { cn } from '@/lib/utils'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

type Props = {
  className?: string
} & HeroBlockProps

export const HeroBlock: React.FC<Props> = ({
  className,
  eyebrow,
  headline,
  subtitle,
  cta,
  credibilityStats,
  heroImage,
}) => {
  const { beforeText, animativeWords, afterText } = headline ?? {}
  const { primaryCta, secondaryCta } = cta ?? {}
  const hasImage = heroImage && typeof heroImage === 'object'

  return (
    <section className={cn('relative overflow-hidden bg-navy px-6 py-25', className)}>
      {/* Decorative subtle grid */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-[0.06]"
        aria-hidden
      >
        <svg viewBox="0 0 600 600" className="h-full w-full" fill="none">
          {Array.from({ length: 6 }).map((_, r) =>
            Array.from({ length: 6 }).map((_, c) => (
              <rect
                key={`${r}-${c}`}
                x={c * 100}
                y={r * 100}
                width="96"
                height="96"
                rx="4"
                stroke="#378ADD"
                strokeWidth="1"
              />
            )),
          )}
        </svg>
      </div>

      <div
        className="relative mx-auto grid items-center gap-16"
        style={{
          maxWidth: '1160px',
          gridTemplateColumns: hasImage ? '1fr 480px' : '1fr',
        }}
      >
        {/* ── Left: content ── */}
        <div>
          {/* Eyebrow badge */}
          {eyebrow && (
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-navy-light/35 px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-navy-light" />
              <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-navy-light">
                {eyebrow}
              </span>
            </div>
          )}

          {/* Headline */}
          {(beforeText || animativeWords?.length || afterText) && (
            <h1 className="mb-6 font-heading text-[52px] leading-[1.1] tracking-[-0.5px] text-white">
              {beforeText && (
                <>
                  {beforeText}
                  <br />
                </>
              )}
              {animativeWords?.map((w, i) => (
                <React.Fragment key={w.id ?? i}>
                  <em className="text-navy-light">{w.word}</em>
                  {i < animativeWords.length - 1 && <br />}
                </React.Fragment>
              ))}
              {afterText && (
                <>
                  <br />
                  {afterText}
                </>
              )}
            </h1>
          )}

          {/* Subtitle */}
          {subtitle && (
            <RichText
              data={subtitle}
              enableGutter={false}
              enableProse={false}
              className="mb-10 max-w-130 text-[17px] leading-[1.75] text-white/70"
            />
          )}

          {/* CTA buttons */}
          {(primaryCta?.enabled || secondaryCta?.enabled) && (
            <div className="flex flex-wrap items-center gap-3">
              {primaryCta?.enabled && primaryCta.link?.label && (
                <CMSLink
                  {...primaryCta.link}
                  appearance="default"
                  className="h-auto px-7 py-3.5 text-[15px]"
                />
              )}
              {secondaryCta?.enabled && secondaryCta.link?.label && (
                <CMSLink
                  {...secondaryCta.link}
                  appearance="inline"
                  className="inline-flex items-center justify-center rounded-md border border-white/25 px-7 py-3.5 text-[15px] font-medium text-white/85 transition-all hover:border-white/60 hover:text-white"
                />
              )}
            </div>
          )}

          {/* Credibility stats */}
          {credibilityStats?.enabled && !!credibilityStats.stats?.length && (
            <div className="mt-14 flex border-t border-white/10 pt-10">
              {credibilityStats.stats.map((stat, i) => (
                <div key={stat.id ?? i} className="flex-1 pr-6">
                  <div className="font-heading text-[32px] leading-none text-white">
                    {stat.number}
                    {stat.suffix}
                  </div>
                  <div className="mt-1.5 text-[13px] leading-snug text-white/55">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Right: hero image ── */}
        {hasImage && (
          <div className="relative h-130 overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10">
            <Media resource={heroImage} fill htmlElement={null} imgClassName="object-cover" />
          </div>
        )}
      </div>
    </section>
  )
}
