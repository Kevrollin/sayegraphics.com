import { Plus } from 'lucide-react'
import { useState, type CSSProperties } from 'react'
import { portfolio } from '../data/portfolio'
import { whatsappChatHref } from '../lib/links'
import { ConceptTag, PortfolioMedia, toneClasses } from './portfolio/PortfolioMedia'
import { PortfolioPreview } from './portfolio/PortfolioPreview'
import { SectionHeading } from './ui/SectionHeading'

/*
 * Editorial grid on large screens: 7/5, 5/7, 6/6 columns. In each row the
 * "lead" tile sets the height through its aspect ratio and its neighbour
 * stretches to match, so rows always line up.
 */
const LAYOUT = [
  { span: 'lg:col-span-7', tile: 'lg:aspect-[5/4]' },
  { span: 'lg:col-span-5', tile: 'lg:aspect-auto lg:flex-1' },
  { span: 'lg:col-span-5', tile: 'lg:aspect-auto lg:flex-1' },
  { span: 'lg:col-span-7', tile: 'lg:aspect-[5/4]' },
  { span: 'lg:col-span-6', tile: 'lg:aspect-[4/3]' },
  { span: 'lg:col-span-6', tile: 'lg:aspect-[4/3]' },
]

export function Portfolio() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const hasConcepts = portfolio.some((item) => item.kind === 'concept')

  return (
    <section id="work" aria-labelledby="work-title" className="on-ink bg-ink py-20 text-paper md:py-28 lg:py-32">
      <div className="container-page">
        <SectionHeading
          id="work-title"
          index="02"
          label="Our Work"
          title="Made to Make an Impression."
          intro="Apparel, identity and design pieces that show the kind of work we create, from a single hoodie to a complete brand."
          onInk
        />

        <ul className="mt-12 grid gap-x-5 gap-y-10 md:mt-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-y-14">
          {portfolio.map((item, index) => {
            const layout = LAYOUT[index % LAYOUT.length]
            return (
              <li
                key={item.id}
                className={`flex ${layout.span}`}
                data-reveal
                style={{ '--reveal-delay': `${(index % 2) * 90}ms` } as CSSProperties}
              >
                <article className="group relative flex w-full flex-col">
                  <div
                    className={`relative aspect-[5/4] overflow-hidden ${toneClasses[item.tone]} ${layout.tile} lg:min-h-0`}
                  >
                    <PortfolioMedia
                      item={item}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="absolute inset-0 h-full w-full transition-transform duration-[900ms] ease-out-quint group-hover:scale-[1.035]"
                    />
                    {item.kind === 'concept' ? <ConceptTag className="absolute top-4 left-4" /> : null}
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
                    <p className="shrink-0 text-xs font-bold tracking-[0.14em] text-on-ink-muted uppercase">
                      {item.category}
                    </p>
                  </div>
                  <p className="mt-1.5 text-[0.9375rem] text-on-ink-muted">{item.summary}</p>
                </article>
              </li>
            )
          })}
        </ul>

        {hasConcepts ? (
          <p className="mt-14 max-w-2xl border-l-2 border-accent-light pl-4 text-sm leading-relaxed text-on-ink-muted" data-reveal>
            The pieces above are illustrative concepts. Ziwa Coffee is a fictional brand. For examples of finished
            jobs,{' '}
            <a
              href={whatsappChatHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-paper underline decoration-paper/30 underline-offset-4 transition-colors hover:decoration-paper"
            >
              ask us on WhatsApp
            </a>
            .
          </p>
        ) : null}
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
