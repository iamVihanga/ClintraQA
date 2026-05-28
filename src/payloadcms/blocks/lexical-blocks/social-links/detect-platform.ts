export type Platform =
  | 'linkedin'
  | 'twitter'
  | 'facebook'
  | 'instagram'
  | 'youtube'
  | 'github'
  | 'tiktok'
  | 'pinterest'
  | 'whatsapp'
  | 'default'

const DOMAIN_MAP: Record<string, Platform> = {
  'linkedin.com': 'linkedin',
  'twitter.com': 'twitter',
  'x.com': 'twitter',
  'facebook.com': 'facebook',
  'fb.com': 'facebook',
  'instagram.com': 'instagram',
  'youtube.com': 'youtube',
  'youtu.be': 'youtube',
  'github.com': 'github',
  'tiktok.com': 'tiktok',
  'pinterest.com': 'pinterest',
  'pinterest.co.uk': 'pinterest',
  'wa.me': 'whatsapp',
  'whatsapp.com': 'whatsapp',
}

const LABEL_KEYWORDS: Record<Exclude<Platform, 'default'>, string[]> = {
  linkedin: ['linkedin'],
  twitter: ['twitter', 'x twitter'],
  facebook: ['facebook'],
  instagram: ['instagram'],
  youtube: ['youtube'],
  github: ['github'],
  tiktok: ['tiktok', 'tik tok'],
  pinterest: ['pinterest'],
  whatsapp: ['whatsapp'],
}

export function detectPlatform(url: string | null | undefined, label: string): Platform {
  // 1. Try URL hostname — most reliable
  if (url) {
    try {
      const hostname = new URL(url).hostname.replace(/^www\./, '').toLowerCase()
      if (hostname in DOMAIN_MAP) {
        return DOMAIN_MAP[hostname]
      }
    } catch {
      // invalid URL — fall through to label matching
    }
  }

  // 2. Fall back to label keyword matching
  const labelLower = label.toLowerCase()
  for (const [platform, keywords] of Object.entries(LABEL_KEYWORDS)) {
    if (keywords.some((kw) => labelLower.includes(kw))) {
      return platform as Platform
    }
  }

  return 'default'
}
