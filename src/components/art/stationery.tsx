import type { ReactNode } from 'react'
import { business } from '../../data/business'
import { MonogramGlyphs } from './Monogram'
import { useSvgId, ziwa, ZiwaMark } from './prints'

/*
 * Printed stationery mockups: business cards, colour swatches, posters and
 * social posts. Cards use the 85 x 55 mm proportion (170 x 110 units).
 */

/** Soft drop shadow for stacked paper pieces. */
function ShadowFilter({ id }: { id: string }) {
  return (
    <filter id={id} x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#17191c" floodOpacity="0.16" />
    </filter>
  )
}

interface CardProps {
  x: number
  y: number
  rotate?: number
  fill: string
  filter?: string
  children?: ReactNode
}

function Card({ x, y, rotate = 0, fill, filter, children }: CardProps) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate} 85 55)`} filter={filter ? `url(#${filter})` : undefined}>
      <rect width="170" height="110" rx="4" className={fill} />
      {children}
    </g>
  )
}

/** Text-line placeholders, the way designers sketch copy on a layout. */
function Lines({ x, y, widths, gap = 7, className }: { x: number; y: number; widths: number[]; gap?: number; className: string }) {
  return (
    <g className={className}>
      {widths.map((w, i) => (
        <rect key={`${w}-${i}`} x={x} y={y + i * gap} width={w} height="2.6" rx="1.3" />
      ))}
    </g>
  )
}

/* ------------------------------------------------------------------------ */

export function SayeCards({ className }: { className?: string }) {
  const shadow = useSvgId('cards')
  return (
    <svg viewBox="0 0 270 210" className={className} aria-hidden="true" focusable="false">
      <defs>
        <ShadowFilter id={shadow} />
      </defs>
      <Card x={84} y={22} rotate={9} fill="fill-paper-raised" filter={shadow}>
        <text x="14" y="26" className="fill-ink" fontSize="11.5" fontWeight="800" letterSpacing="-0.2">
          {business.name}
        </text>
        <text x="14" y="39" className="fill-muted" fontSize="6.6" fontWeight="600">
          Design · Branding · Apparel printing
        </text>
        <rect x="14" y="52" width="16" height="2.4" className="fill-accent" />
        <text x="14" y="80" className="fill-ink" fontSize="7.4" fontWeight="700">
          {business.phone.display}
        </text>
        <text x="14" y="92" className="fill-muted" fontSize="6.6" fontWeight="600">
          {business.address.street}, {business.address.locality}
        </text>
      </Card>
      <Card x={18} y={78} rotate={-8} fill="fill-ink" filter={shadow}>
        <svg x="63" y="22" width="44" height="44" viewBox="0 0 48 48">
          <MonogramGlyphs stroke="stroke-paper" strokeWidth={4} />
        </svg>
        <text x="85" y="86" textAnchor="middle" className="fill-paper" fontSize="6.4" fontWeight="800" letterSpacing="2.4">
          SAYE GRAPHICS
        </text>
      </Card>
    </svg>
  )
}

/* ------------------------------------------------------------------------ */

const SWATCHES = [
  { fill: 'fill-ink', rotate: -16 },
  { fill: 'fill-accent', rotate: -5 },
  { fill: 'fill-sand-deep', rotate: 6 },
  { fill: 'fill-paper-raised', rotate: 17 },
]

export function Swatches({ className }: { className?: string }) {
  const shadow = useSvgId('swatch')
  return (
    <svg viewBox="0 0 240 190" className={className} aria-hidden="true" focusable="false">
      <defs>
        <ShadowFilter id={shadow} />
      </defs>
      {SWATCHES.map(({ fill, rotate }, i) => (
        <g key={fill} transform={`translate(${62 + i * 26} 36) rotate(${rotate} 28 140)`} filter={`url(#${shadow})`}>
          <rect width="56" height="128" rx="3" className="fill-paper-raised" />
          <rect x="5" y="5" width="46" height="86" rx="1.5" className={fill} />
          {fill === 'fill-paper-raised' ? (
            <rect x="5.5" y="5.5" width="45" height="85" rx="1.5" fill="none" className="stroke-line" />
          ) : null}
          <Lines x={8} y={102} widths={[26, 18]} className="fill-ink/45" />
        </g>
      ))}
    </svg>
  )
}

/* ------------------------------------------------------------------------ */

interface PosterProps {
  variant: 'light' | 'dark'
}

