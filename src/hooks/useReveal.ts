import { useEffect } from 'react'

/**
 * Gentle scroll reveals for elements marked with `data-reveal`.
 *
 * Content is never hidden before this runs: the prerendered page is fully
 * visible without JavaScript. After hydration, anything already on screen is
 * marked as revealed straight away, and only content further down the page
 * waits to ease in. Skipped entirely when the visitor prefers reduced motion.
 */
export function useReveal() {
  useEffect(() => {
    const root = document.documentElement
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !('IntersectionObserver' in window)) return

    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const fold = window.innerHeight * 0.92
    for (const element of elements) {
      if (element.getBoundingClientRect().top < fold) element.dataset.revealed = ''
    }
    root.dataset.revealReady = ''

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          ;(entry.target as HTMLElement).dataset.revealed = ''
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    )
    for (const element of elements) {
      if (!('revealed' in element.dataset)) observer.observe(element)
    }

    return () => {
      observer.disconnect()
      delete root.dataset.revealReady
    }
  }, [])
}
