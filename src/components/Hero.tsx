import { ArrowRight, MessageCircle } from 'lucide-react'
import type { CSSProperties } from 'react'
import { business } from '../data/business'
import { heroApparel, heroCover, heroPrint } from '../data/media'
import { mapsListingHref, whatsappChatHref } from '../lib/links'
import { buttonClasses, buttonIconClasses } from './ui/button'
import { RegistrationMark } from './ui/RegistrationMark'
import { ResponsivePhoto } from './ui/ResponsivePhoto'
import { Stars } from './ui/Stars'

const photoClasses = 'absolute inset-0 h-full w-full object-cover'

export function Hero() {
  const { google, phone, founded } = business
  return (
    <section id="home" aria-labelledby="hero-title">
      <div className="container-page grid items-center gap-12 pt-8 pb-20 sm:pt-12 md:pb-24 lg:grid-cols-12 lg:gap-12 lg:pt-10 lg:pb-24 xl:gap-16">
        <div className="lg:col-span-6">
          <p className="eyebrow text-muted">
            <span aria-hidden="true" className="size-2 bg-bronze" />
            Branding, signage &amp; printing in Nakuru
          </p>
          <h1 id="hero-title" className="mt-6 text-hero text-balance sm:mt-8">
            Bring Your Ideas to Life<span className="text-bronze">.</span>
          </h1>
          <p className="mt-6 max-w-[33rem] text-lede text-pretty text-muted sm:mt-8">
            Design, signage, vehicle branding, apparel and print that make your business stand out.
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
            <span className="font-semibold text-muted">Since {founded}</span>
          </div>
        </div>

        <figure className="lg:col-span-6">
          <div className="crop-marks text-subtle/70">
            {/* Main photo across the top, two smaller jobs beneath it. */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div
                className="photo-frame animate-settle col-span-2 aspect-[3/2]"
                style={{ '--settle-delay': '40ms' } as CSSProperties}
              >
                <ResponsivePhoto
                  image={heroCover}
                  priority
                  sizes="(min-width: 86rem) 38rem, (min-width: 64rem) 44vw, calc(100vw - 2.5rem)"
                  className={photoClasses}
                />
              </div>
              <div className="photo-frame animate-settle aspect-[4/3]" style={{ '--settle-delay': '140ms' } as CSSProperties}>
                <ResponsivePhoto
                  image={heroApparel}
                  eager
                  sizes="(min-width: 86rem) 19rem, (min-width: 64rem) 22vw, calc(50vw - 1.5rem)"
                  className={photoClasses}
                />
              </div>
              <div className="photo-frame animate-settle aspect-[4/3]" style={{ '--settle-delay': '220ms' } as CSSProperties}>
                <ResponsivePhoto
                  image={heroPrint}
                  eager
                  sizes="(min-width: 86rem) 19rem, (min-width: 64rem) 22vw, calc(50vw - 1.5rem)"
                  className={photoClasses}
                />
              </div>
            </div>
          </div>
          <figcaption className="mt-5 flex items-center gap-2.5 text-[0.6875rem] font-bold tracking-[0.16em] text-muted uppercase">
            <RegistrationMark className="size-3.5 shrink-0 text-subtle" />
            Recent work: signage, embroidery, invitations
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
