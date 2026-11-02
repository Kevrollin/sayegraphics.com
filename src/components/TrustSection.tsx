import { ArrowUpRight } from 'lucide-react'
import { business } from '../data/business'
import { mapsListingHref } from '../lib/links'
import { buttonClasses } from './ui/button'
import { Stars } from './ui/Stars'

/**
 * Genuine trust signals only: the public Google rating and a link to the
 * reviews themselves. No testimonials are reproduced without permission.
 */
export function TrustSection() {
  const { google } = business

  const reviewsLink = (
    <a href={mapsListingHref} target="_blank" rel="noopener noreferrer" className={buttonClasses('secondary', 'md', 'shrink-0')}>
      Read reviews on Google
      <ArrowUpRight aria-hidden="true" className="size-4" />
      <span className="sr-only"> (opens Google Maps)</span>
    </a>
  )

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="border-b border-line">
      <div className="container-page grid gap-8 py-14 md:py-16 lg:grid-cols-12 lg:items-center lg:gap-10" data-reveal>
        {google.showRating ? (
          <>
            <div className="flex items-center gap-5 sm:gap-7 lg:col-span-5">
              <p aria-hidden="true" className="text-[4.5rem] leading-[0.8] font-extrabold tracking-[-0.06em] sm:text-[5.75rem]">
                {google.rating}
              </p>
              <div>
                <Stars rating={google.rating} className="text-lg text-ink" />
                <h2 id="reviews-title" className="mt-2 text-xl font-extrabold tracking-[-0.03em] sm:text-2xl">
                  Rated {google.rating} on Google
                </h2>
                <p className="mt-1 text-sm text-muted">Based on {google.reviewCount} customer reviews</p>
              </div>
            </div>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10 lg:col-span-7 lg:justify-end">
              <p className="max-w-md leading-relaxed text-pretty text-muted">
                Reviewers mention our graphic design, branding, and custom{' '}
                <span className="whitespace-nowrap">T-shirt</span> and hoodie printing.
              </p>
              {reviewsLink}
            </div>
          </>
        ) : (
          <>
            <h2 id="reviews-title" className="text-2xl font-extrabold tracking-[-0.03em] lg:col-span-7">
              See what our customers say on Google.
            </h2>
            <div className="lg:col-span-5 lg:flex lg:justify-end">{reviewsLink}</div>
          </>
        )}
      </div>
    </section>
  )
}
