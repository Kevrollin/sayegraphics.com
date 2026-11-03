/**
 * Saye Graphics Ltd — central business profile.
 *
 * Every customer-facing detail that may change lives here: contact numbers,
 * address, the Google listing, opening hours and social profiles.
 * Components, the quote form, SEO tags and structured data all read from this
 * file, so an update here updates the whole site. Logo files, photos and
 * videos are in media.ts.
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

export const business = {
  name: 'Saye Graphics Ltd',
  shortName: 'Saye Graphics',

  /** Used in the footer, metadata and structured data. */
  description:
    'Signage, vehicle branding, branded apparel, promotional items, graphic design and printing in Nakuru, Kenya.',

  /** From the official logo. */
  tagline: 'Your Trustworthy & Reliable Partner.',

  /** Year established, from the company profile. */
  founded: 2016,

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
   * The company profile lists "@sayegraphics" on TikTok, Instagram and
   * Facebook. The profile URLs below follow from that handle but could not be
   * opened from the build environment; confirm them with the owner.
   */
  social: [
    { platform: 'Instagram', url: 'https://www.instagram.com/sayegraphics/', handle: '@sayegraphics' },
    { platform: 'TikTok', url: 'https://www.tiktok.com/@sayegraphics', handle: '@sayegraphics' },
    { platform: 'Facebook', url: 'https://www.facebook.com/sayegraphics', handle: '@sayegraphics' },
  ] as SocialProfile[],
}

export type Business = typeof business
