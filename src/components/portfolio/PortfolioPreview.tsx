import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { useEffect, useRef, type KeyboardEvent, type MouseEvent } from 'react'
import { useQuote } from '../../context/QuoteContext'
import type { PortfolioItem } from '../../data/portfolio'
import { services } from '../../data/services'
import { useScrollLock } from '../../hooks/useScrollState'
import { keepHyphens } from '../../lib/text'
import { buttonClasses, buttonIconClasses } from '../ui/button'
import { ConceptTag, PortfolioMedia, toneClasses } from './PortfolioMedia'

interface PortfolioPreviewProps {
  items: PortfolioItem[]
  index: number | null
  onNavigate: (index: number) => void
  onClose: () => void
}

export function PortfolioPreview({ items, index, onNavigate, onClose }: PortfolioPreviewProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const restoreFocusRef = useRef(true)
  const { requestService } = useQuote()
  const open = index !== null
  const item = open ? items[index] : null

  useScrollLock(open)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      returnFocusRef.current = document.activeElement as HTMLElement | null
      restoreFocusRef.current = true
      dialog.showModal()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  const count = items.length
  const go = (step: number) => {
    if (index === null) return
    onNavigate((index + step + count) % count)
  }

  const handleClose = () => {
    onClose()
    if (restoreFocusRef.current) returnFocusRef.current?.focus()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'ArrowRight') go(1)
    if (event.key === 'ArrowLeft') go(-1)
  }

  // Clicks on the backdrop land on the <dialog> element itself.
  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) dialogRef.current.close()
  }

  const serviceTitle = item ? services.find((service) => service.id === item.serviceId)?.title : undefined

  const startSimilar = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    if (serviceTitle) requestService(serviceTitle)
    restoreFocusRef.current = false
    dialogRef.current?.close()
    requestAnimationFrame(() => {
      const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      document.getElementById('contact')?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })
      document.getElementById('quote-name')?.focus({ preventScroll: true })
    })
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="preview-title"
      onClose={handleClose}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      className="on-paper preview-dialog m-auto max-h-[calc(100dvh-1.5rem)] w-[min(76rem,calc(100%-1.5rem))] max-w-none overflow-hidden bg-paper p-0 text-ink backdrop:bg-ink/80 sm:max-h-[calc(100dvh-4rem)]"
    >
      {item ? (
        <div className="relative grid max-h-[inherit] overflow-y-auto overscroll-contain md:grid-cols-[1.4fr_1fr]">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="absolute top-3 right-3 z-10 grid size-11 place-items-center rounded-full bg-paper text-ink transition-colors hover:bg-ink hover:text-paper md:top-5 md:right-5"
            aria-label="Close preview"
          >
            <X aria-hidden="true" className="size-5" />
          </button>

          <div className={`relative aspect-[5/4] md:aspect-auto md:min-h-[min(36rem,70dvh)] ${toneClasses[item.tone]}`}>
            <PortfolioMedia item={item} lazy={false} sizes="(min-width: 768px) 60vw, 100vw" className="absolute inset-0 h-full w-full" />
            {item.kind === 'concept' ? <ConceptTag className="absolute top-4 left-4" /> : null}
          </div>

          <div className="flex flex-col p-6 sm:p-8 lg:p-10">
            <p className="eyebrow text-muted">
              <span className="text-accent">
                {String(index! + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              </span>
              <span aria-hidden="true" className="h-px w-6 bg-current opacity-40" />
              {item.category}
            </p>
            <h2 id="preview-title" className="mt-4 pr-10 text-3xl leading-[1.05] font-extrabold tracking-[-0.035em] sm:text-4xl md:pr-0">
              {item.title}
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-pretty text-muted">{keepHyphens(item.description)}</p>

            {item.kind === 'concept' ? (
              <p className="mt-6 border-l-2 border-accent pl-3.5 text-sm leading-relaxed text-muted">
                Illustrative concept mockup created for this website. It is not a client commission.
              </p>
            ) : null}

            <div className="mt-8 flex flex-col gap-6 md:mt-auto md:pt-10">
              <a href="#contact" onClick={startSimilar} className={buttonClasses('primary')}>
                Start a similar project
                <ArrowRight aria-hidden="true" className={buttonIconClasses} />
              </a>
              <div className="flex items-center justify-between border-t border-line pt-5">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="group inline-flex min-h-11 items-center gap-2 rounded-full pr-3 text-sm font-bold"
                >
                  <ArrowLeft aria-hidden="true" className="size-4 transition-transform group-hover:-translate-x-0.5" />
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="group inline-flex min-h-11 items-center gap-2 rounded-full pl-3 text-sm font-bold"
                >
                  Next
                  <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </dialog>
  )
}
