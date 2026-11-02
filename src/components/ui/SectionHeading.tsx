import type { CSSProperties, ReactNode } from 'react'

interface SectionHeadingProps {
  id: string
  index: string
  label: string
  title: ReactNode
  intro?: ReactNode
  /** Light text for dark sections. */
  onInk?: boolean
  /** Stack the intro under the title instead of beside it. */
  stacked?: boolean
}

export function SectionHeading({ id, index, label, title, intro, onInk, stacked }: SectionHeadingProps) {
  const muted = onInk ? 'text-on-ink-muted' : 'text-muted'
  return (
    <div className={stacked ? '' : 'grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10'}>
      <div className={stacked ? '' : 'lg:col-span-7'} data-reveal>
        <p className={`eyebrow ${muted}`}>
          <span className={onInk ? 'text-accent-light' : 'text-accent'}>{index}</span>
          <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" />
          {label}
        </p>
        <h2 id={id} className="mt-5 text-display text-balance">
          {title}
        </h2>
      </div>
      {intro ? (
        <p
          className={`text-lede text-pretty ${muted} ${stacked ? 'mt-6 max-w-xl' : 'max-w-xl lg:col-span-5 lg:pb-1.5'}`}
          data-reveal
          style={{ '--reveal-delay': '80ms' } as CSSProperties}
        >
          {intro}
        </p>
      ) : null}
    </div>
  )
}
