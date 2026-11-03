import { business } from '../../data/business'
import { brandLockup, brandLockupLight } from '../../data/media'

interface LogoProps {
  /** "dark" for light backgrounds, "light" for dark backgrounds. */
  tone?: 'dark' | 'light'
  className?: string
}

/**
 * The official Saye Graphics logo: emblem and wordmark, converted to SVG from
 * the supplied artwork. The full-colour version sits on light backgrounds; on
 * dark ones a single-colour paper version keeps it legible.
 */
export function Logo({ tone = 'dark', className = 'h-12 w-auto' }: LogoProps) {
  const logo = tone === 'dark' ? brandLockup : brandLockupLight
  return (
    <img
      src={logo.src}
      width={logo.width}
      height={logo.height}
      alt={business.name}
      // The light version is only used in the footer, far below the fold.
      loading={tone === 'light' ? 'lazy' : undefined}
      className={className}
    />
  )
}
