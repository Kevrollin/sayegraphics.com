import type { CSSProperties, ReactNode } from 'react'
import { Hoodie, Tee } from './garments'
import { BadgePrint, IdeasPrint } from './prints'
import { SayeCards, Swatches } from './stationery'

/*
 * The hero "artboard": illustrated mockups laid out like a designer's flat
 * lay, with crop marks around the board. Pieces are positioned in
 * percentages, so the board scales cleanly, and the mobile layout gets its
 * own positions rather than a shrunken copy of the desktop one.
 */

interface PieceProps {
  className: string
  rotate: number
  delay: number
  children: ReactNode
}

function Piece({ className, rotate, delay, children }: PieceProps) {
  return (
    <div className={`absolute animate-settle ${className}`} style={{ '--settle-delay': `${delay}ms` } as CSSProperties}>
      <div className="art-shadow" style={{ rotate: `${rotate}deg` }}>
        {children}
      </div>
    </div>
  )
}

export function HeroArt() {
  return (
    <figure className="relative">
      <div className="crop-marks text-subtle/70">
        <div
          role="img"
          aria-label="Illustrated concept mockups: a blue printed hoodie, a white printed T-shirt, business cards and colour swatches"
          className="relative aspect-[1/0.94] overflow-hidden bg-sand sm:aspect-[1.1/1] lg:aspect-[1/1.06]"
        >
          <Piece className="top-[5%] left-[36%] w-[60%] sm:left-[38%] sm:w-[56%] lg:top-[7%] lg:left-[32%] lg:w-[66%]" rotate={-5} delay={60}>
            <Hoodie fabric="fill-accent" dark print={<BadgePrint />} className="block h-auto w-full" />
          </Piece>
          <Piece className="top-[3%] left-[3%] w-[40%] sm:w-[36%] lg:top-[4%] lg:left-[4%] lg:w-[40%]" rotate={0} delay={180}>
            <SayeCards className="block h-auto w-full" />
          </Piece>
          <Piece className="top-[40%] left-[-1%] w-[52%] sm:top-[38%] sm:w-[48%] lg:top-[47%] lg:w-[58%]" rotate={8} delay={120}>
            <Tee fabric="fill-paper-raised" print={<IdeasPrint />} className="block h-auto w-full" />
          </Piece>
          <Piece className="right-[2%] bottom-[3%] hidden w-[34%] sm:block sm:w-[30%] lg:w-[34%]" rotate={0} delay={240}>
            <Swatches className="block h-auto w-full" />
          </Piece>
        </div>
      </div>
      <figcaption className="mt-5 flex items-center gap-2.5 text-[0.6875rem] font-bold tracking-[0.16em] text-muted uppercase">
        <RegistrationMark className="size-3.5 shrink-0 text-subtle" />
        Illustrative concept mockups
      </figcaption>
    </figure>
  )
}

/** Printer's registration target. */
export function RegistrationMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="8" cy="8" r="4.4" />
        <path d="M8 0.5v15M0.5 8h15" />
      </g>
    </svg>
  )
}
