import { ArrowUpRight } from 'lucide-react'
import type { CSSProperties } from 'react'
import { useQuote } from '../context/QuoteContext'
import { services } from '../data/services'
import { whatsappChatHref } from '../lib/links'
import { keepHyphens } from '../lib/text'
import { ResponsivePhoto } from './ui/ResponsivePhoto'
import { SectionHeading } from './ui/SectionHeading'

export function Services() {
  const { requestService } = useQuote()

  return (
    <section id="services" aria-labelledby="services-title" className="render-on-approach border-t border-line py-20 md:py-28 lg:py-32">
      <div className="container-page">
        <SectionHeading
          id="services-title"
          index="01"
          label="Services"
          title="What We Do"
          intro="From a business card to a full shopfront: designed, produced and installed for you."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 lg:gap-5">
          {services.map((service, index) => (
            <li
              key={service.id}
              data-reveal
              style={{ '--reveal-delay': `${(index % 3) * 70}ms` } as CSSProperties}
            >
              <article className="group relative flex h-full flex-col border border-line bg-paper-raised transition-colors duration-300 hover:border-ink/30">
                <div className="photo-frame aspect-[4/3] border-b border-line">
                  <ResponsivePhoto
                    image={service.image}
                    sizes="(min-width: 86rem) 25rem, (min-width: 64rem) 30vw, (min-width: 40rem) 46vw, calc(100vw - 2.5rem)"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out-quint group-hover:scale-[1.04]"
                  />
                  <span className="absolute top-4 left-4 grid h-7 min-w-9 place-items-center rounded-full bg-paper-raised/90 px-2 text-xs font-bold tracking-[0.1em] text-bronze">
                    0{index + 1}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-7">
                  <h3 className="text-xl leading-snug font-extrabold tracking-[-0.025em]">{service.title}</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-pretty text-muted">
                    {keepHyphens(service.summary)}
                  </p>
                  <a
                    href="#contact"
                    onClick={() => requestService(service.title)}
                    className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-bold text-ink after:absolute after:inset-0 after:content-['']"
                  >
                    <span className="underline decoration-accent decoration-2 underline-offset-[6px]">Enquire</span>
                    <span className="sr-only"> about {service.title}</span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 text-accent transition-transform duration-300 ease-out-quint group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-[0.9375rem] text-muted" data-reveal>
          Need something else designed or printed?{' '}
          <a
            href={whatsappChatHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-ink"
          >
            Ask us on WhatsApp
          </a>
          .
        </p>
      </div>
    </section>
  )
}
