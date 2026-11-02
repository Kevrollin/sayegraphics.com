import type { ServiceId } from './services'

/**
 * Portfolio entries for "Our Work".
 *
 * Saye Graphics has not supplied photographs of finished jobs yet, so every
 * entry below is an illustrative concept drawn for this demo. Concepts are
 * labelled as such on the page and in the preview. "Ziwa Coffee" is a
 * fictional brand invented for the demo; it is not a client.
 *
 * To add a real job: put the photo in public/assets/portfolio/, run
 * `npm run images`, then add an entry with kind: 'project' and an `image`.
 * Real projects should be listed first.
 */

export type PortfolioCategory = 'Apparel' | 'Brand Identity' | 'Graphic Design'

/** Keys of the illustrated concept artworks in src/components/art/ConceptArt.tsx. */
export type ConceptArtId =
  | 'contour-hoodie'
  | 'city-type-tee'
  | 'ziwa-identity'
  | 'ideas-poster'
  | 'ziwa-staff-tees'
  | 'ziwa-social'

export interface PortfolioImage {
  /** Path under /public, e.g. "/assets/portfolio/team-hoodies-1600.webp". */
  src: string
  /** Optional responsive sources, e.g. "/assets/portfolio/x-800.webp 800w, ...". */
  srcSet?: string
  width: number
  height: number
}

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
  /** 'concept' = illustrative mockup, 'project' = real completed work. */
  kind: 'concept' | 'project'
  /** Illustrated artwork for concepts. */
  art?: ConceptArtId
  /** Photograph for real projects. */
  image?: PortfolioImage
  /** Describes the image for screen readers and search engines. */
  alt: string
  /** Tile background behind the artwork. */
  tone: 'accent' | 'sand' | 'paper' | 'ink' | 'cream'
}

export const portfolio: PortfolioItem[] = [
  {
    id: 'contour-hoodie',
    title: 'Contour Hoodie',
    category: 'Apparel',
    serviceId: 'hoodie-printing',
    summary: 'Hoodie print inspired by the Rift Valley',
    description:
      'A heavyweight hoodie concept with a contour-line print inspired by the landscape around Nakuru. It shows how a single-colour chest print can feel premium.',
    kind: 'concept',
    art: 'contour-hoodie',
    alt: 'Illustrated mockup of a charcoal hoodie with a white contour-line chest print',
    tone: 'accent',
  },
  {
    id: 'city-type-tee',
    title: 'City Type Tee',
    category: 'Apparel',
    serviceId: 'tshirt-printing',
    summary: 'Typographic T-shirt print',
    description:
      "A bold, type-led T-shirt concept built around Nakuru's coordinates. Simple typographic prints like this suit events, crews and hometown pride.",
    kind: 'concept',
    art: 'city-type-tee',
    alt: 'Illustrated mockup of a white T-shirt printed with the word Nakuru and its map coordinates',
    tone: 'sand',
  },
  {
    id: 'ziwa-identity',
    title: 'Ziwa Coffee Identity',
    category: 'Brand Identity',
    serviceId: 'branding',
    summary: 'Logo, colours and business cards',
    description:
      'A brand identity concept for a fictional coffee house: logo mark, colour palette and business cards designed to work as one consistent system.',
    kind: 'concept',
    art: 'ziwa-identity',
    alt: 'Illustrated mockup of business cards, a logo mark and colour swatches for a fictional coffee brand',
    tone: 'ink',
  },
  {
    id: 'ideas-poster',
    title: 'Ideas Take Shape',
    category: 'Graphic Design',
    serviceId: 'graphic-design',
    summary: 'Poster artwork',
    description:
      'A poster concept built from bold geometry and confident type: artwork designed to stop people on a wall or a phone screen.',
    kind: 'concept',
    art: 'ideas-poster',
    alt: 'Illustrated mockup of a geometric poster reading Ideas take shape',
    tone: 'paper',
  },
  {
    id: 'ziwa-staff-tees',
    title: 'Ziwa Staff Tees',
    category: 'Apparel',
    serviceId: 'tshirt-printing',
    summary: 'Uniform T-shirts with a chest logo',
    description:
      'Staff T-shirts for the same fictional coffee brand, with a clean left-chest logo. It shows how an identity carries through onto uniforms.',
    kind: 'concept',
    art: 'ziwa-staff-tees',
    alt: 'Illustrated mockup of two staff T-shirts with a small coffee-brand logo on the chest',
    tone: 'cream',
  },
  {
    id: 'ziwa-social',
    title: 'Social Media Set',
    category: 'Graphic Design',
    serviceId: 'graphic-design',
    summary: 'Social posts for a coffee brand',
    description:
      'A set of social media graphics for the fictional Ziwa Coffee brand, designed so every post looks consistent and instantly recognisable.',
    kind: 'concept',
    art: 'ziwa-social',
    alt: 'Illustrated mockup of three square social media posts for a fictional coffee brand',
    tone: 'sand',
  },
]
