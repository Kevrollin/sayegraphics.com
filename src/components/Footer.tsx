import { ArrowUp, MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { business } from '../data/business'
import { navigation } from '../data/navigation'
import { mapsDirectionsHref, streetAddress, telHref, whatsappChatHref } from '../lib/links'
import { keepHyphens } from '../lib/text'
import { Logo } from './brand/Logo'
import { buttonClasses } from './ui/button'

const linkClasses = 'inline-block py-1 text-on-ink-muted transition-colors hover:text-paper'

export function Footer() {
  // The build year is prerendered; the visitor's current year replaces it after load.
  const [year, setYear] = useState(__BUILD_YEAR__)
  useEffect(() => setYear(new Date().getFullYear()), [])

  return (
    <footer className="render-on-approach on-ink bg-ink text-paper">
      <div className="container-page pt-16 pb-10 md:pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6 lg:col-span-5">
            <Logo tone="light" className="h-20 w-auto" />
            <p className="mt-4 text-sm font-bold tracking-[0.02em] text-bronze-light">{business.tagline}</p>
            <p className="mt-5 max-w-sm leading-relaxed text-on-ink-muted">{keepHyphens(business.description)}</p>
            <a
              href={whatsappChatHref}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses('primary', 'md', 'mt-8')}
            >
              <MessageCircle aria-hidden="true" className="size-[1.1em]" />
              Chat on WhatsApp
            </a>
          </div>

          <nav aria-label="Footer" className="md:col-span-3 lg:col-span-3 lg:col-start-7">
            <h2 className="text-xs font-bold tracking-[0.16em] text-on-ink-muted uppercase">Explore</h2>
            <ul className="mt-4 space-y-1.5">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className={linkClasses}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3 lg:col-span-3">
            <h2 className="text-xs font-bold tracking-[0.16em] text-on-ink-muted uppercase">Contact</h2>
            <ul className="mt-4 space-y-1.5">
              <li>
                <a href={whatsappChatHref} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={telHref} className={`${linkClasses} whitespace-nowrap`}>
                  {business.phone.display}
                </a>
              </li>
              <li>
                <a href={mapsDirectionsHref} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                  {streetAddress}
                </a>
              </li>
              {business.social.map((profile) => (
                <li key={profile.url}>
                  <a href={profile.url} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                    {profile.platform}
                    <span className="sr-only"> {profile.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ink-line pt-8 text-sm text-on-ink-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {business.name}. All rights reserved.
          </p>
          <a
            href="#home"
            className="inline-flex items-center gap-2 self-start py-1 font-semibold text-on-ink-muted transition-colors hover:text-paper"
          >
            Back to top
            <ArrowUp aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
