import { useId } from 'react'
import { MonogramGlyphs } from './Monogram'

/*
 * Print artwork for the garment mockups. Each print is a self-contained <svg>
 * that scales into a garment's print area. All of it is concept artwork drawn
 * for the demo.
 */

/** useId() output made safe for SVG id / href references. */
export function useSvgId(prefix: string) {
  return `${prefix}-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
}

/* ------------------------------------------------------------------------ */
/* Circular studio badge (hero hoodie)                                      */
/* ------------------------------------------------------------------------ */

export function BadgePrint({ ink = 'fill-paper', line = 'stroke-paper' }: { ink?: string; line?: string }) {
  const id = useSvgId('badge')
  const r = 45
  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%" overflow="visible">
      <defs>
        <path id={id} d={`M${60 - r} 60a${r} ${r} 0 1 1 ${2 * r} 0a${r} ${r} 0 1 1 ${-2 * r} 0`} />
      </defs>
      <text className={ink} fontSize="9" fontWeight="800" letterSpacing="0.9">
        <textPath href={`#${id}`} textLength={Math.round(2 * Math.PI * r - 6)} lengthAdjust="spacing">
          SAYE GRAPHICS • DESIGN &amp; PRINT • NAKURU •
        </textPath>
      </text>
      <circle cx="60" cy="60" r="33" fill="none" className={line} strokeWidth="1.5" />
      <svg x="38" y="38" width="44" height="44" viewBox="0 0 48 48">
        <MonogramGlyphs stroke={line} strokeWidth={4.2} />
      </svg>
    </svg>
  )
}

/* ------------------------------------------------------------------------ */
/* Contour lines (Rift Valley topography, stylised)                         */
/* ------------------------------------------------------------------------ */

type Point = [number, number]

const round = (n: number) => Math.round(n * 10) / 10

/** Closed Catmull-Rom spline through the points, as cubic Béziers. */
function smoothClosedPath(points: Point[]) {
  const n = points.length
  let d = `M${round(points[0][0])} ${round(points[0][1])}`
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n]
    const p1 = points[i]
    const p2 = points[(i + 1) % n]
    const p3 = points[(i + 2) % n]
    const c1: Point = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2: Point = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += `C${round(c1[0])} ${round(c1[1])} ${round(c2[0])} ${round(c2[1])} ${round(p2[0])} ${round(p2[1])}`
  }
  return `${d}Z`
}

/** Deterministic contour rings: identical on the server and in the browser. */
function contourRings(cx: number, cy: number, outer: number, count: number) {
  const rings: string[] = []
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1)
    const base = outer - t * (outer - 5)
    const ox = cx + Math.sin(t * 2.2) * 4
    const oy = cy + Math.cos(t * 1.8) * 3 - t * 5
    const points: Point[] = []
    const steps = 36
    for (let k = 0; k < steps; k++) {
      const a = (k / steps) * Math.PI * 2
      const wobble =
        0.085 * Math.sin(a * 3 + i * 0.22) + 0.045 * Math.sin(a * 5 - i * 0.3) + 0.06 * Math.cos(a * 2 + 1.1)
      const radius = base * (1 + wobble)
      points.push([ox + Math.cos(a) * radius, oy + Math.sin(a) * radius * 0.86])
    }
    rings.push(smoothClosedPath(points))
  }
  return rings
}

const CONTOURS = contourRings(75, 54, 50, 11)

