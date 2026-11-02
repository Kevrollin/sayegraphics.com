import { business } from '../data/business'

const { address, google, phone, whatsapp } = business

export const telHref = `tel:${phone.e164}`

/** wa.me click-to-chat link, optionally with a prefilled message. */
export function whatsappHref(message?: string) {
  const base = `https://wa.me/${whatsapp.number}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

/** General "chat with us" link with a friendly opening line. */
export const whatsappChatHref = whatsappHref(whatsapp.greeting)

const placeQuery = encodeURIComponent(business.name)

/** The Google Business listing (rating, reviews, photos). */
export const mapsListingHref = `https://www.google.com/maps/search/?api=1&query=${placeQuery}&query_place_id=${google.placeId}`

/** Turn-by-turn directions to the Google listing's pin. */
export const mapsDirectionsHref = `https://www.google.com/maps/dir/?api=1&destination=${placeQuery}&destination_place_id=${google.placeId}`

export const streetAddress = `${address.street}, ${address.locality}`
export const fullAddress = `${address.street}, ${address.locality}, ${address.country}`
