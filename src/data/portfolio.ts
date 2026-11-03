import { workImages, type Photo } from './media'
import type { ServiceId } from './services'

/**
 * Portfolio entries for "Our Work": a curated selection of finished jobs from
 * the owner's photos, chosen to show the range of the business. Titles
 * describe the work rather than naming the client, because client
 * relationships have not been confirmed for publication; brand names that
 * appear in the photos themselves are mentioned only in the alt text.
 *
 * To add a job: add the photo to scripts/media-manifest.mjs, run
 * `npm run media`, describe it in src/data/media.ts, then add an entry here.
 */

export type PortfolioCategory = 'Signage' | 'Vehicle Branding' | 'Large Format' | 'Apparel' | 'Promotional' | 'Print'

export interface PortfolioItem {
  id: string
  title: string
  category: PortfolioCategory
  /** Pre-selects this service when a visitor asks for something similar. */
  serviceId: ServiceId
  /** Short line shown under the tile. */
  summary: string
  /** Longer text shown in the preview. */
  description: string
  /** Tile and first preview image. */
  cover: Photo
  /** Further photos of the same job, shown in the preview. */
  gallery?: Photo[]
}

export const portfolio: PortfolioItem[] = [
  {
    id: 'vehicle-wrap',
    title: 'Full Vehicle Wrap',
    category: 'Vehicle Branding',
    serviceId: 'vehicle-branding',
    summary: 'A plain station wagon turned into a moving billboard',
    description:
      'Printed vinyl across the bonnet, doors and tailgate of a foundation’s station wagon, carrying its logo, photos of its work and contact details. The gallery shows the car before and after.',
    cover: workImages.vehicleWrap,
    gallery: [workImages.vehicleWrapBefore, workImages.vehicleWrapRear, workImages.vehicleWrapDetail],
  },
  {
    id: 'backlit-sign',
    title: 'Round Backlit Sign',
    category: 'Signage',
    serviceId: 'signage',
    summary: 'Illuminated logo with a glowing halo',
    description:
      'A circular wall sign for a grooming brand, with a lit logo face and LED backlighting that throws a warm halo onto the wall behind it.',
    cover: workImages.backlitSign,
  },
  {
    id: 'embroidered-hoodies',
    title: 'Embroidered Hoodies',
    category: 'Apparel',
    serviceId: 'apparel',
    summary: 'Multi-colour logo embroidery',
    description:
      'Hoodies embroidered with a travel company’s multi-colour flame logo on a multi-head embroidery machine, with a matching printed tumbler.',
    cover: workImages.embroidery,
    gallery: [workImages.embroideryTumbler],
  },
  {
    id: 'wedding-invitations',
    title: 'Wedding Invitations',
    category: 'Print',
    serviceId: 'design-print',
    summary: 'Laser-cut lace, ribbons and name tags',
    description:
      'Invitation suites designed for each couple and finished by hand: laser-cut lace covers, satin bows, belly bands and personalised name tags.',
    cover: workImages.invitations,
    gallery: [workImages.invitationsGold, workImages.invitationsBlue],
  },
  {
    id: 'corporate-gifts',
    title: 'Corporate Gift Range',
    category: 'Promotional',
    serviceId: 'promotional',
    summary: 'Mugs, umbrellas and wall clocks',
    description: 'Mugs, umbrellas and wall clocks branded with a bank’s logo, produced as one matching range.',
    cover: workImages.giftMugs,
    gallery: [workImages.giftUmbrella, workImages.giftClocks],
  },
  {
    id: 'event-backdrop',
    title: 'Curved Event Backdrop',
    category: 'Large Format',
    serviceId: 'large-format',
    summary: 'Printed backdrop for an anniversary event',
    description:
      'A large curved backdrop printed for an organisation’s 120th-anniversary celebration and set up behind a 360-degree photo booth.',
    cover: workImages.backdrop,
  },
  {
    id: 'ambulance-livery',
    title: 'Ambulance Livery',
    category: 'Vehicle Branding',
    serviceId: 'vehicle-branding',
    summary: 'High-visibility markings and lettering',
    description:
      'Chequered high-visibility livery, lettering and hotline numbers applied to ambulances for different medical and rescue services.',
    cover: workImages.ambulance,
    gallery: [workImages.ambulanceFront, workImages.ambulanceRescue],
  },
  {
    id: 'lodge-signpost',
    title: 'Directional Signpost',
    category: 'Signage',
    serviceId: 'signage',
    summary: 'Roadside wayfinding for a lodge',
    description:
      'A tall roadside sign listing a lodge’s accommodation, restaurant, conference rooms, gardens and pool, with its website and an arrow to the entrance.',
    cover: workImages.signpost,
  },
  {
    id: 'pole-banners',
    title: 'Street-Pole Banners',
    category: 'Large Format',
    serviceId: 'large-format',
    summary: 'A campaign run along a highway',
    description: 'A series of banners for a savings and insurance campaign, mounted on lamp posts along a busy highway.',
    cover: workImages.poleBanners,
    gallery: [workImages.poleBannersRoad, workImages.poleBannersClose],
  },
  {
    id: 'plaques-door-signs',
    title: 'Plaques & Door Signs',
    category: 'Signage',
    serviceId: 'signage',
    summary: 'Engraved brass, brushed silver and acrylic',
    description:
      'Engraved brass plaques for a law firm, floor signs, brushed silver door signs for a clinic and colour-coded door signs for a school.',
    cover: workImages.plaques,
    gallery: [workImages.floorSigns, workImages.clinicSigns, workImages.doorSigns],
  },
  {
    id: 'safari-tees-caps',
    title: 'Branded T-Shirts & Caps',
    category: 'Apparel',
    serviceId: 'apparel',
    summary: 'Team kit for a safari company',
    description: 'T-shirts and caps printed with a tour company’s logo, paired with African-print headbands.',
    cover: workImages.safariTees,
    gallery: [workImages.safariCaps],
  },
  {
    id: 'personalised-bottles',
    title: 'Personalised Water Bottles',
    category: 'Promotional',
    serviceId: 'promotional',
    summary: 'A logo and a name on every bottle',
    description: 'Insulated bottles in a range of colours, each printed with the same logo and a different name.',
    cover: workImages.bottles,
  },
]
