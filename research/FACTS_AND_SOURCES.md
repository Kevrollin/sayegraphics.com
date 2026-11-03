# Saye Graphics Ltd: facts and sources

Research date: **2 November 2026**. Prepared alongside the website demo in this repository.

## Update, 3 November 2026: material supplied by the owner

The owner supplied the logo (`PDFLOGO.pdf`), a 20-page company profile (`saye company profle.pdf`), 165 photos and 24 videos (now in `assets-src/originals/`). Facts taken from them and now used on the site:

| Fact | Source | Used on site |
| --- | --- | --- |
| Established in 2016 | Company profile, "Who are we?" | Hero ("Since 2016"), About, structured data `foundingDate` |
| Aim: "exceptional quality and creative branding materials … ensuring your business stands out" | Profile, "Our Aim" | About copy |
| Values: quality and creativity, customer satisfaction, professionalism, transparency, trust | Profile, "Our Values" | About copy |
| Target market: startups, SMEs, corporate companies, NGOs | Profile, "Target Market" | About copy |
| Services: personal branding, business collateral & printing, promotional material, logo design, outdoor marketing (billboards), signage, banners & stickers, letterheads, delivery/fee notes, receipts, roll-up banners, teardrops & backdrops, street-pole "boxes" | Profile, services and portfolio pages | Six service groups in `src/data/services.ts` |
| Digital printing, branding services and sign-board lists (business cards, flyers, receipt books, wedding cards, calendars, label stickers, mugs, pens, T-shirts, umbrellas, key holders, shop branding, backlit signs, window graphics, reflective stickers…) | The business's roll-up banner design (photo P004) | Service summaries |
| Vehicle branding, embroidery, 3D/illuminated signs, plaques, invitations | The owner's photos and videos | Services and portfolio |
| Tagline "Your Trustworthy & Reliable Partner." | Logo and profile cover | Footer, structured data `slogan` |
| Brand colours teal #336B86, bronze #8A5F35 | Logo PDF (exact values from its colour operators) | Site accent colours |
| Social handle @sayegraphics (TikTok, Instagram, Facebook) | Profile, contact page | Footer links, structured data `sameAs` (URLs to confirm) |
| Phone +254 741 556017 | Profile and banner | Unchanged (matches) |
| "Resma Plaza, Ground Floor, Room G11, Nakuru" | Roll-up banner (P004) | **Not used yet.** A web search (3 Nov 2026) found nothing linking Resma Plaza to Moses Mudavadi Road, so the owner should confirm the address |

Not used from the profile: the client logo pages (client relationships not cleared for publication), the stock city photography, and page 2's "EMA strives…" sentence (left over from another company's template).

The sections below are the original research from 2 November and are kept for reference. Where they say an item is missing, the table above supersedes them.

## How the research was done, and its limits

- **Web search** (general and extended) for every query in the brief, plus searches filtered to Facebook, Instagram, TikTok, X, LinkedIn and Kenyan business directories.
- **Direct page access was not possible** from the build environment. Google Maps, `wa.me`, Instagram, TikTok and Facebook could not be opened (DNS blocked or "unable to verify domain"), so the live Google listing and the WhatsApp Business profile **could not be re-checked in this session**.
- As a result, the business details below come from the research brief supplied by the client. They are marked as such, and none of them were contradicted by anything found.

## Summary

Saye Graphics Ltd has **no indexed web presence** beyond its Google Business Profile and WhatsApp: no website, no directory listing and no social media profile turned up in any search. This is common for small Kenyan businesses that trade mainly through Google Maps and WhatsApp. It also means almost all first-hand content (logo, colours, photos, services, hours) has to come from the owner.

---

## A. Verified business information

Supplied in the research brief as verified. Not re-checked live this session (see limits above).

