# Missing assets tracker

What the demo uses now, where it appears, and exactly how to swap in the real thing. Priority: **P1** = needed before the owner sees a "final" version, **P2** = needed before going live, **P3** = nice to have.

| #  | Asset                              | Priority | Currently on the site                                         | Where it appears                          | How to replace                                                                                         |
| -- | ---------------------------------- | -------- | ------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| 1  | Original logo (vector preferred)   | P1       | Temporary "SG" monogram + "Saye Graphics" wordmark            | Header, footer, social image, favicon     | Save to `public/assets/brand/`, set `logo` in `src/data/business.ts`; replace `public/favicon.svg`, run `npm run icons` |
| 2  | Official brand colours             | P1       | Temporary palette: paper `#F7F6F2`, ink `#17191C`, grey `#74777D`, cobalt `#2456E8` | Whole site, including the concept artwork | Edit the `@theme` block at the top of `src/styles/index.css` (re-check contrast notes there)            |
| 3  | Brand guidelines                   | P2       | None                                                          | Fonts, spacing, logo usage                | Apply to `src/styles/index.css` (fonts load in `src/main.tsx`)                                          |
| 4  | Photos of completed projects       | P1       | 6 illustrated concept pieces, labelled "Concept"              | Our Work grid and preview                 | Originals → `assets-src/portfolio/`, run `npm run images`, add entries with `kind: 'project'` to `src/data/portfolio.ts` |
| 5  | T-shirt and hoodie samples         | P1       | Illustrated garments (hero and portfolio)                     | Hero artboard, Our Work                   | As #4; the hero artboard can be swapped for a real flat-lay photo in `src/components/Hero.tsx`          |
| 6  | Graphic design and branding samples | P1      | Illustrated poster, identity and social concepts (fictional "Ziwa Coffee") | Our Work                     | As #4                                                                                                  |
| 7  | Workspace / equipment photos       | P2       | Illustrated print proof sheet                                 | About section                             | Originals → `assets-src/workspace/`, run `npm run images`, replace `<ProofSheet />` in `src/components/About.tsx` with an `<img>` |
| 8  | Social sharing image (1200 × 630)  | P2       | Rendered from the demo hero (temporary logo + concept mockups) | WhatsApp, Facebook and X link previews   | Replace `public/og-image.jpg` (keep 1200 × 630, JPG under ~200 KB)                                     |
| 9  | Full service list                  | P1       | 4 provisional services from Google reviews                    | Services, quote form, structured data     | `src/data/services.ts`                                                                                 |
| 10 | Opening hours                      | P2       | Not shown                                                     | Contact section, structured data          | `openingHours` in `src/data/business.ts`                                                               |
| 11 | Map pin / landmark                 | P2       | Google Place ID links                                         | Directions links                          | Confirm the pin on Google Maps; add a landmark line to the Contact or About copy if useful              |
| 12 | Social media profiles              | P2       | None shown                                                    | Footer, structured data (`sameAs`)        | Add to `social` in `src/data/business.ts`                                                              |
| 13 | Business email                     | P3       | None shown                                                    | Structured data                           | `email` in `src/data/business.ts`                                                                      |
| 14 | Slogan / tagline                   | P3       | Brief's headline "Bring Your Ideas to Life."                  | Hero                                      | `src/components/Hero.tsx`                                                                              |
| 15 | Testimonials (with permission)     | P3       | None; only the Google rating                                  | Trust section                             | Add a small testimonials list to `src/components/TrustSection.tsx` once permission is confirmed        |
| 16 | Order process and turnaround       | P2       | Generic three-step process, no timings                        | How It Works                              | `src/data/process.ts`                                                                                  |
| 17 | Delivery / collection              | P2       | "Collection, or delivery where agreed"                        | How It Works                              | `src/data/process.ts`                                                                                  |
| 18 | Live Google rating check           | P1       | 4.9 from 47 reviews (from the brief)                          | Hero, trust section                       | `google` in `src/data/business.ts` (`showRating: false` hides it)                                      |
| 19 | Production domain                  | P2       | None; demo is `noindex`                                       | Canonical URL, sitemap, social image URL  | Set `SITE_URL` and `ALLOW_INDEXING=true` in Vercel (see README)                                        |

## Image guidelines for the owner's photos

- Use only Saye Graphics' own work. No photos from other printers or stock libraries presented as their work.
- Prefer natural light, a plain background and the garment laid flat or worn.
- Use descriptive file names (`navy-team-hoodies-chest-print.jpg`). The optimiser turns them into URL-safe names.
- Leave out customer logos the owner doesn't have permission to show.
- Keep originals in `assets-src/`. They are never deployed; `npm run images` writes WebP versions at 640, 1024 and 1600 px.
