import { business } from '../data/business'
import { brandLogo } from '../data/media'
import { services } from '../data/services'
import { mapsListingHref } from '../lib/links'

/**
 * schema.org LocalBusiness data, built only from confirmed details.
 *
 * Deliberately left out until the owner confirms them: opening hours, email,
 * geo coordinates and price range. The Google rating is not marked up as
 * aggregateRating: Google treats a business's own review markup as
 * self-serving and does not show it in results.
 */
export function buildStructuredData(siteUrl: string) {
  const { address } = business
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    description: business.description,
    slogan: business.tagline,
    foundingDate: String(business.founded),
    telephone: business.phone.e164,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.locality,
      addressRegion: address.region,
      addressCountry: address.countryCode,
    },
    hasMap: mapsListingHref,
    makesOffer: services.map((service) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: service.title, description: service.summary },
    })),
  }

  if (siteUrl) {
    data['@id'] = `${siteUrl}/#business`
    data.url = `${siteUrl}/`
    data.image = `${siteUrl}/og-image.jpg`
    data.logo = `${siteUrl}${brandLogo.src}`
  }
  if (business.email) data.email = business.email
  if (business.openingHours) data.openingHours = business.openingHours.schema
  if (business.social.length > 0) data.sameAs = business.social.map((profile) => profile.url)

  return data
}