| Fact                    | Value                                                                                                     | Used on site                                  |
| ----------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Business name           | Saye Graphics Ltd                                                                                         | Everywhere                                    |
| Location                | Moses Mudavadi Road, Nakuru, Kenya                                                                        | Hero, About, Contact, footer, structured data |
| Phone                   | +254 741 556 017                                                                                          | `tel:+254741556017` links                     |
| Business category       | Print shop (Google Business Profile)                                                                      | Informs copy ("design and print")             |
| Google rating           | 4.9 / 5                                                                                                   | Hero rating link, trust section               |
| Google review count     | 47                                                                                                        | Trust section ("Based on 47 customer reviews") |
| Google Place ID         | `ChIJqVQnzbyNKRgRuSUbFoRe9_o`                                                                             | Listing and directions links                  |
| Google Maps listing     | https://www.google.com/maps/search/?api=1&query=Saye+Graphics+Ltd&query_place_id=ChIJqVQnzbyNKRgRuSUbFoRe9_o | "Read reviews", rating links               |
| WhatsApp (direct)       | https://wa.me/254741556017                                                                                | Every WhatsApp button and the quote form      |
| WhatsApp Business link  | https://wa.me/sayegraphicsltd                                                                             | Stored in config, **not used** until confirmed |

> **Before publishing:** open the Google listing and confirm the rating and review count are still 4.9 and 47. Update `google.rating` / `google.reviewCount` in `src/data/business.ts`, or set `showRating: false` to hide them.

## B. Information from customer reviews

From the brief's summary of Google reviews (the review text itself could not be read this session):

| Mentioned by reviewers  | How it is used                                                    |
| ----------------------- | ----------------------------------------------------------------- |
| Graphic design          | Service card 1; "Reviewers mention…" line in the trust section    |
| Branding                | Service card 2 ("Branding & Identity")                            |
| Custom T-shirt printing | Service card 3                                                    |
| Custom hoodie printing  | Service card 4                                                    |

These four are the only services shown. They are **provisional** until the owner confirms the full list. No review text, reviewer names or photos are reproduced anywhere on the site.

## C. Reasonable assumptions made in the demo

Each is easy to change and listed here so nothing reads as fact by accident.

| Assumption                                                                                              | Where                       | Change in                         |
| ------------------------------------------------------------------------------------------------------- | --------------------------- | --------------------------------- |
| Described as a "design and print studio" that helps "businesses, teams and individuals"                 | About                       | `src/components/About.tsx`        |
| A three-step workflow: share idea → artwork discussed and approved before production → production, then collection, or delivery where agreed | How It Works | `src/data/process.ts`             |
| Visitors can choose a WhatsApp reply or a phone call                                                   | Quote form                  | `src/lib/enquiry.ts`              |
| The business can share examples of finished jobs on WhatsApp                                          | Note under Our Work         | `src/components/Portfolio.tsx`    |
| One-sentence service descriptions                                                                       | Services, structured data   | `src/data/services.ts`            |
| Temporary palette (paper `#F7F6F2`, ink `#17191C`, grey `#74777D`, cobalt `#2456E8`)                   | Whole site                  | `src/styles/index.css`            |
| Temporary "SG" monogram and "Saye Graphics" wordmark                                                    | Header, footer, favicon     | `business.logo`, `public/favicon.svg` |
| Nakuru town coordinates (0°18′S 36°04′E) used as decoration in concept artwork. These are the town's coordinates, not the shop's | Concept prints only | `src/components/art/prints.tsx` |
| British/Kenyan spelling ("colour", "recognisable")                                                     | All copy                    | n/a                               |

### Illustrative content (clearly labelled on the site)

- **All portfolio pieces are concept mockups** drawn in code for the demo. Each tile carries a "Concept" tag, the preview says *"Illustrative concept mockup created for this website. It is not a client commission."*, and a note under the grid says so too.
- **"Ziwa Coffee" is a fictional brand** invented for the identity, uniform and social media concepts. It is not a client.
- The hero artboard is captioned *"Illustrative concept mockups"*.
- No stock photography and no images from any other business are used.

## D. Missing information that needs the owner's confirmation

