# Saye Graphics Ltd: website

A one-page website for **Saye Graphics Ltd**, a branding, signage and printing business on Moses Mudavadi Road, Nakuru, Kenya (established 2016).

The site uses the business's own logo and photographs: 38 photos and 4 short workshop clips chosen from the owner's uploads. Research notes, the asset inventory and the selection and performance reports are in [`research/`](research/). The build is `noindex` until a production domain is configured (see Deploying).

**Stack:** React 19, Vite 8, TypeScript 7, Tailwind CSS 4, Lucide icons, self-hosted Manrope font, sharp for image processing. No backend. The page is prerendered to static HTML at build time and hydrated in the browser after its first paint.

## Quick start

Requires **Node.js 20.19+** (22 LTS recommended).

```bash
npm install
npm run dev        # http://localhost:5173
```

| Command             | What it does                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| `npm run dev`       | Development server with hot reload                                                               |
| `npm run build`     | Type-check, build, prerender the page into `dist/`, write `robots.txt`                           |
| `npm run preview`   | Serve the production build locally (http://localhost:4173)                                       |
| `npm run typecheck` | TypeScript only                                                                                  |
| `npm run media`     | Crop and convert the selected photos to AVIF + WebP (`npm run media -- <key>` for just one)      |
| `npm run logo`      | Convert the official logo PDF into the SVG logo files                                            |
| `npm run icons`     | Rebuild `favicon.svg`, `favicon-32.png` and `apple-touch-icon.png` from the logo emblem          |
| `npm run videos`    | Trim and re-encode the workshop clips (needs Chrome and Playwright; see the script header)       |

The `media`, `logo` and `videos` scripts read the originals in `assets-src/originals/`. Their output is already in `public/assets/optimized/`, so you only need to run them when changing which photos or clips are used.

## Deploying to Vercel

1. Push the project to a Git repository and import it in Vercel. `vercel.json` already sets the framework (Vite), build command (`npm run build`) and output directory (`dist`). Alternatively, run `npx vercel` from the project folder.
2. **For a preview**, deploy as is. The page carries `noindex, nofollow` and `robots.txt` disallows crawling.
3. **For production**, once the owner approves and a domain is connected, add these environment variables in Vercel and redeploy:

   | Variable         | Example                          | Effect                                                                        |
   | ---------------- | -------------------------------- | ----------------------------------------------------------------------------- |
   | `SITE_URL`       | `https://www.sayegraphics.co.ke` | Adds the canonical URL, `og:url`, absolute social image and logo URLs, JSON-LD `url` |
   | `ALLOW_INDEXING` | `true`                           | Removes `noindex`, allows crawling and writes `sitemap.xml`                   |

`vercel.json` caches the hashed bundles in `/static/` for a year and the optimised media in `/assets/optimized/` for 30 days, and adds basic security headers.

The 150 MB of original uploads in `assets-src/originals/` are excluded from Git (`.gitignore`) and from Vercel uploads (`.vercelignore`). The build doesn't need them. **Keep a backup of that folder**: it is the only copy of the originals in the project.

## Where to change things

Everything customer-facing is centralised. You shouldn't need to search through components.

| To change                                                       | Edit                                                 |
| --------------------------------------------------------------- | ---------------------------------------------------- |
| Phone, WhatsApp, address, Google listing, rating, hours, email, social links, tagline | `src/data/business.ts`        |
| Which photo or video appears where, and its alt text            | `src/data/media.ts`                                  |
| How each photo is cropped and which sizes are made              | `scripts/media-manifest.mjs`, then `npm run media`  |
| Services (cards, quote form options, structured data)           | `src/data/services.ts`                               |
| Portfolio projects and their galleries                          | `src/data/portfolio.ts`                              |
| "How It Works" steps                                            | `src/data/process.ts`                                |
| Navigation                                                      | `src/data/navigation.ts`                             |
| Colours, type scale, motion                                     | `@theme` block at the top of `src/styles/index.css`  |
| Page title, description, social preview text                    | `index.html`                                         |
| Social preview image                                            | Built by `npm run media` into `public/og-image.jpg`  |

### Adding or swapping a photo

1. Put the original in `assets-src/originals/`.
2. Add an entry to `scripts/media-manifest.mjs` with a `key`, folder, descriptive `slug`, optional crop and the widths the layout needs.
3. Run `npm run media -- <key>`. It writes `public/assets/optimized/<folder>/<slug>-<width>.avif|webp` and updates `src/data/media.generated.ts` with the real dimensions and a placeholder colour.
4. In `src/data/media.ts`, describe the photo (alt text) and use it in a section, a service or a portfolio project.

Every photo is served through `ResponsivePhoto` (`src/components/ui/ResponsivePhoto.tsx`): AVIF with a WebP fallback, `srcset`/`sizes`, intrinsic dimensions, the dominant colour as a placeholder, and lazy loading unless marked `priority` (the main hero photo only) or `eager`.

## How the quote form works

The form needs no server. On submit it validates the four fields (name, service, description, preferred reply), builds a formatted message and opens `https://wa.me/254741556017?text=…` with the message URL-encoded. Nothing is sent until the visitor presses **send** in WhatsApp, and the confirmation screen says so. "Enquire" on a service card, or "Start a similar project" in a portfolio preview, pre-selects the service.

## Project structure

```
src/
  components/
    Navbar, Hero, Services, Portfolio, About, Process, TrustSection,
    Contact, QuoteForm, Footer, FloatingWhatsApp
    portfolio/    accessible preview dialog with photo gallery
    brand/        official logo (SVG)
    ui/           ResponsivePhoto, LoopVideo, buttons, section headings, stars, registration mark
  context/        pre-selects a service in the quote form
  data/           business, media (+ generated sizes), services, portfolio, process, navigation
  hooks/          scroll reveal, header state, active section, scroll lock
  lib/            link builders, enquiry validation/formatting, text helpers
  seo/            LocalBusiness structured data
  styles/         design tokens + base styles
  entry-server.tsx  used by the prerender step only
scripts/          prerender, media pipeline + manifest, logo converter, icons, video/ (clip transcoder)
public/assets/optimized/   brand, hero, services, portfolio, workspace, video
assets-src/originals/      owner's original uploads (not deployed, not in Git)
research/         asset inventory, image selection, performance, facts & sources, owner requests
```

## SEO

- Title *Saye Graphics Ltd | Branding, Signage & Printing in Nakuru*, a local meta description, Open Graph and Twitter card tags, and a 1200 × 630 social image (official logo beside the reception-sign photo).
- The full page is prerendered into `dist/index.html`, so search engines and link previews see the content and images without running JavaScript.
- `LocalBusiness` JSON-LD: name, slogan, founding year, phone, address, map link, six services, and the social profiles listed in the company profile; logo and image URLs once `SITE_URL` is set. Hours, email and geo coordinates are added only once confirmed. The Google rating is deliberately **not** marked up as `aggregateRating`: Google treats self-serving review markup as ineligible for rich results.
- Every photo has descriptive alt text written from what it shows; decorative images use empty alt text.

## Performance

Measured before and after this upgrade; full figures and method are in [`research/PERFORMANCE_REPORT.md`](research/PERFORMANCE_REPORT.md).

| Lighthouse, production config                      | Performance | Accessibility | Best Practices | SEO | LCP    | CLS |
| -------------------------------------------------- | ----------- | ------------- | -------------- | --- | ------ | --- |
| Mobile, default (simulated slow 4G)                | 96 (94–96)  | 100           | 100            | 100 | 2.68 s | 0   |
| Mobile, applied throttling                         | 93–96       | 100           | 100            | 100 | 2.0 s  | 0   |
| Desktop                                            | 100         | 100           | 100            | 100 | 0.56 s | 0   |

First screen: about 245 KB on desktop and 280 KB on a phone, including the three hero photos.

- Hero photo: AVIF, `fetchpriority="high"`, discoverable in the HTML, about 20 KB on a phone.
- Everything below the first screen loads on approach: lazy photos, video posters as lazy images, videos with `preload="none"` that load only when scrolled to (and never auto-play with reduced motion, Data Saver or a 2G/3G connection).
- The stylesheet is inlined and the JavaScript is requested only after the first paint, so slow phones show the page before hydrating it.
- Sections below the hero use `content-visibility: auto`. A side effect: browser "full-page screenshot" tools capture sections that haven't been scrolled into view as blank. Scroll through the page first, or print to PDF, to capture it whole.

## Quality checks performed

Run against the production build in headless Chrome (Playwright), 3 November 2026:

- **Layouts** at 360, 375, 390, 430, 768, 1024, 1280, 1440 and 1920 px: no horizontal overflow, no broken images, no failed requests, no console errors or warnings.
- **48 automated checks, all passing:** one `h1` and structured data; one high-priority image (the hero), served as AVIF; lazy loading; alt text and dimensions on every image; no video downloaded on first load; navigation anchors on desktop and mobile; mobile menu; `tel:`, WhatsApp and Instagram links; service pre-selection; portfolio preview (gallery thumbnails, arrow keys, Escape, focus return, "Start a similar project"); videos playing only while visible, pausing off-screen, pause/play button, WebM chosen in Chrome; reduced motion (no autoplay, no video download, play button works); form validation and the exact encoded WhatsApp message; JavaScript disabled (all sections and photos render).
- **Lighthouse** (mobile and desktop, several runs): see the performance report.

Not tested: real iOS/Android devices and the Safari/Firefox engines (only Chromium-based browsers were available), so the MP4 fallback was verified in Chrome but not in Safari; the live Google listing, WhatsApp and social links, which couldn't be opened from the build environment.

## Still to confirm with the owner

- Opening hours, email and map pin.
- Whether the shop address should read **Resma Plaza, Ground Floor, Room G11** (printed on the business's roll-up banner) alongside or instead of Moses Mudavadi Road.
- That the `@sayegraphics` Instagram, TikTok and Facebook URLs are correct.
- Permission to name clients (the portfolio describes the work without naming clients).
- Whether the bank gift-set image (P058) is a photo of a delivered job.
- Whether `wa.me/sayegraphicsltd` is their official link.
- That the Google rating (4.9, 47 reviews) is current.

Details in [`research/MISSING_ASSETS.md`](research/MISSING_ASSETS.md).
