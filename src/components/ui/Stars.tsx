import { Star } from 'lucide-react'

const FIVE = [0, 1, 2, 3, 4]

/** Five stars filled to the exact rating (4.9 fills 98% of the row). */
export function Stars({ rating, className = '' }: { rating: number; className?: string }) {
  const filled = `${Math.max(0, Math.min(1, rating / 5)) * 100}%`
  const row = (
    <>
      {FIVE.map((i) => (
        <Star key={i} aria-hidden="true" className="size-[1em] shrink-0" fill="currentColor" strokeWidth={0} />
      ))}
    </>
  )
  return (
    <span aria-hidden="true" className={`relative inline-flex ${className}`}>
      <span className="flex gap-[0.12em] opacity-20">{row}</span>
      <span className="absolute inset-y-0 left-0 flex gap-[0.12em] overflow-hidden" style={{ width: filled }}>
        {row}
      </span>
    </span>
  )
}