/** A single poster on a 300 x 424 artboard (ISO A-series proportion). */
export function Poster({ variant }: PosterProps) {
  const dark = variant === 'dark'
  const bg = dark ? 'fill-ink' : 'fill-paper-raised'
  const ink = dark ? 'fill-paper' : 'fill-ink'
  return (
    <g>
      <rect width="300" height="424" className={bg} />
      <text x="22" y="32" className={ink} fontSize="7.6" fontWeight="800" letterSpacing="2.2">
        SAYE GRAPHICS
      </text>
      <text x="278" y="32" textAnchor="end" className={ink} fontSize="7.6" fontWeight="800" letterSpacing="2.2">
        POSTER 01
      </text>
      <circle cx="196" cy="132" r="76" className={dark ? 'fill-sand' : 'fill-accent'} />
      <rect x="30" y="134" width="104" height="104" className={dark ? 'fill-accent' : 'fill-ink'} />
      <path d="M150 238a54 54 0 0 1 108 0Z" className={dark ? 'fill-paper' : 'fill-sand-deep'} />
      <g className={ink} fontSize="46" fontWeight="800" letterSpacing="-2">
        <text x="26" y="306">
          Ideas
        </text>
        <text x="26" y="350">
          take
        </text>
        <text x="26" y="394">
          shape
        </text>
      </g>
      <rect x="166" y="384" width="10" height="10" className={dark ? 'fill-sand' : 'fill-accent'} />
      <text x="278" y="404" textAnchor="end" className={ink} fontSize="7" fontWeight="700" letterSpacing="1.6" opacity="0.7">
        DESIGN · PRINT · NAKURU
      </text>
    </g>
  )
}

/* ------------------------------------------------------------------------ */
/* Ziwa Coffee (fictional brand) identity pieces                            */
/* ------------------------------------------------------------------------ */

export function ZiwaWordmark({ x, y, ink, size = 1 }: { x: number; y: number; ink: string; size?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`} className={ink}>
      <text fontSize="17" fontWeight="800" letterSpacing="3.4">
        ZIWA
      </text>
      <text y="12" fontSize="5.6" fontWeight="700" letterSpacing="2.6">
        COFFEE CO.
      </text>
    </g>
  )
}

export function ZiwaCards({ shadow }: { shadow: string }) {
  return (
    <>
      <Card x={34} y={120} rotate={-9} fill={ziwa.cream} filter={shadow}>
        <svg x="16" y="16" width="26" height="26" viewBox="0 0 48 48">
          <ZiwaMark />
        </svg>
        <ZiwaWordmark x={16} y={70} ink={ziwa.brown} />
      </Card>
      <Card x={150} y={150} rotate={7} fill={ziwa.brown} filter={shadow}>
        <svg x="61" y="20" width="48" height="48" viewBox="0 0 48 48">
          <ZiwaMark fill={ziwa.cream} wave={ziwa.brownStroke} />
        </svg>
        <text x="85" y="88" textAnchor="middle" className={ziwa.cream} fontSize="7" fontWeight="800" letterSpacing="3">
          ZIWA COFFEE CO.
        </text>
      </Card>
    </>
  )
}

/** Three square social posts for Ziwa Coffee, 150 x 150 each. */
export function ZiwaPosts({ shadow }: { shadow: string }) {
  return (
    <>
      <g transform="translate(18 64) rotate(-6 75 75)" filter={`url(#${shadow})`}>
        <rect width="150" height="150" rx="3" className={ziwa.brown} />
        <g className={ziwa.cream} fontSize="25" fontWeight="800" letterSpacing="-0.8">
          <text x="14" y="44">
            Freshly
          </text>
          <text x="14" y="72">
            roasted.
          </text>
        </g>
        <svg x="14" y="112" width="22" height="22" viewBox="0 0 48 48">
          <ZiwaMark fill={ziwa.cream} wave={ziwa.brownStroke} />
        </svg>
        <text x="42" y="127" className={ziwa.cream} fontSize="8" fontWeight="800" letterSpacing="2.4">
          ZIWA
        </text>
      </g>
      <g transform="translate(244 34) rotate(6 75 75)" filter={`url(#${shadow})`}>
        <rect width="150" height="150" rx="3" className={ziwa.teal} />
        <g className={ziwa.cream} fontSize="19" fontWeight="800" letterSpacing="-0.5">
          <text x="58" y="34">
            New on
          </text>
          <text x="58" y="56">
            the menu
          </text>
        </g>
        <g fill="none" strokeWidth="2.2" strokeLinecap="round" className="stroke-[#f2e7d5]/30">
          {[86, 100, 114, 128].map((y) => (
            <path key={y} d={`M14 ${y}c9-8 18-8 27 0s18 8 27 0 18-8 27 0 18 8 27 0`} />
          ))}
        </g>
      </g>
      <g transform="translate(136 100) rotate(1 75 75)" filter={`url(#${shadow})`}>
        <rect width="150" height="150" rx="3" className={ziwa.cream} />
        <circle cx="70" cy="72" r="46" className="fill-[#e3d3b9]" />
        <rect x="104" y="64" width="26" height="15" rx="7.5" className={ziwa.brown} />
        <circle cx="70" cy="72" r="34" className={ziwa.brown} />
        <circle cx="70" cy="72" r="27" className="fill-[#3b2519]" />
        <path d="M54 72c5-5 11-5 16 0s11 5 16 0" fill="none" strokeWidth="2.6" strokeLinecap="round" className={ziwa.creamStroke} />
        <text x="14" y="138" className={ziwa.brown} fontSize="8" fontWeight="800" letterSpacing="2.4">
          YOUR DAILY RITUAL
        </text>
      </g>
    </>
  )
}
