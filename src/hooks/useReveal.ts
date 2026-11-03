import { useEffect } from 'react'

/**
 * Gentle scroll reveals for elements marked with `data-reveal`.
 *
 * Content is never hidden before this runs: the prerendered page is fully
 * visible without JavaScript. After hydration, an IntersectionObserver reports
 * which elements are already on screen (without forcing a layout read); those
 * are marked as revealed, and only then is anything further down hidden so it
 * can ease in when scrolled to. Skipped entirely when the visitor prefers
 * reduced motion.
 */
export function useReveal() {
  useEffect(() => {
    const root = document.documentElement
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !('IntersectionObserver' in window)) return

    let ready = false
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          ;(entry.target as HTMLElement).dataset.revealed = ''
          observer.unobserve(entry.target)
        }
        // The first batch covers every element, so on-screen ones are already marked.
        if (!ready) {
          ready = true
          root.dataset.revealReady = ''
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    )
    for (const element of document.querySelectorAll<HTMLElement>('[data-reveal]')) observer.observe(element)

    return () => {
      observer.disconnect()
      delete root.dataset.revealReady
    }
  }, [])
}
