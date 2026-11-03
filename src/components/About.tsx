import { ArrowUpRight } from 'lucide-react'
import type { CSSProperties } from 'react'
import { business } from '../data/business'
import { aboutImage, productionVideos } from '../data/media'
import { mapsDirectionsHref, telHref, whatsappChatHref } from '../lib/links'
import { LoopVideo } from './ui/LoopVideo'
import { ResponsivePhoto } from './ui/ResponsivePhoto'
import { SectionHeading } from './ui/SectionHeading'

const linkClasses =
  'font-bold text-ink underline decoration-ink/20 underline-offset-4 transition-colors hover:decoration-ink'

export function About() {
  const { address, phone, founded } = business

  return (
    <section id="about" aria-labelledby="about-title" className="render-on-approach py-20 md:py-28 lg:py-32">
      <div className="container-page grid items-center gap-16 lg:grid-cols-12 lg:gap-16 xl:gap-24">
        <div className="relative lg:col-span-5" data-reveal>
          <div className="photo-frame aspect-[3/4] max-lg:max-h-[34rem] max-lg:w-full sm:max-lg:aspect-[4/3]">
            <ResponsivePhoto
              image={aboutImage}
              sizes="(min-width: 86rem) 30rem, (min-width: 64rem) 36vw, calc(100vw - 2.5rem)"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          {/* Overlaps the photo's lower edge on small screens; floats over the corner on desktop. */}
          <a
            href={mapsDirectionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative z-10 mr-4 -mt-8 ml-auto block w-[15.5rem] bg-accent p-5 text-white transition-colors hover:bg-accent-deep sm:mr-8 sm:-mt-14 sm:w-[17.5rem] sm:p-6 lg:absolute lg:-right-8 lg:-bottom-8 lg:m-0"
          >
            <span className="block text-[0.6875rem] font-bold tracking-[0.16em] text-white/80 uppercase">Find us</span>
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

        <div className="lg:col-span-7 lg:pl-6">
          <SectionHeading id="about-title" index="03" label="About" title="Creativity Meets Quality." stacked />
          <div className="mt-8 max-w-xl space-y-5 text-lede text-pretty text-muted" data-reveal>
            <p>
              Saye Graphics has been designing and producing branding materials since {founded}. We work with
              startups, small and medium businesses, corporate companies and NGOs, and with individuals planning
              something special.
            </p>
            <p>
              Our aim is simple: exceptional quality and creative work that makes your brand stand out. Quality,
              customer satisfaction, professionalism, transparency and trust are the values we work by.
            </p>
          </div>

          <dl className="mt-10 grid max-w-xl border-t border-line xs:grid-cols-2" data-reveal>
            <div className="border-b border-line py-5 xs:pr-6">
              <dt className="text-xs font-bold tracking-[0.14em] text-muted uppercase">Established</dt>
              <dd className="mt-1.5 font-bold">{founded}</dd>
            </div>
            <div className="border-b border-line py-5 xs:border-l xs:pl-6">
              <dt className="text-xs font-bold tracking-[0.14em] text-muted uppercase">Based in</dt>
              <dd className="mt-1.5 font-bold">
                {address.locality}, {address.country}
              </dd>
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

      <div className="container-page mt-20 md:mt-28">
        <div className="flex flex-col gap-3 border-t border-line pt-10 md:flex-row md:items-end md:justify-between md:gap-10" data-reveal>
          <h3 className="text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">In the workshop</h3>
          <p className="max-w-md leading-relaxed text-pretty text-muted">
            Short clips from real jobs: printing, embroidery, sign-making and installation.
          </p>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-4 lg:grid-cols-4 lg:gap-x-5">
          {productionVideos.map((video, index) => (
            <li key={video.id} data-reveal style={{ '--reveal-delay': `${(index % 4) * 70}ms` } as CSSProperties}>
              <LoopVideo video={video} className="aspect-[3/4]" />
              <p className="mt-3 text-[0.9375rem] font-bold tracking-[-0.01em]">{video.title}</p>
              <p className="mt-0.5 text-sm leading-snug text-pretty text-muted max-sm:hidden">{video.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