export function ContourPrint({
  line = 'stroke-paper',
  ink = 'fill-paper',
  dot = 'fill-accent',
}: {
  line?: string
  ink?: string
  dot?: string
}) {
  const clip = useSvgId('contour')
  return (
    <svg viewBox="0 0 150 104" width="100%" height="100%" overflow="visible">
      <defs>
        <clipPath id={clip}>
          <circle cx="75" cy="52" r="47" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`} fill="none" strokeWidth="1.35" className={line}>
        {CONTOURS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <circle cx="75" cy="52" r="47" fill="none" strokeWidth="1.6" className={line} />
      <circle cx="79.5" cy="46" r="3.2" className={dot} />
      <g className={ink} fontSize="6.4" fontWeight="800" letterSpacing="1.4">
        <text transform="translate(12 52) rotate(-90)" textAnchor="middle">
          0°18′S
        </text>
        <text transform="translate(138 52) rotate(90)" textAnchor="middle">
          36°04′E
        </text>
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------------ */
/* Typographic prints                                                       */
/* ------------------------------------------------------------------------ */

export function CityTypePrint({ ink = 'fill-ink', line = 'stroke-ink', rule = 'stroke-accent' }) {
  return (
    <svg viewBox="0 0 164 220" width="100%" height="100%" overflow="visible">
      <text x="4" y="46" className={ink} fontSize="40" fontWeight="800" textLength="156" lengthAdjust="spacingAndGlyphs">
        NAKURU
      </text>
      <line x1="5" x2="159" y1="60" y2="60" className={rule} strokeWidth="3.5" />
      <text x="5" y="80" className={ink} fontSize="11" fontWeight="700" textLength="154" lengthAdjust="spacing">
        0°18′S · 36°04′E
      </text>
      <text
        x="82"
        y="166"
        textAnchor="middle"
        fontSize="74"
        fontWeight="800"
        letterSpacing="-2"
        fill="none"
        strokeWidth="1.6"
        className={line}
      >
        254
      </text>
      <text x="5" y="198" className={ink} fontSize="9" fontWeight="800" textLength="154" lengthAdjust="spacing">
        KENYA · RIFT VALLEY
      </text>
    </svg>
  )
}

export function IdeasPrint({ ink = 'fill-ink', dot = 'fill-accent' }) {
  return (
    <svg viewBox="0 0 164 220" width="100%" height="100%" overflow="visible">
      <g className={ink} fontWeight="800" letterSpacing="-1.5">
        <text x="6" y="58" fontSize="52">
          IDEAS
        </text>
        <text x="6" y="108" fontSize="52">
          TO
        </text>
        <text x="6" y="158" fontSize="52">
          LIFE
        </text>
      </g>
      <rect x="113" y="146" width="12" height="12" className={dot} />
      <text x="8" y="190" className={ink} fontSize="8.6" fontWeight="800" letterSpacing="2.2">
        SAYE GRAPHICS · NAKURU
      </text>
    </svg>
  )
}

/* ------------------------------------------------------------------------ */
/* Ziwa Coffee: a fictional brand used for the identity concepts            */
/* ------------------------------------------------------------------------ */

export const ziwa = {
  brown: 'fill-[#5a3a28]',
  brownStroke: 'stroke-[#5a3a28]',
  cream: 'fill-[#f2e7d5]',
  creamStroke: 'stroke-[#f2e7d5]',
  teal: 'fill-[#2f6b66]',
  tealStroke: 'stroke-[#2f6b66]',
}

/** Ziwa ("lake" in Swahili) mark: a cup seen from above, with ripples. 48 x 48. */
export function ZiwaMark({ fill = ziwa.brown, wave = ziwa.creamStroke }: { fill?: string; wave?: string }) {
  return (
    <g>
      <circle cx="24" cy="24" r="22" className={fill} />
      <g fill="none" strokeWidth="2.8" strokeLinecap="round" className={wave}>
        <path d="M12 20.5c4-4 8-4 12 0s8 4 12 0" />
        <path d="M12 29.5c4-4 8-4 12 0s8 4 12 0" />
      </g>
    </g>
  )
}

export function ZiwaChestPrint({ fill, wave, ink }: { fill?: string; wave?: string; ink: string }) {
  return (
    <svg viewBox="0 0 164 220" width="100%" height="100%" overflow="visible">
      <svg x="100" y="16" width="38" height="38" viewBox="0 0 48 48">
        <ZiwaMark fill={fill} wave={wave} />
      </svg>
      <text x="119" y="68" textAnchor="middle" className={ink} fontSize="8.4" fontWeight="800" letterSpacing="2">
        ZIWA
      </text>
    </svg>
  )
}
