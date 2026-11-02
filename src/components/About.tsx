import { ArrowUpRight } from 'lucide-react'
import { business } from '../data/business'
import { mapsDirectionsHref, telHref, whatsappChatHref } from '../lib/links'
import { ProofSheet } from './art/ProofSheet'
import { SectionHeading } from './ui/SectionHeading'

const linkClasses =
  'font-bold text-ink underline decoration-ink/20 underline-offset-4 transition-colors hover:decoration-ink'

export function About() {
  const { address, phone } = business

  return (
    <section id="about" aria-labelledby="about-title" className="py-20 md:py-28 lg:py-32">
      <div className="container-page grid items-center gap-16 lg:grid-cols-12 lg:gap-16 xl:gap-24">
        <div className="relative lg:col-span-6" data-reveal>
          <div className="bg-ink px-6 py-8 sm:px-14 sm:py-14">
            <ProofSheet className="mx-auto block h-auto w-full max-w-[25rem]" />
          </div>
          {/* Overlaps only the panel's dark margin on small screens; floats over the corner on desktop. */}
          <a
            href={mapsDirectionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative z-10 mr-4 -mt-8 ml-auto block w-[15.5rem] bg-accent p-5 text-white transition-colors hover:bg-accent-deep sm:mr-8 sm:-mt-14 sm:w-[17.5rem] sm:p-6 lg:absolute lg:right-8 lg:-bottom-8 lg:m-0"
          >
            <span className="block text-[0.6875rem] font-bold tracking-[0.16em] text-white/75 uppercase">Find us</span>
            <span className="mt-2 block text-lg leading-snug font-extrabold tracking-[-0.02em]">{address.street}</span>
            <span className="mt-0.5 block text-sm text-white/85">
              {address.locality}, {address.country}
            </span>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold">
              Get directions
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
            <span className="sr-only"> (opens Google Maps)</span>
          </a>
        </div>

        <div className="lg:col-span-6">
          <SectionHeading id="about-title" index="03" label="About" title="Creativity Meets Quality." stacked />
          <div className="mt-8 max-w-xl space-y-5 text-lede text-pretty text-muted" data-reveal>
            <p>
              Saye Graphics is a design and print studio in Nakuru. We help businesses, teams and individuals turn
              their ideas into professionally presented work, from a new logo to custom{' '}
              <span className="whitespace-nowrap">T-shirts</span> and hoodies.
            </p>
            <p>
              We care about the details that make work look right: clean artwork, colours chosen with print in mind,
              and a finish you will be proud to wear or hand out.
            </p>
          </div>

          <dl className="mt-10 grid max-w-xl border-t border-line xs:grid-cols-2" data-reveal>
            <div className="border-b border-line py-5 xs:pr-6">
              <dt className="text-xs font-bold tracking-[0.14em] text-muted uppercase">Based in</dt>
              <dd className="mt-1.5 font-bold">
                {address.locality}, {address.country}
              </dd>
            </div>
            <div className="border-b border-line py-5 xs:border-l xs:pl-6">
              <dt className="text-xs font-bold tracking-[0.14em] text-muted uppercase">Focus</dt>
              <dd className="mt-1.5 font-bold">Design, branding &amp; apparel printing</dd>
            </div>
            <div className="border-b border-line py-5 xs:pr-6">
              <dt className="text-xs font-bold tracking-[0.14em] text-muted uppercase">Visit</dt>
              <dd className="mt-1.5">
                <a href={mapsDirectionsHref} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                  {address.street}
                  <span className="sr-only"> (opens Google Maps)</span>
                </a>
              </dd>
            </div>
            <div className="border-b border-line py-5 xs:border-l xs:pl-6">
              <dt className="text-xs font-bold tracking-[0.14em] text-muted uppercase">Talk to us</dt>
              <dd className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
                <a href={whatsappChatHref} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                  WhatsApp
                </a>
                <span aria-hidden="true" className="text-subtle">
                  /
                </span>
                <a href={telHref} className={linkClasses}>
                  {phone.display}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
