# Performance report

Sizes are in binary units (1 KB = 1,024 bytes). Measured 3 November 2026 on the production build (`npm run build`), served locally with gzip (as Vercel compresses), in headless Google Chrome 156 via Playwright and Lighthouse 13.6.0. "Before" is the first version of the site (commit `f643a3e`, illustrated mockups, no photos) built and measured the same way.

## 1. Original assets

| | Files | Size |
| --- | ---: | ---: |
| Photos (WhatsApp JPEG) | 165 | 22.1 MB |
| Videos (WhatsApp MP4, H.264/AAC, one HEVC) | 24 (4 exact duplicates) | 111.8 MB |
| PDFs (logo, company profile) | 2 | 15.4 MB |
| **Total uploads** | **191** | **149.3 MB** |

All of it was in `public/`, so before this work every deployment would have copied the full 149 MB into `dist/` and uploaded it to Vercel, though the page used none of it. The originals now live, unchanged, in `assets-src/originals/` (excluded from Git and from Vercel uploads). The deployable `dist/` folder is **12.9 MB**.

## 2. Optimised assets

### Photos

38 photos were selected (7.1 MB of source JPEG). Each was cropped as needed and resized only to the widths its slot renders, never upscaled, with metadata removed. Each is written in two formats:

- **AVIF** (quality 52–56, effort 6), served first;
- **WebP** (quality 76–80), the fallback.

| Folder | Images | Widths | Files | On disk (both formats, all widths) |
| --- | ---: | --- | ---: | ---: |
| `hero/` | 3 | 480/720/960 (main), 320/480/640 (tiles) | 18 | 300 KB |
| `services/` | 6 | 400/640/800 | 36 | 900 KB |
| `portfolio/` | 28 | 480/800/1200 (capped at source width) | 154 | 7.2 MB |
| `workspace/` | 1 | 480/719 | 4 | 190 KB |
| **Total** | **38** | | **212** | **8.5 MB** (AVIF 3.5 MB, WebP 5.0 MB) |

The on-disk total is the whole set of variants; a visitor downloads one format at one size per photo. Typical files a phone or laptop actually receives:

| Image | Used as | Source | Delivered (AVIF) |
| --- | --- | ---: | ---: |
| Reception logo wall, 720 w | Hero (LCP) on phones and laptops | 114 KB JPEG (1280 px) | **19 KB** |
| Reception logo wall, 960 w | Hero on 3× phones | | 33 KB |
| Embroidered hoodies, 320 w | Hero tile | 110 KB JPEG | 6 KB |
| Shopfront sign, 800 w | Service card | 135 KB JPEG | 23 KB |
| Teardrop flag, 800 w | Service card | 1,912 KB JPEG (3024 × 4032) | 40 KB |
| Vehicle wrap, 800 w | Portfolio tile | 207 KB JPEG | 34 KB |
| Backlit sign, 1052 w | Portfolio preview | 153 KB JPEG | 73 KB |

AVIF averages about 30% smaller than WebP at matched visual quality here.

### Logo and icons

| File | Size | Gzipped |
| --- | ---: | ---: |
| `PDFLOGO.pdf` (original) | 19 KB | — |
| `saye-graphics-lockup.svg` (header) | 23 KB | 8 KB |
| `saye-graphics-lockup-light.svg` (footer, lazy) | 23 KB | 8 KB |
| `saye-graphics-logo.svg` (full, with tagline) | 57 KB | 18 KB |
| `saye-graphics-mark.svg` (emblem) | 7 KB | 2 KB |
| `favicon.svg` / `favicon-32.png` / `apple-touch-icon.png` | 7 KB / 0.8 KB / 6 KB | |
| `og-image.jpg` (1200 × 630) | 77 KB | |

### Video compression

Four clips, trimmed from the owner's videos and re-encoded silent at 360 × 640, 25 fps. VP9 WebM uses constrained quality (CRF 36, 560 kbps target); the H.264 MP4 fallback is Main profile, about 650 kbps, with its index at the front of the file.

| Clip | Source file | Source size | Kept | WebM | MP4 | Poster |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| Large-format printing | V16 (394 × 848, 6.5 s) | 1.4 MB | 4.3 s | 328 KB | 369 KB | 24 KB |
| Logo embroidery | V10 (476 × 848, 23.7 s) | 4.5 MB | 6.4 s | 306 KB | 529 KB | 9 KB |
| 3D sign letters | V15 (478 × 850, 25.1 s) | 4.0 MB | 7.0 s | 536 KB | 551 KB | 21 KB |
| Installation | V19 (478 × 850, 60.2 s) | 12.3 MB | 6.0 s | 492 KB | 477 KB | 27 KB |
| **Total** | | **22.2 MB** | 23.7 s | **1.62 MB** | **1.88 MB** | **81 KB** |

