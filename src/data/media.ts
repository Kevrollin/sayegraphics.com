/**
 * Approved photographs, logo files and videos for every section of the site.
 *
 * Every image here is an original Saye Graphics photo, chosen after viewing
 * the full set of uploads (research/ASSET_INVENTORY.md explains each choice).
 * File paths, sizes and placeholder colours come from media.generated.ts,
 * which `npm run media` writes; this file adds the alt text and decides where
 * each photo is used. Components import from here, never from file paths.
 */
import { generatedImages } from './media.generated'

type ImageKey = keyof typeof generatedImages

export interface Photo {
  /** Path prefix: the files are `${base}-${width}.avif` and `.webp`. */
  base: string
  /** Intrinsic size of the prepared (cropped) image. */
  width: number
  height: number
  /** Widths that exist on disk, smallest first. */
  widths: readonly number[]
  /** Dominant colour, shown while the photo loads. */
  color: string
  /** Describes what the photo shows. */
  alt: string
  /** CSS object-position when a frame crops the photo, e.g. "50% 30%". */
  position?: string
}

function photo(key: ImageKey, alt: string, position?: string): Photo {
  return { ...generatedImages[key], alt, position }
}

export interface BrandFile {
  src: string
  width: number
  height: number
}

const brandDir = '/assets/optimized/brand'

/** Official logo with the tagline, converted from the supplied PDF. */
export const brandLogo: BrandFile = { src: `${brandDir}/saye-graphics-logo.svg`, width: 504, height: 257 }
/** Emblem and wordmark without the tagline, for the header. */
export const brandLockup: BrandFile = { src: `${brandDir}/saye-graphics-lockup.svg`, width: 459, height: 257 }
/** One-colour (paper) lockup for dark backgrounds. */
export const brandLockupLight: BrandFile = { src: `${brandDir}/saye-graphics-lockup-light.svg`, width: 459, height: 257 }
/** Sun, moon and star emblem on its own (favicon source). */
export const brandMark: BrandFile = { src: `${brandDir}/saye-graphics-mark.svg`, width: 257, height: 257 }

/* ------------------------------------------------------------------ Hero */

export const heroCover = photo(
  'heroSignage',
  'Reception wall with a gold 3D logo and raised “Dashing Divas Beauty Parlour” lettering on a charcoal background',
)
export const heroApparel = photo('heroApparel', 'Two grey hoodies embroidered with a colourful “Kenya” design', '50% 45%')
export const heroPrint = photo('heroPrint', 'Teal and gold wedding invitations finished with personalised name tags')

/* -------------------------------------------------------------- Services */

export const serviceImages = {
  signage: photo('serviceSignage', 'Shopfront with a black sign board and raised white “The Meat House” lettering'),
  largeFormat: photo('serviceLargeFormat', 'Printed teardrop flag in front of an outdoor event stage at sunset', '50% 40%'),
  vehicle: photo('serviceVehicle', 'Station wagon with a blue and white branded bonnet wrap'),
  apparel: photo('serviceApparel', 'Black hoodies embroidered with a flame logo'),
  promotional: photo('servicePromo', 'Blue sports water bottles printed with a bank logo'),
  print: photo('servicePrint', 'Navy laser-cut wedding invitations with gold foil lettering'),
}

/* ------------------------------------------------------------- Portfolio */

