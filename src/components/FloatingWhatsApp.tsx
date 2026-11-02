import { MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { whatsappChatHref } from '../lib/links'

/**
 * A small WhatsApp shortcut that appears once the hero has scrolled away and
 * steps aside while the contact section or footer (which have their own
 * WhatsApp links) are on screen.
 */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('home')
    const targets = [document.getElementById('contact'), document.querySelector('footer')].filter(
      (element): element is HTMLElement => element !== null,
    )
    if (!hero) return

    let pastHero = false
    const onScreen = new Set<Element>()
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0
        else if (entry.isIntersecting) onScreen.add(entry.target)
        else onScreen.delete(entry.target)
      }
      setVisible(pastHero && onScreen.size === 0)
    })
    observer.observe(hero)
    for (const target of targets) observer.observe(target)
    return () => observer.disconnect()
  }, [])

  return (
    <a
      href={whatsappChatHref}
      target="_blank"
      rel="noopener noreferrer"
      inert={!visible}
      aria-label="Chat with Saye Graphics on WhatsApp"
      className={`fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 inline-flex size-13 items-center justify-center gap-2.5 rounded-full bg-accent text-sm font-bold text-white transition-[opacity,translate,background-color] duration-300 ease-out-quint hover:bg-accent-deep sm:right-6 sm:bottom-6 sm:w-auto sm:bg-ink sm:pr-5 sm:pl-3 sm:hover:bg-ink-raised ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <span className="grid size-7 place-items-center rounded-full sm:bg-accent">
        <MessageCircle aria-hidden="true" className="size-5 sm:size-4" />
      </span>
      <span aria-hidden="true" className="max-sm:hidden">
        WhatsApp
      </span>
    </a>
  )
}
