# Saye Graphics Ltd: website demo

A one-page website demo for **Saye Graphics Ltd**, a graphic design, branding and T-shirt/hoodie printing business on Moses Mudavadi Road, Nakuru, Kenya.

> **Status: demo awaiting the owner's input.** All portfolio visuals are illustrative concept mockups (labelled on the site), the logo and colours are temporary, and the build is `noindex` until a production domain is configured. See [`research/`](research/) for sources and what still needs confirming.

**Stack:** React 19, Vite 8, TypeScript 7, Tailwind CSS 4, Lucide icons, self-hosted Manrope font. No backend. The page is prerendered to static HTML at build time and hydrated in the browser.

## Quick start

Requires **Node.js 20.19+** (22 LTS recommended).

```bash
npm install
npm run dev        # http://localhost:5173
```

| Command             | What it does                                                                  |
| ------------------- | ----------------------------------------------------------------------------- |
| `npm run dev`       | Development server with hot reload                                            |
| `npm run build`     | Type-check, build, prerender the page into `dist/`, write `robots.txt`        |
| `npm run preview`   | Serve the production build locally (http://localhost:4173)                    |
| `npm run typecheck` | TypeScript only                                                               |
| `npm run images`    | Optimise owner photos from `assets-src/` into responsive WebP in `public/assets/` |
| `npm run icons`     | Rebuild `favicon-32.png` and `apple-touch-icon.png` from `public/favicon.svg` |

## Deploying to Vercel

1. Push the project to a Git repository and import it in Vercel. `vercel.json` already sets the framework (Vite), build command (`npm run build`) and output directory (`dist`). Alternatively, run `npx vercel` from the project folder.
2. **For the demo**, deploy as is. The page carries `noindex, nofollow` and `robots.txt` disallows crawling, so the unapproved demo stays out of search results.
3. **For production**, once the owner approves and a domain is connected, add these environment variables in Vercel and redeploy:

   | Variable         | Example                          | Effect                                                                 |
   | ---------------- | -------------------------------- | ---------------------------------------------------------------------- |
   | `SITE_URL`       | `https://www.sayegraphics.co.ke` | Adds the canonical URL, `og:url`, absolute social image URL and JSON-LD `url` |
   | `ALLOW_INDEXING` | `true`                           | Removes `noindex`, allows crawling and writes `sitemap.xml`            |

`vercel.json` also caches the hashed bundles in `/static/` for a year and adds basic security headers.

## Where to change things

Everything customer-facing is centralised. You shouldn't need to search through components.

| To change                                         | Edit                                                    |
| ------------------------------------------------- | ------------------------------------------------------- |
| Phone, WhatsApp, address, Google listing, rating, hours, email, social links, logo | `src/data/business.ts` |
| Services (cards, quote form options, structured data) | `src/data/services.ts`                              |
| Portfolio items                                   | `src/data/portfolio.ts`                                 |
| "How It Works" steps                              | `src/data/process.ts`                                   |
| Navigation                                        | `src/data/navigation.ts`                                |
| Colours, type scale, motion                       | `@theme` block at the top of `src/styles/index.css`     |
| Page title, description, social preview text      | `index.html`                                            |
| Social preview image                              | `public/og-image.jpg` (1200 × 630)                      |
| Favicon                                           | `public/favicon.svg`, then `npm run icons`              |

### Replacing the temporary logo and colours

1. Put the official logo in `public/assets/brand/` (SVG preferred).
2. In `src/data/business.ts`, set `logo: { src: '/assets/brand/<file>.svg', width, height }`. The header and footer switch to it automatically.
3. Replace `public/favicon.svg` and run `npm run icons`.
4. Change the colour values in `src/styles/index.css`. The illustrated mockups use the same variables, so they recolour too. Check the contrast notes in that file if the accent changes.

### Adding real portfolio photos

1. Put the originals in `assets-src/portfolio/` with descriptive names.
2. Run `npm run images`. It writes WebP files at 640, 1024 and 1600 px and prints an `image: { … }` line for each photo.
3. Add an entry to `src/data/portfolio.ts` with `kind: 'project'`, the printed `image` line and a descriptive `alt`. Put real projects first; remove the concepts once enough real work is in.

Photos lazy-load and use `srcset`, so phones download the small version.

## How the quote form works

The form needs no server. On submit it validates the four fields (name, service, description, preferred reply), builds a formatted message and opens `https://wa.me/254741556017?text=…` with the message URL-encoded. Nothing is sent until the visitor presses **send** in WhatsApp, and the confirmation screen says so. "Enquire" on a service card, or "Start a similar project" in a portfolio preview, pre-selects the service.

## Project structure

```
src/
  components/
    Navbar, Hero, Services, Portfolio, About, Process, TrustSection,
    Contact, QuoteForm, Footer, FloatingWhatsApp
    art/          illustrated mockups (garments, prints, stationery, compositions)
    portfolio/    portfolio media + accessible preview dialog
    brand/        logo (official file or temporary monogram)
    ui/           buttons, section headings, star rating
  context/        pre-selects a service in the quote form
  data/           business, services, portfolio, process, navigation
  hooks/          scroll reveal, header state, active section, scroll lock
  lib/            link builders, enquiry validation/formatting, text helpers
  seo/            LocalBusiness structured data
  styles/         design tokens + base styles
  entry-server.tsx  used by the prerender step only
scripts/          prerender, image optimisation, icon generation
public/assets/    brand, portfolio, products, workspace, icons
assets-src/       owner originals (not deployed)
research/         facts & sources, owner request, WhatsApp draft, missing assets
```

## SEO

- Title: *Saye Graphics Ltd | Graphic Design & Printing in Nakuru*, plus a meta description, Open Graph and Twitter card tags.
- The full page is prerendered into `dist/index.html`, so search engines and link previews see the content without running JavaScript.
- `LocalBusiness` JSON-LD with name, phone, address, map link and services. Hours, email, social profiles and geo coordinates are added only once confirmed. The Google rating is deliberately **not** marked up as `aggregateRating`: Google treats self-serving review markup as ineligible for rich results.
- Canonical URL and `sitemap.xml` are generated only when `SITE_URL` is set.

## Quality checks performed

Run against both the development server and the production build, in headless Chromium (Playwright):

- **Layouts** at 360, 390, 430, 768, 1024, 1440 and 1920 px: no horizontal overflow at any width.
- **49 automated interaction checks:** mobile menu (open, focus, focus trap, Escape, scroll lock), navigation anchors and active state, `tel:` / WhatsApp / Google Maps links, portfolio preview (keyboard arrows, Escape, backdrop click, focus return, "Start a similar project"), service pre-selection, form validation and focus handling, and the exact encoded WhatsApp message including `&`, quotes, line breaks and en dashes. All pass.
- **Console:** no errors or warnings in development or production, including hydration with animations on.
- **Slow mobile profile** (4× CPU throttle, 1.6 Mbps, 150 ms RTT): first and largest contentful paint about 2.0 s (the headline), cumulative layout shift 0.
- **JavaScript disabled:** every section and the form still render.
- **Accessibility:** one `h1`, labelled landmarks, every control and image named, form fields labelled with linked error messages, visible focus styles, `prefers-reduced-motion` respected, WCAG AA contrast for text (ratios in `src/styles/index.css`).

Not tested: real iOS/Android devices and Safari/Firefox engines (only Chromium was available), and the live Google listing and WhatsApp links, which couldn't be opened from the build environment.

## Still to confirm with the owner

Logo files, brand colours and guidelines, photos of real work and the workspace, the full service and product list, opening hours, map pin and landmark, social profiles, email, tagline, testimonials (with permission), order process and turnaround, delivery or collection, whether `wa.me/sayegraphicsltd` is their official link, and that the Google rating (4.9, 47 reviews) is current. Details in [`research/MISSING_ASSETS.md`](research/MISSING_ASSETS.md); a ready-to-send request is in [`research/OWNER_WHATSAPP_MESSAGE.md`](research/OWNER_WHATSAPP_MESSAGE.md).