Each browser downloads one format: Chrome, Edge, Firefox and Android get WebM; Safari gets MP4. Encoding method: the server has no ffmpeg with H.264 support, so Chrome decoded each source frame by frame and its WebCodecs H.264 encoder produced the MP4 (muxed by `scripts/video/mp4mux.mjs`). The same frames were piped to ffmpeg's VP9 encoder for WebM. Both outputs were checked to decode and play in Chrome at the right length and size; the MP4 has not been played in Safari (not available here).

## 3. Loading strategy

**First screen:**

- **Hero photo:** in the prerendered HTML, `fetchpriority="high"`, eager, `srcset`/`sizes` for the slot, AVIF first, intrinsic `width`/`height`, dominant colour as background. It is the only high-priority image.
- **The two smaller hero photos:** eager, normal priority, 6–15 KB each.
- **Stylesheet:** inlined into the HTML (13 KB gzipped), so there is no render-blocking request.
- **Font:** one variable Manrope file (Latin, 24 KB) is preloaded. A metric-matched fallback keeps text from shifting when it arrives.
- **JavaScript (90 KB gzipped):** requested only after the first paint (`requestAnimationFrame` → `setTimeout` → `import()`), then hydrated inside `startTransition` so React works in short slices rather than one long task. The page is complete and its links work before hydration.

**Below the fold:**

- Every other photo uses `loading="lazy"` and `decoding="async"`, with dimensions and a placeholder colour reserving its space (CLS 0).
- Sections below the hero use `content-visibility: auto`, so their layout and paint, and their lazy images, wait until they approach the screen. Initial style and layout work fell from 659 to 516 ms (Lighthouse mobile, 4× CPU slowdown).
- **Video:**
  - Posters are lazy images, not the `poster` attribute, which would have downloaded 83 KB on page load.
  - Videos use `preload="none"` and download only when scrolled to. They play muted, looping and inline while at least 40% visible, and pause off-screen.
  - They never auto-play with reduced motion, Data Saver or a 2G/3G connection; the play button starts them.
- **Portfolio gallery photos** load only when the preview opens.
- **Caching:** hashed JS/CSS/fonts in `/static/` for 1 year (immutable); `/assets/optimized/` for 30 days with stale-while-revalidate.

## 4. What a visitor downloads

Measured by loading the page, then scrolling to the bottom with videos playing:

| | Before: first load | After: first load | After: whole page scrolled |
| --- | ---: | ---: | ---: |
| Desktop 1440 px | 155 KB, 5 requests | **245 KB**, 14 requests | 2.4 MB (photos 628 KB, video 1.62 MB) |
| Phone 390 px @3× | 155 KB, 5 requests | **279 KB**, 10 requests | 2.7 MB (photos 992 KB, video 1.62 MB) |

The first version had no photography at all, so it was lighter, but it showed illustrations instead of the business's work. The first screen now costs about 100–125 KB more and shows three real photos. On a slow connection, the 1.62 MB of video is not downloaded unless the visitor presses play.

Other changes:

- JavaScript went from 92.5 to 89.8 KB gzipped, by deleting the concept-art components.
- The CSS shrank from 59 to 54 KB.
- The page has 816 DOM nodes instead of 1,034.

## 5. Lighthouse

Lighthouse 13.6.0, Chrome 156, three runs per row unless noted (median shown, range in brackets). Both builds are in **production configuration** (`SITE_URL` set, indexing allowed). The preview build is `noindex` by design, which caps SEO at 66 ("page is blocked from indexing"); everything else is identical.

**Default Lighthouse mode** (mobile: Moto G Power emulation, simulated slow 4G at 150 ms RTT and 1.6 Mbps, 4× CPU slowdown):

| | Performance | Accessibility | Best Practices | SEO | FCP | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Mobile, before | 100 (2 runs) | 100 | 100 | 100 | 1.1 s | 1.1 s | 39 ms | 0 |
| **Mobile, after** | **96** (94–96) | **100** | **100** | **100** | **0.86 s** | **2.68 s** | **101 ms** | **0** |
| Desktop, before | 100 (2 runs) | 100 | 100 | 100 | 0.28 s | 0.28 s | 0 ms | 0 |
| **Desktop, after** | **100** | **100** | **100** | **100** | **0.23 s** | **0.56 s** | **0 ms** | **0** |

**Applied throttling** (`throttlingMethod: devtools`: the same network and CPU limits actually applied to the browser rather than simulated; 2 runs each):

| | Performance | FCP | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: |
| Mobile, before | 68 | 3.31 s | 3.31 s | 698 ms | 0 |
| **Mobile, after** | **93–96** | **1.60 s** | **2.00 s** | **272 ms** | **0** |
| Desktop, before | 100 | 0.43 s | 0.43 s | 0 ms | 0 |
| **Desktop, after** | **100** | **0.39 s** | **0.39 s** | **0 ms** | **0** |

How to read this:

