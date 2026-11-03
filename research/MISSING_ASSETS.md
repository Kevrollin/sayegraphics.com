# Missing assets tracker

Updated **3 November 2026**, after the owner supplied the logo, company profile, 165 photos and 24 videos. Priority: **P1** = needed before going live, **P2** = should be confirmed soon after, **P3** = nice to have.

## Received and in use

| Asset                               | Status                                                                                                   |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Original logo                       | `PDFLOGO.pdf` (vector), converted to SVG for the header, footer, favicon and social image              |
| Brand colours                       | Teal `#336B86` and bronze `#8A5F35` taken from the logo; now the site accents                           |
| Photos of completed work            | 38 photos used: hero, six service cards, 12 portfolio projects (28 photos), About                        |
| Workspace / production footage      | 4 trimmed clips (printing, embroidery, sign-making, installation) in the About section                   |
| Full service list                   | Six services built from the company profile, the roll-up banner and the photos                           |
| Tagline                             | "Your Trustworthy & Reliable Partner." (from the logo): footer and structured data                       |
| Year established                    | 2016 (company profile)                                                                                   |
| Social media                        | `@sayegraphics` on TikTok, Instagram and Facebook (company profile); linked in the footer               |
| Social sharing image                | Rebuilt from the official logo and a real photo (`public/og-image.jpg`)                                  |

See [ASSET_INVENTORY.md](ASSET_INVENTORY.md) and [IMAGE_SELECTION_REPORT.md](IMAGE_SELECTION_REPORT.md).

## Still to confirm

| #  | Item                                   | Priority | On the site now                                              | Where to change                                     |
| -- | -------------------------------------- | -------- | ------------------------------------------------------------ | --------------------------------------------------- |
| 1  | Live Google rating                     | P1       | 4.9 from 47 reviews (from the original brief)                | `google` in `src/data/business.ts` (`showRating: false` hides it) |
| 2  | Shop address detail                    | P1       | "Moses Mudavadi Road, Nakuru". The roll-up banner (P004) says "Resma Plaza, Ground Floor, Room G11, Nakuru"; whether Resma Plaza is on Moses Mudavadi Road couldn't be verified | `address` in `src/data/business.ts` |
| 3  | Social profile URLs                    | P1       | Instagram, TikTok and Facebook links built from `@sayegraphics`; not opened from the build environment | `social` in `src/data/business.ts` |
| 4  | Permission to name clients             | P2       | Portfolio describes work without naming clients              | `src/data/portfolio.ts`                             |
| 5  | Gift-set photo (P058)                  | P3       | Not used: looks like a rendered mockup                       | Add to `scripts/media-manifest.mjs` if it is a real job |
| 6  | Opening hours                          | P2       | Not shown                                                    | `openingHours` in `src/data/business.ts`            |
| 7  | Map pin / landmark                     | P2       | Google Place ID links                                        | Contact or About copy                               |
| 8  | Business email                         | P3       | None shown                                                   | `email` in `src/data/business.ts`                   |
| 9  | Testimonials (with permission)         | P3       | Only the Google rating                                       | `src/components/TrustSection.tsx`                   |
| 10 | Order process and turnaround           | P2       | Generic three-step process, no timings                       | `src/data/process.ts`                               |
| 11 | WhatsApp Business short link           | P3       | Number link used; `wa.me/sayegraphicsltd` not confirmed       | `whatsapp` in `src/data/business.ts`                |
| 12 | Production domain                      | P1       | None; build is `noindex`                                     | `SITE_URL` and `ALLOW_INDEXING=true` in Vercel (see README) |
| 13 | Higher-resolution photos               | P3       | Most uploads are WhatsApp-compressed (720–1600 px)           | Send originals by email or Google Drive, not WhatsApp; re-run `npm run media` |

## Guidelines for future photos

- Use only Saye Graphics' own work. No supplier, catalogue or mockup images presented as finished jobs.
- Send originals by email or a shared drive: WhatsApp shrinks photos to about 1600 px and recompresses them.
- Prefer daylight, a clean background and the whole product in frame. Avoid watermarks and text overlays.
- Leave out political campaign material and other brands' trademarks used without permission.
- Add new photos with `scripts/media-manifest.mjs` + `npm run media` (see the README).
