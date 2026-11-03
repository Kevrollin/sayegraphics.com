import { Images, Plus } from 'lucide-react'
import { useState, type CSSProperties } from 'react'
import { portfolio } from '../data/portfolio'
import { whatsappChatHref } from '../lib/links'
import { PortfolioPreview } from './portfolio/PortfolioPreview'
import { ResponsivePhoto } from './ui/ResponsivePhoto'
import { SectionHeading } from './ui/SectionHeading'

/*
 * Editorial grid on large screens: 7/5, 5/7, 6/6 columns. In each row the
 * "lead" tile sets the height through its aspect ratio and its neighbour
 * stretches to match, so rows always line up. Photos fill their frames with
 * object-fit: cover; the preview shows them uncropped.
 */
const LAYOUT = [
  { span: 'lg:col-span-7', tile: 'lg:aspect-[5/4]', sizes: '(min-width: 86rem) 44rem, (min-width: 64rem) 56vw' },
  { span: 'lg:col-span-5', tile: 'lg:aspect-auto lg:flex-1', sizes: '(min-width: 86rem) 31rem, (min-width: 64rem) 40vw' },
  { span: 'lg:col-span-5', tile: 'lg:aspect-auto lg:flex-1', sizes: '(min-width: 86rem) 31rem, (min-width: 64rem) 40vw' },
  { span: 'lg:col-span-7', tile: 'lg:aspect-[5/4]', sizes: '(min-width: 86rem) 44rem, (min-width: 64rem) 56vw' },
  { span: 'lg:col-span-6', tile: 'lg:aspect-[4/3]', sizes: '(min-width: 86rem) 38rem, (min-width: 64rem) 48vw' },
  { span: 'lg:col-span-6', tile: 'lg:aspect-[4/3]', sizes: '(min-width: 86rem) 38rem, (min-width: 64rem) 48vw' },
]

export function Portfolio() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="work" aria-labelledby="work-title" className="render-on-approach on-ink bg-ink py-20 text-paper md:py-28 lg:py-32">
      <div className="container-page">
        <SectionHeading
          id="work-title"
          index="02"
          label="Our Work"
          title="Made to Make an Impression."
          intro="A selection of recent jobs, from shop signs and vehicle wraps to embroidered hoodies and wedding stationery."
          onInk
        />

        <ul className="mt-12 grid gap-x-5 gap-y-10 md:mt-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-y-14">
          {portfolio.map((item, index) => {
            const layout = LAYOUT[index % LAYOUT.length]
            const photos = 1 + (item.gallery?.length ?? 0)
            return (
              <li
                key={item.id}
                className={`flex ${layout.span}`}
                data-reveal
                style={{ '--reveal-delay': `${(index % 2) * 90}ms` } as CSSProperties}
              >
                <article className="group relative flex w-full flex-col">
                  <div className={`photo-frame aspect-[5/4] bg-ink-raised ${layout.tile} lg:min-h-0`}>
                    <ResponsivePhoto
                      image={item.cover}
                      sizes={`${layout.sizes}, (min-width: 48rem) 46vw, calc(100vw - 2.5rem)`}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out-quint group-hover:scale-[1.035]"
                    />
                    {photos > 1 ? (
                      <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-ink/80 px-3 py-1.5 text-[0.6875rem] leading-none font-bold tracking-[0.12em] text-paper uppercase">
                        <Images aria-hidden="true" className="size-3.5" />
                        {photos} photos
                      </span>
                    ) : null}
                    <span
                      aria-hidden="true"
                      className="absolute right-4 bottom-4 grid size-12 translate-y-2 place-items-center rounded-full bg-paper text-ink opacity-0 transition-[opacity,translate] duration-300 ease-out-quint group-hover:translate-y-0 group-hover:opacity-100 group-has-[:focus-visible]:translate-y-0 group-has-[:focus-visible]:opacity-100"
                    >
                      <Plus className="size-5" />
                    </span>
                  </div>
                  <div className="mt-5 flex items-baseline justify-between gap-4">
                    <h3 className="text-lg font-bold tracking-[-0.02em] sm:text-xl">
                      <button
                        type="button"
                        onClick={() => setOpenIndex(index)}
                        className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent-light focus-visible:after:outline-solid"
                      >
                        {item.title}
                        <span className="sr-only">, open preview</span>
                      </button>
                    </h3>
                    <p className="shrink-0 text-xs font-bold tracking-[0.14em] text-bronze-light uppercase">
                      {item.category}
                    </p>
                  </div>
                  <p className="mt-1.5 text-[0.9375rem] text-on-ink-muted">{item.summary}</p>
                </article>
              </li>
            )
          })}
        </ul>

        <p className="mt-14 max-w-2xl border-l-2 border-accent-light pl-4 text-sm leading-relaxed text-on-ink-muted" data-reveal>
          Looking for something close to your own project?{' '}
          <a
            href={whatsappChatHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-paper underline decoration-paper/30 underline-offset-4 transition-colors hover:decoration-paper"
          >
            Ask us on WhatsApp
          </a>{' '}
          for more examples.
        </p>
      </div>

      <PortfolioPreview
        items={portfolio}
        index={openIndex}
        onNavigate={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </section>
  )
}