- **LCP element.** In the first version it was the headline text (there were no photos). Now it is the hero photo, a much larger and more meaningful element.
- **Default (simulated) mode.** This scores the text-only first version slightly higher on mobile LCP, because the simulation charges all first-render work to the photo's paint. Without throttling, the photo paints in the same frame as the first text (about 0.3 s).
- **Applied throttling.** This actually slows the browser down rather than estimating. Here the new site reaches its first paint twice as fast (3.3 s → 1.6 s) and finishes LCP sooner (3.3 s → 2.0 s) than the old one, despite adding real photography. The gains come from the inlined CSS, deferring hydration until after the first paint and splitting it into slices (`startTransition`), and skipping off-screen layout.
- **Run-to-run variation.** Lab runs on this machine varied by up to 6 points between runs (the earlier preview-configuration baseline scored 93–94 in default mode). Compare ranges, not single numbers.
- **Against the targets.** Performance 95+ was met in default mode (median 96; one run scored 94) and on desktop. Accessibility, Best Practices and SEO 95+ were met (100). CLS ≤ 0.1 was met (0). LCP ≤ 2.5 s was met under applied throttling (2.0 s) and on desktop, but not in the default simulation (2.68 s). INP can't be measured in a lab; Total Blocking Time, its lab proxy, is 0–272 ms depending on mode.

Earlier iterations during this work, for reference (default mode, mobile, preview configuration unless noted):

| Change | Performance | LCP | TBT |
| --- | ---: | ---: | ---: |
| First build with real photos | 91 | 3.0 s | 188 ms |
| + Inlined CSS, hydration after first paint | 94 | 3.0 s | 47–193 ms |
| + Lazy video posters, JS fetched after paint | 94–95 | 2.66 s | 130–193 ms |
| + `content-visibility` on lower sections | 93–96 | 2.67 s | 153 ms |
| + Hydration in `startTransition` (final, production configuration) | 94–96 | 2.68 s | 101 ms |

## 6. Remaining bottlenecks and limits

- **Simulated mobile LCP.** Lighthouse's default simulation estimates the hero photo's paint at about 2.7 s, against a 2.5 s target. Under applied throttling the LCP is under 2 s, and with no throttling the photo paints with the first frame. The simulation charges all of the page's first-render work to the photo; the remaining cost is mostly the 28 KB of HTML (the full prerendered page plus inlined CSS) and round-trips on a simulated 150 ms link. On Vercel (HTTP/2, Brotli, CDN) real numbers should be at least as good as measured here, but this was not measured on the live site.
- **JavaScript.** React needs about 90 KB gzipped to make the menu, gallery, form and videos interactive. Lighthouse reports about 40 KB as unused at load, which is normal for React. Hydrating in `startTransition` keeps simulated blocking time around 100 ms; under applied 4× CPU slowdown it is still about 270 ms. If more is needed, the next step is loading the quote form and gallery code on demand.
- **Source quality.** Most photos are WhatsApp copies (720–1600 px), which limits sharpness on large retina screens; nothing was upscaled. Full-resolution originals would allow sharper 1200–1600 px variants.
- **Full-page screenshots.** Because of `content-visibility`, browser "capture full page" tools show sections the visitor hasn't scrolled to as blank. Real scrolling and printing are unaffected.
- **Not measured:** real devices, Safari and Firefox, and the deployed Vercel site (no network access from the build environment). Run PageSpeed Insights on the live URL after deploying.

## 7. Production build and deployment verification

- `npm run build` (type-check, client build, SSR build, prerender) completes with no errors or warnings. The dev server (`npm run dev`) also renders every section with no console messages.
- `dist/` is 12.9 MB, 241 files: prerendered `index.html` (inlined CSS), hashed JS and fonts in `/static/`, `/assets/optimized/` (photos, logo, videos), icons, `og-image.jpg`, `robots.txt`.
- Every asset path is absolute from the site root and inside `dist/`. Loading the production build at nine widths and scrolling the whole page produced **no 404s, no failed requests and no console errors or warnings**.
- In production configuration (`SITE_URL=https://www.sayegraphics.co.ke ALLOW_INDEXING=true`) the build writes the canonical link, `og:url`, an absolute `og:image` URL, the JSON-LD `url`/`image`/`logo`, a `robots.txt` that allows crawling and a `sitemap.xml`. Without them it is `noindex` with a disallowing `robots.txt`. Both were checked in the built files.
- `vercel.json`: framework Vite, `npm run build`, output `dist`; cache headers for `/static/` (1 year, immutable) and `/assets/optimized/` (30 days); security headers unchanged. `.vercelignore` keeps the 150 MB of originals out of CLI uploads; `.gitignore` keeps them out of Git.
- The site has not been deployed from here (no network access). After deploying, check the live URL with PageSpeed Insights and open it on an iPhone, to confirm Safari plays the MP4 fallback clips.
