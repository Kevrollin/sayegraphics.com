import { ArrowUpRight, Clock, MapPin, MessageCircle, Phone, type LucideIcon } from 'lucide-react'
import { business } from '../data/business'
import { mapsDirectionsHref, streetAddress, telHref, whatsappChatHref } from '../lib/links'
import { QuoteForm } from './QuoteForm'
import { SectionHeading } from './ui/SectionHeading'

interface ContactMethodProps {
  href: string
  icon: LucideIcon
  label: string
  value: string
  action: string
  external?: boolean
  highlight?: boolean
}

function ContactMethod({ href, icon: Icon, label, value, action, external, highlight }: ContactMethodProps) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="group flex items-center gap-4 py-5 sm:gap-5"
      >
        <span
          className={`grid size-12 shrink-0 place-items-center rounded-full transition-colors ${
            highlight
              ? 'bg-accent text-white group-hover:bg-accent-deep'
              : 'border border-ink/15 text-ink group-hover:border-ink group-hover:bg-ink group-hover:text-paper'
          }`}
        >
          <Icon aria-hidden="true" className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-bold tracking-[0.14em] text-muted uppercase">{label}</span>
          <span className="mt-1 block text-lg leading-snug font-bold tracking-[-0.02em] break-words">{value}</span>
        </span>
        <span className="hidden items-center gap-1 text-sm font-bold whitespace-nowrap text-ink sm:inline-flex">
          {action}
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
        <ArrowUpRight aria-hidden="true" className="size-5 shrink-0 text-muted sm:hidden" />
        {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
      </a>
    </li>
  )
}

export function Contact() {
  const { phone, openingHours } = business

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-20 md:py-28 lg:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16 xl:gap-20">
        <div className="lg:col-span-5">
          <SectionHeading
            id="contact-title"
            index="05"
            label="Contact"
            title="Have a Project in Mind?"
            intro="Tell us what you need. Let's bring your idea to life."
            stacked
          />

          <ul className="mt-10 divide-y divide-line border-y border-line" data-reveal>
            <ContactMethod
              href={whatsappChatHref}
              icon={MessageCircle}
              label="WhatsApp"
              value="Chat with us"
              action="Open chat"
              external
              highlight
            />
            <ContactMethod href={telHref} icon={Phone} label="Call" value={phone.display} action="Call now" />
            <ContactMethod
              href={mapsDirectionsHref}
              icon={MapPin}
              label="Visit"
              value={streetAddress}
              action="Directions"
              external
            />
          </ul>

          {openingHours ? (
            <p className="mt-6 flex items-center gap-2.5 text-sm text-muted">
              <Clock aria-hidden="true" className="size-4 text-subtle" />
              {openingHours.display}
            </p>
          ) : null}
        </div>

        <div className="lg:col-span-7" data-reveal>
          <QuoteForm />
        </div>
      </div>
    </section>
  )
}
