import type { CSSProperties } from 'react'
import { processSteps } from '../data/process'
import { SectionHeading } from './ui/SectionHeading'

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="bg-paper-deep py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          id="process-title"
          index="04"
          label="Process"
          title="How It Works"
          intro="Three simple steps from your first message to the finished job."
        />

        <ol className="mt-14 grid md:mt-20 md:grid-cols-3 md:gap-10 lg:gap-14">
          {processSteps.map((step, index) => {
            const last = index === processSteps.length - 1
            return (
              <li
                key={step.title}
                className={`relative grid grid-cols-[3.25rem_1fr] gap-x-5 md:block ${last ? '' : 'pb-12 md:pb-0'}`}
                data-reveal
                style={{ '--reveal-delay': `${index * 110}ms` } as CSSProperties}
              >
                {last ? null : (
                  <span
                    aria-hidden="true"
                    className="absolute top-15 bottom-3 left-[1.625rem] border-l border-dashed border-line-strong md:top-[1.625rem] md:-right-10 md:bottom-auto md:left-[4.25rem] md:border-t md:border-l-0 lg:-right-14"
                  />
                )}
                <span
                  aria-hidden="true"
                  className={`grid size-13 place-items-center rounded-full text-sm font-extrabold tracking-[0.02em] ${
                    index === 0 ? 'bg-accent text-white' : 'border border-ink/80 bg-paper-raised text-ink'
                  }`}
                >
                  0{index + 1}
                </span>
                <div className="pt-2.5 md:mt-8 md:pt-0">
                  <h3 className="text-xl font-extrabold tracking-[-0.025em] sm:text-2xl">
                    <span className="sr-only">Step {index + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-sm leading-relaxed text-pretty text-muted">{step.text}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
