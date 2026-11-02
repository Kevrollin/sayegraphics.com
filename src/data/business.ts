/**
 * Saye Graphics Ltd — central business profile.
 *
 * Every customer-facing detail that may change lives here: contact numbers,
 * address, the Google listing, opening hours, social profiles and the logo.
 * Components, the quote form, SEO tags and structured data all read from this
 * file, so an update here updates the whole site.
 *
 * Sources and confirmation status: research/FACTS_AND_SOURCES.md
 */

export interface SocialProfile {
  /** Platform name shown as the link text, e.g. "Instagram". */
  platform: string
  /** Full URL of the official profile. Add verified profiles only. */
  url: string
  /** Handle shown to visitors, e.g. "@sayegraphics". */
  handle: string
}

export interface BrandLogo {
  /** Path under /public, e.g. "/assets/brand/saye-graphics-logo.svg". */
  src: string
  width: number
  height: number
}

export const business = {
  name: 'Saye Graphics Ltd',
  shortName: 'Saye Graphics',

  /** Used in the footer, metadata and structured data. */
  description: 'Graphic design, branding and custom T-shirt and hoodie printing in Nakuru, Kenya.',

  phone: {
    display: '+254 741 556 017',
    e164: '+254741556017',
  },

  whatsapp: {
    /** Click-to-chat number: country code, no plus sign, no spaces. */
    number: '254741556017',
    /**
     * WhatsApp Business short link listed in the research brief. It could not
     * be opened from the build environment, so the site uses the number link
     * above until the owner confirms this one.
     */
    profileUrl: 'https://wa.me/sayegraphicsltd',
    /** Opening line for the general "Chat on WhatsApp" buttons. */
    greeting: "Hello Saye Graphics, I'd like to ask about a project.",
  },

  /** No business email has been published. Owner to confirm. */
  email: null as string | null,

  address: {
    street: 'Moses Mudavadi Road',
    locality: 'Nakuru',
    region: 'Nakuru County',
    country: 'Kenya',
    countryCode: 'KE',
  },

  google: {
    placeId: 'ChIJqVQnzbyNKRgRuSUbFoRe9_o',
    /**
     * Rating and review count as listed on Google Business Profile in the
     * research brief. Re-check the live listing before publishing; set
     * showRating to false to hide them everywhere.
     */
    rating: 4.9,
    reviewCount: 47,
    showRating: true,
  },

  /**
   * Opening hours have not been published. Owner to confirm, then set e.g.
   * { display: 'Mon–Sat, 8am–6pm', schema: ['Mo-Sa 08:00-18:00'] }.
   */
  openingHours: null as { display: string; schema: string[] } | null,

  /**
   * Official logo. Leave as null to use the temporary "SG" monogram and
   * wordmark; set it once the owner supplies the original artwork.
   */
  logo: null as BrandLogo | null,

  /** Official social profiles. None could be verified yet, so none are shown. */
  social: [] as SocialProfile[],
}

export type Business = typeof business
