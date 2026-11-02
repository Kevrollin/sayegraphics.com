import { useEffect, useState } from 'react'

/** True once the page has scrolled past `threshold` pixels. */
export function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > threshold)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [threshold])
  return scrolled
}

/** Id of the section currently crossing the middle of the viewport. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0] ?? '')
  const key = ids.join('|')

  useEffect(() => {
    const sections = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: '-42% 0px -52% 0px' },
    )
    for (const section of sections) observer.observe(section)
    return () => observer.disconnect()
  }, [key])

  return active
}

/** Locks page scrolling while `locked` is true (menus, dialogs). */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const root = document.documentElement
    const previous = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = previous
    }
  }, [locked])
}
