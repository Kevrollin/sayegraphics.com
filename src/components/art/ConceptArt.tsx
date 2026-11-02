import type { ComponentType } from 'react'
import type { ConceptArtId } from '../../data/portfolio'
import { Hoodie, Tee } from './garments'
import { CityTypePrint, ContourPrint, useSvgId, ziwa, ZiwaChestPrint, ZiwaMark } from './prints'
import { Poster, ZiwaCards, ZiwaPosts, ZiwaWordmark } from './stationery'

/*
 * Illustrated concept pieces for the portfolio. Each one is drawn on the same
 * 600 x 480 artboard so tiles and the preview can scale them consistently.
 */

function GarmentShadow({ id, strength = 0.22 }: { id: string; strength?: number }) {
  return (
    <filter id={id} x="-15%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#0b0c0e" floodOpacity={strength} />
    </filter>
  )
}

function ContourHoodieArt() {
  const shadow = useSvgId('ch')
  return (
    <>
      <defs>
        <GarmentShadow id={shadow} strength={0.3} />
      </defs>
      <g transform="rotate(-3 300 240)" filter={`url(#${shadow})`}>
        <Hoodie
          x={112}
          y={26}
          width={376}
          height={405}
          fabric="fill-ink-raised"
          dark
          print={<ContourPrint line="stroke-paper" ink="fill-paper" dot="fill-accent-light" />}
        />
      </g>
    </>
  )
}

function CityTypeTeeArt() {
  const shadow = useSvgId('ct')
  return (
    <>
      <defs>
        <GarmentShadow id={shadow} strength={0.16} />
      </defs>
      <g transform="rotate(2.5 300 240)" filter={`url(#${shadow})`}>
        <Tee x={105} y={50} width={390} height={374} fabric="fill-paper-raised" print={<CityTypePrint />} />
      </g>
    </>
  )
}

function ZiwaIdentityArt() {
  const shadow = useSvgId('zi')
  return (
    <>
      <defs>
        <filter id={shadow} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#000" floodOpacity="0.35" />
        </filter>
      </defs>
      <svg x="64" y="58" width="62" height="62" viewBox="0 0 48 48">
        <ZiwaMark fill={ziwa.cream} wave={ziwa.brownStroke} />
      </svg>
      <ZiwaWordmark x={140} y={91} ink={ziwa.cream} size={1.35} />
      <g transform="translate(14 -10) scale(1.38)">
        <ZiwaCards shadow={shadow} />
      </g>
      {[
        { y: 92, fill: ziwa.brown, label: 'ROAST' },
        { y: 168, fill: ziwa.cream, label: 'CREMA' },
        { y: 244, fill: ziwa.teal, label: 'LAKE' },
      ].map(({ y, fill, label }) => (
        <g key={label}>
          <circle cx="508" cy={y} r="26" className={fill} />
          <circle cx="508" cy={y} r="26" fill="none" strokeWidth="1.5" className="stroke-paper/25" />
          <text x="508" y={y + 44} textAnchor="middle" className="fill-paper/70" fontSize="9" fontWeight="800" letterSpacing="2">
            {label}
          </text>
        </g>
      ))}
    </>
  )
}

function IdeasPosterArt() {
  const shadow = useSvgId('ip')
  return (
    <>
      <defs>
        <GarmentShadow id={shadow} strength={0.18} />
      </defs>
      <g transform="translate(118 46) rotate(-7 142 200) scale(0.92)" filter={`url(#${shadow})`}>
        <Poster variant="dark" />
      </g>
      <g transform="translate(248 38) rotate(4 142 200) scale(0.92)" filter={`url(#${shadow})`}>
        <Poster variant="light" />
      </g>
    </>
  )
}

function ZiwaStaffTeesArt() {
  const shadow = useSvgId('zt')
  return (
    <>
      <defs>
        <GarmentShadow id={shadow} strength={0.2} />
      </defs>
      <g transform="rotate(-6 200 250)" filter={`url(#${shadow})`}>
        <Tee
          x={30}
          y={70}
          width={330}
          height={317}
          fabric={ziwa.teal}
          dark
          print={<ZiwaChestPrint fill={ziwa.cream} wave={ziwa.tealStroke} ink={ziwa.cream} />}
        />
      </g>
      <g transform="rotate(5 410 240)" filter={`url(#${shadow})`}>
        <Tee
          x={238}
          y={62}
          width={330}
          height={317}
          fabric={ziwa.brown}
          dark
          print={<ZiwaChestPrint fill={ziwa.cream} wave={ziwa.brownStroke} ink={ziwa.cream} />}
        />
      </g>
    </>
  )
}

function ZiwaSocialArt() {
  const shadow = useSvgId('zs')
  return (
    <>
      <defs>
        <filter id={shadow} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#17191c" floodOpacity="0.18" />
        </filter>
      </defs>
      <g transform="translate(26 26) scale(1.3)">
        <ZiwaPosts shadow={shadow} />
      </g>
    </>
  )
}

const ARTWORK: Record<ConceptArtId, ComponentType> = {
  'contour-hoodie': ContourHoodieArt,
  'city-type-tee': CityTypeTeeArt,
  'ziwa-identity': ZiwaIdentityArt,
  'ideas-poster': IdeasPosterArt,
  'ziwa-staff-tees': ZiwaStaffTeesArt,
  'ziwa-social': ZiwaSocialArt,
}

interface ConceptArtProps {
  id: ConceptArtId
  /** Accessible description; the artwork is announced as one image. */
  label: string
  className?: string
}

export function ConceptArt({ id, label, className }: ConceptArtProps) {
  const Artwork = ARTWORK[id]
  return (
    <svg viewBox="0 0 600 480" role="img" aria-label={label} className={className} preserveAspectRatio="xMidYMid meet">
      <Artwork />
    </svg>
  )
}
