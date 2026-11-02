import { ArrowUpRight } from 'lucide-react'
import type { CSSProperties } from 'react'
import { useQuote } from '../context/QuoteContext'
import { services } from '../data/services'
import { whatsappChatHref } from '../lib/links'
import { keepHyphens } from '../lib/text'
import { ServiceIllustration } from './art/ServiceIllustration'
import { SectionHeading } from './ui/SectionHeading'

export function Services() {
  const { requestService } = useQuote()

  return (
    <section id="services" aria-labelledby="services-title" className="border-t border-line py-20 md:py-28 lg:py-32">
      <div className="container-page">
        <SectionHeading
          id="services-title"
          index="01"
          label="Services"
          title="What We Do"
          intro="Creative solutions, thoughtfully designed and professionally produced."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-4 lg:gap-5">
          {services.map((service, index) => (
            <li
              key={service.id}
              data-reveal
              style={{ '--reveal-delay': `${index * 70}ms` } as CSSProperties}
            >
              <article className="group relative flex h-full flex-col border border-line bg-paper-raised transition-colors duration-300 hover:border-ink/30">
                <div className="relative aspect-[2/1] overflow-hidden border-b border-line bg-paper-deep sm:aspect-[16/10]">
                  <ServiceIllustration
                    id={service.id}
                    className="absolute inset-0 m-auto h-[80%] w-[80%] transition-transform duration-700 ease-out-quint group-hover:scale-[1.05]"
                  />
                  <span className="absolute top-4 left-4 text-xs font-bold tracking-[0.14em] text-muted">
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
