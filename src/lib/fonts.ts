import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import { cn } from './utils'

export const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: '400',
})

export const fontClass = cn(`${dmSans.variable}  ${dmSerif.variable} font-sans antialiased`)
