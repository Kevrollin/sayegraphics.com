import { ArrowRight, MessageCircle } from 'lucide-react'
import { business } from '../data/business'
import { mapsListingHref, whatsappChatHref } from '../lib/links'
import { HeroArt } from './art/HeroArt'
import { buttonClasses, buttonIconClasses } from './ui/button'
import { Stars } from './ui/Stars'

export function Hero() {
  const { google, phone } = business
  return (
    <section id="home" aria-labelledby="hero-title">
      <div className="container-page grid items-center gap-14 pt-8 pb-20 sm:pt-12 md:pb-24 lg:grid-cols-12 lg:gap-12 lg:pt-12 lg:pb-28 xl:gap-16">
        <div className="lg:col-span-6">
          <p className="eyebrow text-muted">
            <span aria-hidden="true" className="size-2 bg-accent" />
            Graphic design &amp; printing in Nakuru
          </p>
          <h1 id="hero-title" className="mt-6 text-hero text-balance sm:mt-8">
            Bring Your Ideas to Life<span className="text-accent">.</span>
          </h1>
          <p className="mt-6 max-w-[31rem] text-lede text-pretty text-muted sm:mt-8">
            Creative design, branding and printing that makes your ideas stand out.
          </p>
          <div className="mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <a href="#contact" className={buttonClasses('primary')}>
              Get a Quote
              <ArrowRight aria-hidden="true" className={buttonIconClasses} />
            </a>
            <a href="#work" className={buttonClasses('secondary')}>
              Explore Our Work
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-6 text-sm">
            {google.showRating ? (
              <a
                href={mapsListingHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 font-semibold"
              >
                <Stars rating={google.rating} className="text-[0.9375rem] text-ink" />
                <span className="underline decoration-ink/20 underline-offset-4 transition-colors group-hover:decoration-ink">
                  Rated {google.rating} on Google
                </span>
                <span className="sr-only"> (opens Google Maps)</span>
              </a>
            ) : null}
            <a
              href={whatsappChatHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-semibold"
            >
              <MessageCircle aria-hidden="true" className="size-4 text-accent" />
              <span className="underline decoration-ink/20 underline-offset-4 transition-colors group-hover:decoration-ink">
                WhatsApp {phone.display}
              </span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-6">
          <HeroArt />
        </div>
      </div>
    </section>
  )
}
