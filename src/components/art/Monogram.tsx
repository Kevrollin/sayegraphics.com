/*
 * Temporary "SG" monogram, drawn as geometric strokes on a 48-unit grid.
 * It stands in for the official Saye Graphics logo until the owner supplies
 * it (see business.logo). The same paths are used in public/favicon.svg.
 */

export const MONOGRAM_PATHS = {
  s: 'M15.48 17.1A4.6 4.6 0 1 0 11.5 24A4.6 4.6 0 1 1 7.52 30.9',
  g: 'M38.4 17.5A9.2 9.2 0 1 0 41.1 24H32.5',
}

interface GlyphProps {
  /** Tailwind stroke class for the letters. */
  stroke?: string
  strokeWidth?: number
}

/** The letters only, for placing inside other artwork (48 x 48 units). */
export function MonogramGlyphs({ stroke = 'stroke-paper', strokeWidth = 4 }: GlyphProps) {
  return (
    <g fill="none" strokeWidth={strokeWidth} className={stroke}>
      <path d={MONOGRAM_PATHS.s} />
      <path d={MONOGRAM_PATHS.g} />
    </g>
  )
}

interface MonogramProps {
  className?: string
  /** Chip background fill class. */
  fill?: string
  stroke?: string
}

/** The monogram on its rounded square chip. */
export function Monogram({ className, fill = 'fill-ink', stroke = 'stroke-paper' }: MonogramProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <rect width="48" height="48" rx="11" className={fill} />
      <MonogramGlyphs stroke={stroke} />
    </svg>
  )
}