export const workImages = {
  vehicleWrap: photo('workVehicleWrap', 'Station wagon wrapped in blue and white printed vinyl with a foundation’s logo, photos and slogans'),
  vehicleWrapBefore: photo('workVehicleWrapBefore', 'The same silver station wagon before it was wrapped'),
  vehicleWrapRear: photo('workVehicleWrapRear', 'Rear of the wrapped station wagon with a printed slogan and a space for the number plate'),
  vehicleWrapDetail: photo('workVehicleWrapDetail', 'Rear quarter of the wrapped station wagon showing printed side graphics'),

  backlitSign: photo('workBacklitSign', 'Round black sign with an illuminated “The Moscato Brand” logo and a glowing halo, being fixed to a wall'),

  embroidery: photo('workEmbroidery', 'Multi-head embroidery machine with two hoodies embroidered with a flame logo'),
  embroideryTumbler: photo('workEmbroideryTumbler', 'White tumbler printed with the same flame logo, still in its wrapping'),

  invitations: photo('workInvitations', 'Silver laser-cut lace wedding invitations tied with yellow satin bows'),
  invitationsGold: photo('workInvitationsGold', 'Gold lace wedding invitations with burgundy bands and floral name tags'),
  invitationsBlue: photo('workInvitationsBlue', 'Pale blue wedding invitations with tulle and round name tags'),

  giftMugs: photo('workGiftMugs', 'White mugs printed with a blue bank logo'),
  giftUmbrella: photo('workGiftUmbrella', 'Blue and white umbrella printed with a bank logo'),
  giftClocks: photo('workGiftClocks', 'Two wall clocks with a bank logo printed on the dial'),

  backdrop: photo('workBackdrop', 'Curved printed backdrop in red, blue and gold behind a 360-degree photo booth'),

  signpost: photo('workSignpost', 'Tall red roadside signpost listing a lodge’s accommodation, restaurant, conference and pool facilities', '50% 35%'),

  ambulance: photo('workAmbulance', 'Yellow and green chequered ambulance livery with red “Ambulance” lettering and a hotline number'),
  ambulanceFront: photo('workAmbulanceFront', 'Front of an ambulance with yellow and green high-visibility livery'),
  ambulanceRescue: photo('workAmbulanceRescue', 'Red rescue-service ambulance with printed lettering and phone number'),

  poleBanners: photo('workPoleBanners', 'Green campaign banners mounted on street lamp posts along a highway', '50% 30%'),
  poleBannersRoad: photo('workPoleBannersRoad', 'Row of green pole banners along a dual carriageway'),
  poleBannersClose: photo('workPoleBannersClose', 'Close view of a green pole banner reading “Dial *480#”'),

  plaques: photo('workPlaques', 'Two engraved brass plaques for a law firm'),
  doorSigns: photo('workDoorSigns', 'Colour-coded acrylic door signs for a school: staffroom, kitchen, reception and classrooms'),
  floorSigns: photo('workFloorSigns', 'Brass floor signs reading Ground Floor, First Floor, Third Floor and Sixth Floor'),
  clinicSigns: photo('workClinicSigns', 'Brushed silver door signs for a clinic: reception, pharmacy, laboratory, triage and consultation rooms'),

  safariTees: photo('workSafariTees', 'White T-shirts printed with a safari company logo beside African-print headbands'),
  safariCaps: photo('workSafariCaps', 'Rows of white caps printed with the same safari company logo'),

  bottles: photo('workBottles', 'Seven insulated water bottles in different colours, each printed with a logo and a person’s name'),
}

/* ----------------------------------------------------------------- About */

export const aboutImage = photo(
  'aboutPrinting',
  'Large-format printer printing a full-colour banner, with the finished print rolling out onto the floor',
)

/* ---------------------------------------------------------------- Videos */

export interface LoopVideo {
  id: string
  title: string
  /** Read by screen readers and shown under the clip. */
  description: string
  webm: string
  mp4: string
  poster: string
  width: number
  height: number
}

const videoDir = '/assets/optimized/video'
const clip = (id: string, title: string, description: string): LoopVideo => ({
  id,
  title,
  description,
  webm: `${videoDir}/workshop-${id}.webm`,
  mp4: `${videoDir}/workshop-${id}.mp4`,
  poster: `${videoDir}/workshop-${id}-poster.webp`,
  width: 360,
  height: 640,
})

/** Short, silent clips from real jobs (4–7 seconds each, trimmed from the owner's videos). */
export const productionVideos: LoopVideo[] = [
  clip('printing', 'Large-format printing', 'A full-colour banner coming off the printer.'),
  clip('embroidery', 'Logo embroidery', 'A multi-head machine stitching a client’s logo onto hoodies.'),
  clip('sign-letters', '3D sign letters', 'Fixing cut letters onto a long signboard.'),
  clip('installation', 'Installation', 'Hanging a road-crossing banner with a crane truck.'),
]
