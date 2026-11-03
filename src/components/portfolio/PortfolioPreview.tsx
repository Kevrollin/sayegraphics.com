import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react'
import { useQuote } from '../../context/QuoteContext'
import type { PortfolioItem } from '../../data/portfolio'
import { services } from '../../data/services'
import { useScrollLock } from '../../hooks/useScrollState'
import { keepHyphens } from '../../lib/text'
import { buttonClasses, buttonIconClasses } from '../ui/button'
import { ResponsivePhoto } from '../ui/ResponsivePhoto'

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

          {/* Keyed by project so the gallery starts at the cover each time. */}
          <PreviewGallery key={item.id} item={item} />

          <div className="flex flex-col p-6 sm:p-8 lg:p-10">
            <p className="eyebrow text-muted">
              <span className="text-bronze">
                {String(index! + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              </span>
              <span aria-hidden="true" className="h-px w-6 bg-current opacity-40" />
              {item.category}
            </p>
            <h2 id="preview-title" className="mt-4 pr-10 text-3xl leading-[1.05] font-extrabold tracking-[-0.035em] sm:text-4xl md:pr-0">
              {item.title}
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-pretty text-muted">{keepHyphens(item.description)}</p>

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

/** The large photo, uncropped on a dark mat, with thumbnails for the rest of the job. */
function PreviewGallery({ item }: { item: PortfolioItem }) {
  const photos = [item.cover, ...(item.gallery ?? [])]
  const [current, setCurrent] = useState(0)
  const photo = photos[current]

  return (
    <div className="flex flex-col bg-ink">
      <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[min(36rem,64dvh)] md:flex-1">
        <ResponsivePhoto
          key={photo.base}
          image={photo}
          eager
          sizes="(min-width: 76rem) 44rem, (min-width: 48rem) 58vw, calc(100vw - 1.5rem)"
          className="absolute inset-0 h-full w-full object-contain"
        />
      </div>
      {photos.length > 1 ? (
        <ul className="flex gap-2 overflow-x-auto p-3" aria-label="Photos of this project">
          {photos.map((thumb, i) => (
            <li key={thumb.base} className="shrink-0">
              <button
                type="button"
                onClick={() => setCurrent(i)}
                aria-pressed={i === current}
                aria-label={`Photo ${i + 1} of ${photos.length}: ${thumb.alt}`}
                className={`photo-frame block size-14 outline-offset-2 transition-opacity sm:size-16 ${
                  i === current ? 'opacity-100 ring-2 ring-accent-light' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <ResponsivePhoto image={thumb} alt="" eager sizes="4rem" className="absolute inset-0 h-full w-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
