/**
 * Approved photographs and how each one is prepared for the site.
 *
 * Every entry was chosen by looking at the photo itself (see
 * research/ASSET_INVENTORY.md and research/IMAGE_SELECTION_REPORT.md).
 * `source` is the original WhatsApp file in assets-src/originals/, which is
 * never modified. `crop` is optional:
 *   - { left, top, width, height }  exact rectangle in source pixels
 *   - { aspect: [w, h], focusY }     centred crop to an aspect ratio; focusY
 *                                    (0–1) moves the window up or down
 * `widths` are only the sizes the layout actually renders; anything wider
 * than the (cropped) source is skipped, never upscaled.
 *
 * Alt text, titles and captions live in src/data/media.ts.
 */

const HERO_MAIN = [480, 720, 960]
const HERO_TILE = [320, 480, 640]
const CARD = [400, 640, 800]
const WORK = [480, 800, 1200]

export const images = [
  // Hero composition
  { key: 'heroSignage', folder: 'hero', slug: 'reception-logo-wall', source: 'WhatsApp Image 2026-11-02 at 9.35.00 PM.jpeg', crop: { left: 190, top: 0, width: 960, height: 640 }, widths: HERO_MAIN },
  { key: 'heroApparel', folder: 'hero', slug: 'embroidered-kenya-hoodies', source: 'WhatsApp Image 2026-11-02 at 9.37.30 PM (3).jpeg', crop: { aspect: [4, 3], focusY: 0.5 }, widths: HERO_TILE },
  { key: 'heroPrint', folder: 'hero', slug: 'teal-gold-wedding-invitations', source: 'WhatsApp Image 2026-11-02 at 10.00.02 PM (1).jpeg', crop: { left: 0, top: 368, width: 1080, height: 810 }, widths: HERO_TILE },

  // Service cards (4:3)
  { key: 'serviceSignage', folder: 'services', slug: 'shopfront-sign-board', source: 'WhatsApp Image 2026-11-02 at 9.39.32 PM.jpeg', crop: { left: 0, top: 40, width: 960, height: 720 }, widths: CARD },
  { key: 'serviceLargeFormat', folder: 'services', slug: 'teardrop-flag-event', source: 'WhatsApp Image 2026-11-02 at 9.37.12 PM.jpeg', crop: { left: 0, top: 200, width: 3024, height: 2268 }, widths: CARD },
  { key: 'serviceVehicle', folder: 'services', slug: 'vehicle-bonnet-wrap', source: 'WhatsApp Image 2026-11-02 at 9.34.55 PM.jpeg', crop: { aspect: [4, 3], focusY: 0.5 }, widths: CARD },
  { key: 'serviceApparel', folder: 'services', slug: 'embroidered-logo-hoodies', source: 'WhatsApp Image 2026-11-02 at 9.35.07 PM (3).jpeg', crop: { left: 0, top: 140, width: 963, height: 722 }, widths: CARD },
  { key: 'servicePromo', folder: 'services', slug: 'branded-water-bottles', source: 'WhatsApp Image 2026-11-02 at 9.35.06 PM.jpeg', crop: { aspect: [4, 3], focusY: 0.55 }, widths: CARD },
  { key: 'servicePrint', folder: 'services', slug: 'laser-cut-wedding-invitations', source: 'WhatsApp Image 2026-11-02 at 10.00.03 PM (1).jpeg', crop: { aspect: [4, 3], focusY: 0.5 }, widths: CARD },

  // Portfolio covers and gallery images (uncropped; tiles use object-fit)
  { key: 'workVehicleWrap', folder: 'portfolio', slug: 'vehicle-wrap-side', source: 'WhatsApp Image 2026-11-02 at 9.34.57 PM.jpeg', widths: WORK },
  { key: 'workVehicleWrapBefore', folder: 'portfolio', slug: 'vehicle-wrap-before', source: 'WhatsApp Image 2026-11-02 at 9.34.56 PM (2).jpeg', widths: WORK },
  { key: 'workVehicleWrapRear', folder: 'portfolio', slug: 'vehicle-wrap-rear', source: 'WhatsApp Image 2026-11-02 at 9.34.56 PM.jpeg', widths: WORK },
  { key: 'workVehicleWrapDetail', folder: 'portfolio', slug: 'vehicle-wrap-rear-quarter', source: 'WhatsApp Image 2026-11-02 at 9.34.56 PM (1).jpeg', widths: WORK },
  { key: 'workBacklitSign', folder: 'portfolio', slug: 'backlit-round-sign', source: 'WhatsApp Image 2026-11-02 at 9.37.32 PM.jpeg', widths: WORK },
  { key: 'workEmbroidery', folder: 'portfolio', slug: 'embroidery-machine-hoodies', source: 'WhatsApp Image 2026-11-02 at 9.35.08 PM (1).jpeg', widths: WORK },
  { key: 'workEmbroideryTumbler', folder: 'portfolio', slug: 'branded-tumbler', source: 'WhatsApp Image 2026-11-02 at 9.35.08 PM.jpeg', widths: WORK },
  { key: 'workInvitations', folder: 'portfolio', slug: 'lace-wedding-invitations', source: 'WhatsApp Image 2026-11-02 at 10.00.03 PM.jpeg', widths: WORK },
  { key: 'workInvitationsGold', folder: 'portfolio', slug: 'gold-lace-wedding-invitations', source: 'WhatsApp Image 2026-11-02 at 10.00.03 PM (2).jpeg', widths: WORK },
  { key: 'workInvitationsBlue', folder: 'portfolio', slug: 'blue-tulle-wedding-invitations', source: 'WhatsApp Image 2026-11-02 at 10.00.02 PM.jpeg', widths: WORK },
  { key: 'workGiftMugs', folder: 'portfolio', slug: 'branded-mugs', source: 'WhatsApp Image 2026-11-02 at 9.35.07 PM.jpeg', widths: WORK },
  { key: 'workGiftUmbrella', folder: 'portfolio', slug: 'branded-umbrella', source: 'WhatsApp Image 2026-11-02 at 9.35.06 PM (2).jpeg', widths: WORK },
  { key: 'workGiftClocks', folder: 'portfolio', slug: 'branded-wall-clocks', source: 'WhatsApp Image 2026-11-02 at 9.35.06 PM (3).jpeg', widths: WORK },
  { key: 'workBackdrop', folder: 'portfolio', slug: 'curved-event-backdrop', source: 'WhatsApp Image 2026-11-02 at 9.37.10 PM.jpeg', widths: WORK },
  { key: 'workSignpost', folder: 'portfolio', slug: 'lodge-directional-signpost', source: 'WhatsApp Image 2026-11-02 at 9.37.34 PM.jpeg', widths: WORK },
  { key: 'workAmbulance', folder: 'portfolio', slug: 'ambulance-livery', source: 'WhatsApp Image 2026-11-02 at 9.37.16 PM (1).jpeg', widths: WORK },
  { key: 'workAmbulanceFront', folder: 'portfolio', slug: 'ambulance-livery-front', source: 'WhatsApp Image 2026-11-02 at 9.37.14 PM (1).jpeg', widths: WORK },
  { key: 'workAmbulanceRescue', folder: 'portfolio', slug: 'rescue-ambulance-livery', source: 'WhatsApp Image 2026-11-02 at 9.35.05 PM (1).jpeg', widths: WORK },
  { key: 'workPoleBanners', folder: 'portfolio', slug: 'street-pole-banners', source: 'WhatsApp Image 2026-11-02 at 9.46.39 PM.jpeg', widths: WORK },
  { key: 'workPoleBannersRoad', folder: 'portfolio', slug: 'street-pole-banners-highway', source: 'WhatsApp Image 2026-11-02 at 9.46.37 PM.jpeg', widths: WORK },
  { key: 'workPoleBannersClose', folder: 'portfolio', slug: 'street-pole-banner-close', source: 'WhatsApp Image 2026-11-02 at 9.46.54 PM.jpeg', widths: WORK },
  { key: 'workPlaques', folder: 'portfolio', slug: 'brass-office-plaques', source: 'WhatsApp Image 2026-11-02 at 9.39.45 PM (1).jpeg', widths: WORK },
  { key: 'workDoorSigns', folder: 'portfolio', slug: 'school-door-signs', source: 'WhatsApp Image 2026-11-02 at 9.39.43 PM.jpeg', widths: WORK },
  { key: 'workFloorSigns', folder: 'portfolio', slug: 'brass-floor-signs', source: 'WhatsApp Image 2026-11-02 at 9.39.44 PM.jpeg', widths: WORK },
  { key: 'workClinicSigns', folder: 'portfolio', slug: 'clinic-door-signs', source: 'WhatsApp Image 2026-11-02 at 9.39.45 PM.jpeg', widths: WORK },
  { key: 'workSafariTees', folder: 'portfolio', slug: 'safari-tees-headbands', source: 'WhatsApp Image 2026-11-02 at 9.35.07 PM (1).jpeg', widths: WORK },
  { key: 'workSafariCaps', folder: 'portfolio', slug: 'safari-branded-caps', source: 'WhatsApp Image 2026-11-02 at 9.35.07 PM (2).jpeg', widths: WORK },
  { key: 'workBottles', folder: 'portfolio', slug: 'personalised-water-bottles', source: 'WhatsApp Image 2026-11-02 at 9.35.09 PM.jpeg', widths: WORK },

  // About
  { key: 'aboutPrinting', folder: 'workspace', slug: 'large-format-printer-banner', source: 'WhatsApp Image 2026-11-02 at 9.37.14 PM.jpeg', widths: [480, 720] },
]

/** Social preview (1200 x 630): reception signage photo beside the logo. */
export const socialImage = {
  photo: 'WhatsApp Image 2026-11-02 at 9.35.00 PM.jpeg',
  crop: { left: 230, top: 0, width: 880, height: 924 },
}
