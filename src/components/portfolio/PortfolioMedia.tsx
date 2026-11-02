import type { PortfolioItem } from '../../data/portfolio'
import { ConceptArt } from '../art/ConceptArt'

export const toneClasses: Record<PortfolioItem['tone'], string> = {
  accent: 'bg-accent',
  sand: 'bg-sand',
  paper: 'bg-paper-deep',
  ink: 'bg-ink-raised',
  cream: 'bg-[#efe6d6]',
}

interface PortfolioMediaProps {
  item: PortfolioItem
  className?: string
  /** Lazy-load photos that start below the fold. */
  lazy?: boolean
  sizes?: string
}

/** A real project photo when one exists, otherwise the concept illustration. */
export function PortfolioMedia({ item, className = '', lazy = true, sizes }: PortfolioMediaProps) {
  if (item.image) {
    return (
      <img
        src={item.image.src}
        srcSet={item.image.srcSet}
        sizes={sizes}
        width={item.image.width}
        height={item.image.height}
        alt={item.alt}
        loading={lazy ? 'lazy' : 'eager'}
        decoding="async"
        className={`object-cover ${className}`}
      />
    )
  }
  if (item.art) return <ConceptArt id={item.art} label={item.alt} className={className} />
  return null
}

export function ConceptTag({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-ink/85 px-3 py-1.5 text-[0.6875rem] leading-none font-bold tracking-[0.12em] text-paper uppercase ${className}`}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-light" />
      Concept
    </span>
  )
}