| Item                                                     | Status                         | Effect on the site until confirmed            |
| -------------------------------------------------------- | ------------------------------ | --------------------------------------------- |
| Original logo files                                      | Not found anywhere online      | Temporary SG monogram                         |
| Official brand colours / guidelines                      | Not found                      | Temporary palette                             |
| Photos of completed work (apparel, design, branding)     | Not found                      | Illustrated concept mockups                   |
| Workspace / equipment / production photos                | Not found                      | Illustrated proof sheet in About              |
| Full list of services and products                       | Only four known (from reviews) | Four provisional service cards                |
| Opening hours                                            | Not published                  | Hours not shown; omitted from structured data |
| Exact map pin and a nearby landmark                      | Listing exists; landmark unknown | Directions link uses the Google Place ID    |
| Official social media profiles                           | None found                     | No social links shown                         |
| Business email                                           | None published                 | No email shown                                |
| Slogan / tagline                                         | None found                     | Hero uses the brief's headline                |
| Testimonials with permission to publish                  | None                           | Only the Google rating is shown               |
| Order process and typical turnaround                     | Unknown                        | Generic three-step process; no timings        |
| Delivery and/or collection                               | Unknown                        | "Collection, or delivery where agreed"        |
| Whether `wa.me/sayegraphicsltd` is their official link   | Could not be opened            | Number-based link used instead                |
| Production domain name                                   | Not yet chosen                 | Demo build is `noindex`; no canonical/sitemap |

Never added without confirmation: years in business, customer or project counts, client names, awards, guarantees, prices, delivery areas, turnaround times and testimonials.

---

## Searches performed

| Query                                                                 | Result                                   |
| --------------------------------------------------------------------- | ---------------------------------------- |
| `Saye Graphics Nakuru`                                                 | No match                                 |
| `"Saye Graphics Ltd"`                                                  | No match (only unrelated UK companies with similar names) |
| `"Saye Graphics" Kenya`                                                | No match                                 |
| `"0741556017"` and other phone formats                                 | No page lists the number                 |
| `Saye Graphics branding printing t-shirt hoodie Nakuru`               | No match                                 |
| `"Saye Graphics" Nakuru Kenya printing branding Moses Mudavadi Road` (extended) | No match; other Nakuru printers returned |
| `Saye Graphics` on facebook.com, instagram.com, tiktok.com, x.com, linkedin.com | Only similarly named businesses abroad |
| `Saye Graphics Nakuru` on Kenyan directories (businesslist.co.ke, jiji.co.ke, yellow.co.ke, cybo.com and others) | No listing |
| `sayegraphics` / `saye_graphics` / `saye.graphics` handles            | No match                                 |
| `"Mudavadi Road" Nakuru`                                               | One unverified mention (below)           |

### Do not confuse with these businesses

None of these is Saye Graphics. Their names, branding and work must not be used.

| Business                     | Where                         | Source                                                              |
| ---------------------------- | ----------------------------- | ------------------------------------------------------------------- |
| Seay Graphics                | USA (heat-transfer printing)  | https://www.facebook.com/seaygraphics                               |
| SAYA Graphic                 | Berlin                        | https://www.instagram.com/saya.graphics/                            |
| Sayagraphics                 | Artist/design page            | https://www.facebook.com/sayagraphix/                               |
| Sai Graphics / Shree Saee Graphics | India                   | https://www.instagram.com/saigraphics/, https://www.facebook.com/shreesaeegraphics/ |
| Graphics Ink                 | Mosque Road, Nakuru           | https://www.businesslist.co.ke/company/147134/graphics-ink          |
| Identity Graphics            | Nakuru                        | https://identitygraphics.co.ke/                                     |
| Wayne Graphics Solutions     | Kanu Street, Nakuru           | https://www.designrush.com/agency/profile/wayne-graphics-solutions  |
| Printspoint Designers        | Nakuru                        | https://www.businesslist.co.ke/category/printing/city:nakuru        |

### Location note (unverified, not used on the site)

An IPFS mirror of the Wikipedia article on Nakuru says the Kenya National Library Service public library is on Moses Mudavadi Road, a short distance from the town centre: https://bafybeiaysi4s6lnjev27ln5icwm6tueaw2vdykrtjkwiphwekaywqhcjze.ipfs.dweb.link/wiki/Nakuru. It is a mirror rather than the original article and says nothing about Saye Graphics, so it is only a prompt to ask the owner for a landmark.

## SEO decisions tied to these facts

- **No `aggregateRating` in the structured data.** Google treats a business marking up its own reviews as self-serving and won't show them as rich results (https://developers.google.com/search/docs/appearance/structured-data/review-snippet). The rating appears as visible text that links to the real listing.
- `openingHours`, `email`, `sameAs` and `geo` are left out of the LocalBusiness data until confirmed.
- The demo build is `noindex` and `robots.txt` blocks crawlers, so the unapproved demo can't compete with the real listing in search. See the README to switch indexing on for production.
