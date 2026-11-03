import { serviceImages, type Photo } from './media'

/**
 * Services shown in "What We Do", offered in the quote form and listed in the
 * structured data.
 *
 * Each one is supported by the business's own material: the company profile
 * (logo design, business collateral, promotional material, outdoor
 * marketing, signage, banners, roll-ups, teardrops and backdrops), the
 * services listed on its roll-up banner, and the photos and videos of
 * finished jobs the owner supplied. See research/IMAGE_SELECTION_REPORT.md.
 */

export type ServiceId = 'signage' | 'large-format' | 'vehicle-branding' | 'apparel' | 'promotional' | 'design-print'

export interface Service {
  id: ServiceId
  title: string
  summary: string
  image: Photo
}

export const services: Service[] = [
  {
    id: 'signage',
    title: 'Signage',
    summary: '3D letters, illuminated and light-box signs, directional signs, door signs and plaques.',
    image: serviceImages.signage,
  },
  {
    id: 'large-format',
    title: 'Large-Format & Outdoor',
    summary: 'Banners, roll-ups, teardrop flags, backdrops, billboards, street-pole banners and window graphics.',
    image: serviceImages.largeFormat,
  },
  {
    id: 'vehicle-branding',
    title: 'Vehicle Branding',
    summary: 'Wraps, livery and lettering for cars, vans and ambulances.',
    image: serviceImages.vehicle,
  },
  {
    id: 'apparel',
    title: 'Branded Apparel',
    summary: 'T-shirts, hoodies, polo shirts, caps and reflective vests, printed or embroidered with your logo.',
    image: serviceImages.apparel,
  },
  {
    id: 'promotional',
    title: 'Promotional Items',
    summary: 'Mugs, water bottles, pens, lanyards, umbrellas, key holders and corporate gifts.',
    image: serviceImages.promotional,
  },
  {
    id: 'design-print',
    title: 'Design & Print',
    summary: 'Logos, business cards, letterheads, receipt books, flyers, calendars, labels and wedding cards.',
    image: serviceImages.print,
  },
]

/** Extra option at the end of the quote form's service list. */
export const otherServiceLabel = 'Something else'
