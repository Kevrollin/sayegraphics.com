import { ArrowRight, MapPin, Menu, MessageCircle, Phone, X } from 'lucide-react'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { navigation } from '../data/navigation'
import { useActiveSection, useScrolled, useScrollLock } from '../hooks/useScrollState'
import { streetAddress, telHref, whatsappChatHref } from '../lib/links'
import { Logo } from './brand/Logo'
import { buttonClasses, buttonIconClasses } from './ui/button'

const sectionIds = navigation.map((item) => item.id)

export function Navbar() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled()
  const active = useActiveSection(sectionIds)
  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useScrollLock(open)

  // Close on Escape, and when the viewport grows into the desktop layout.
  useEffect(() => {
    if (!open) return
    const desktop = window.matchMedia('(min-width: 64rem)')
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onResize = () => desktop.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onResize)
    // Wait a frame: the menu is still visibility:hidden on the commit frame.
    const frame = requestAnimationFrame(() => firstLinkRef.current?.focus())
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onResize)
    }
  }, [open])

  // Keep Tab focus inside the header while the menu is open.
  const trapFocus = (event: KeyboardEvent<HTMLElement>) => {
    if (!open || event.key !== 'Tab' || !headerRef.current) return
    const focusable = headerRef.current.querySelectorAll<HTMLElement>(
      'a[href]:not([tabindex="-1"]), button:not([disabled])',
    )
    const visible = Array.from(focusable).filter((el) => el.offsetParent !== null)
    const first = visible[0]
    const last = visible[visible.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const close = () => setOpen(false)
  const solid = scrolled || open

  return (
    <header
      ref={headerRef}
      onKeyDown={trapFocus}
      className={`sticky top-0 z-50 border-b transition-[border-color] duration-300 ${
        solid ? 'border-line' : 'border-transparent'
      }`}
    >
      {/* Background on its own layer: a backdrop-filter on the header itself
          would trap the fixed-position mobile menu inside the header box. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 transition-[background-color] duration-300 ${
          solid ? 'bg-paper/90 backdrop-blur-md' : 'bg-paper'
        }`}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-10 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-paper"
      >
        Skip to content
      </a>
      <div className="container-page flex h-16 items-center justify-between gap-6 lg:h-20">
        <a href="#home" className="-m-1 rounded-lg p-1" aria-label="Saye Graphics, back to top" onClick={close}>
          <Logo className="h-[3.125rem] w-auto lg:h-16" />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => {
              const current = active === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={current ? 'true' : undefined}
                    className={`group relative block rounded-full px-4 py-2.5 text-[0.9375rem] font-semibold transition-colors ${
                      current ? 'text-ink' : 'text-ink/65 hover:text-ink'
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-4 bottom-1 h-0.5 origin-left bg-accent transition-transform duration-300 ease-out-quint ${
                        current ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href="#contact" className={buttonClasses('primary', 'sm', 'max-xs:hidden')} onClick={close}>
            Get a Quote
            <ArrowRight aria-hidden="true" className={buttonIconClasses} />
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 grid size-12 place-items-center rounded-full text-ink transition-colors hover:bg-ink/5 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        inert={!open}
        // Visibility only transitions on close (so the fade-out stays visible);
        // on open it switches at once, so the first link can take focus.
        className={`fixed inset-x-0 top-16 bottom-0 overflow-y-auto overscroll-contain bg-paper duration-300 ease-out-quint lg:hidden ${
          open
            ? 'visible translate-y-0 opacity-100 transition-[opacity,translate]'
            : 'invisible -translate-y-3 opacity-0 transition-[opacity,translate,visibility]'
        }`}
      >
        <div className="container-page flex min-h-full flex-col pt-6 pb-8">
          <nav aria-label="Mobile">
            <ol className="border-t border-line">
              {navigation.map((item, index) => (
                <li key={item.id} className="border-b border-line">
                  <a
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={`#${item.id}`}
                    onClick={close}
                    aria-current={active === item.id ? 'true' : undefined}
                    className="flex items-baseline gap-4 py-4 text-[2rem] leading-tight font-extrabold tracking-[-0.035em] text-ink aria-[current=true]:text-accent"
                  >
                    <span className="w-6 text-xs font-bold tracking-[0.12em] text-subtle">0{index + 1}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-auto grid gap-3 pt-10">
            <a href="#contact" onClick={close} className={buttonClasses('primary')}>
              Get a Quote
              <ArrowRight aria-hidden="true" className={buttonIconClasses} />
            </a>
            <div className="grid grid-cols-2 gap-3">
              <a href={whatsappChatHref} target="_blank" rel="noopener noreferrer" className={buttonClasses('secondary')}>
                <MessageCircle aria-hidden="true" className="size-4.5" />
                WhatsApp
              </a>
              <a href={telHref} className={buttonClasses('secondary')}>
                <Phone aria-hidden="true" className="size-4.5" />
                Call
              </a>
            </div>
            <p className="mt-3 flex items-center justify-center gap-2 text-sm text-muted">
              <MapPin aria-hidden="true" className="size-4 text-subtle" />
              {streetAddress}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
