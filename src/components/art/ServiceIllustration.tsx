import type { ComponentType } from 'react'
import type { ServiceId } from '../../data/services'
import { garmentOutlines } from './garments'
import { MonogramGlyphs } from './Monogram'

/*
 * Small line illustrations for the service cards, drawn on a 240 x 150
 * canvas. Strokes stay 1.6px wide however the shapes are scaled.
 */

const line = { strokeWidth: 1.6, vectorEffect: 'non-scaling-stroke' as const }

function GraphicDesign() {
  return (
    <>
      <path d="M44 112C78 24 150 134 196 42" {...line} fill="none" strokeLinecap="round" className="stroke-ink" />
      <path d="M44 112L78 24M196 42L150 134" {...line} fill="none" className="stroke-subtle" />
      <g {...line} className="fill-paper-raised stroke-accent">
        <circle cx="78" cy="24" r="4" />
        <circle cx="150" cy="134" r="4" />
      </g>
      <g className="fill-accent">
        <rect x="39.5" y="107.5" width="9" height="9" />
        <rect x="191.5" y="37.5" width="9" height="9" />
      </g>
    </>
  )
}

function Branding() {
  return (
    <>
      <g {...line} fill="none" className="stroke-line-strong">
        <path d="M120 8V142M38 75H202" />
        <circle cx="120" cy="75" r="50" />
        <rect x="70" y="25" width="100" height="100" />
        <path d="M70 25L170 125M170 25L70 125" />
      </g>
      <svg x="93" y="48" width="54" height="54" viewBox="0 0 48 48">
        <rect width="48" height="48" rx="11" className="fill-ink" />
        <MonogramGlyphs stroke="stroke-paper" />
      </svg>
      <g className="fill-accent">
        <rect x="167" y="72" width="6" height="6" />
        <rect x="67" y="72" width="6" height="6" />
        <rect x="117" y="22" width="6" height="6" />
      </g>
    </>
  )
}

function TShirt() {
  const { tee } = garmentOutlines
  return (
    <svg x="62" y="12" width="116" height="126" viewBox={tee.viewBox}>
      <path d={tee.d} {...line} strokeLinejoin="round" className="fill-paper-raised stroke-ink" />
      <path d={tee.collar} {...line} fill="none" className="stroke-ink" />
      <rect x="178" y="128" width="144" height="170" {...line} fill="none" strokeDasharray="4 3" className="stroke-accent" />
      <rect x="208" y="166" width="84" height="84" className="fill-accent" />
    </svg>
  )
}

function HoodieOutline() {
  const { hoodie } = garmentOutlines
  return (
    <svg x="60" y="8" width="120" height="134" viewBox={hoodie.viewBox}>
      <path d={hoodie.hood} {...line} className="fill-paper-raised stroke-ink" />
      <path d={hoodie.body} {...line} strokeLinejoin="round" className="fill-paper-raised stroke-ink" />
      <path d={hoodie.front} {...line} className="fill-paper-raised stroke-ink" />
      <path d={hoodie.lining} {...line} className="fill-ink/10 stroke-ink" />
      <rect x="190" y="246" width="140" height="96" {...line} fill="none" strokeDasharray="4 3" className="stroke-accent" />
      <circle cx="260" cy="294" r="34" className="fill-accent" />
    </svg>
  )
}

const ILLUSTRATIONS: Record<ServiceId, ComponentType> = {
  'graphic-design': GraphicDesign,
  branding: Branding,
  'tshirt-printing': TShirt,
  'hoodie-printing': HoodieOutline,
}

export function ServiceIllustration({ id, className }: { id: ServiceId; className?: string }) {
  const Illustration = ILLUSTRATIONS[id]
  return (
    <svg viewBox="0 0 240 150" className={className} aria-hidden="true" focusable="false">
      <Illustration />
    </svg>
  )
}
