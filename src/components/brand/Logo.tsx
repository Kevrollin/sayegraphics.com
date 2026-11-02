import { business } from '../../data/business'
import { Monogram } from '../art/Monogram'

interface LogoProps {
  /** "dark" for light backgrounds, "light" for dark backgrounds. */
  tone?: 'dark' | 'light'
  className?: string
}

/**
 * Uses the official logo once business.logo is set; until then, the temporary
 * SG monogram with a typographic wordmark.
 */
export function Logo({ tone = 'dark', className = '' }: LogoProps) {
  if (business.logo) {
    return (
      <img
        src={business.logo.src}
        width={business.logo.width}
        height={business.logo.height}
        alt={business.name}
        className={`h-9 w-auto ${className}`}
      />
    )
  }

  const dark = tone === 'dark'
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Monogram
        className="size-9 shrink-0"
        fill={dark ? 'fill-ink' : 'fill-paper'}
        stroke={dark ? 'stroke-paper' : 'stroke-ink'}
      />
      <span
        className={`text-[1.0625rem] font-extrabold tracking-[-0.03em] whitespace-nowrap ${dark ? 'text-ink' : 'text-paper'}`}
      >
        {business.shortName}
      </span>
    </span>
  )
}
