# Asset inventory

Every file the owner uploaded on 2 November 2026, inspected visually (contact sheets of all photos, frame strips of every video, every page of both PDFs). Prepared 3 November 2026.

**Where the files are:** the uploads arrived in `public/`. They have been moved, unchanged, to `assets-src/originals/` so they are kept but no longer copied into every deployment (they totalled 150 MB). Filenames are unchanged.

**IDs:** P001–P003 were the existing site icons; P004–P168 are the uploaded photos in timestamp order; V01–V24 the videos. The IDs are used in the other reports.

**Column notes:** *Hero* = could work as a hero image. *Cover* = suitable as a portfolio/section cover. *Format* = what the site serves for used images (AVIF with WebP fallback, several widths); unused images would be prepared the same way.

## Summary

| | Count |
| --- | ---: |
| Photos (JPEG, WhatsApp-compressed) | 165 (one exact duplicate) |
| Videos (MP4) | 24 (4 byte-identical duplicates → 20 unique) |
| PDFs | 2 (logo, company profile) |
| Photos used on the site | 38 |
| Videos used (trimmed clips) | 4 |
| Total size of uploads | 149.3 MB (photos 22.1 MB, videos 111.8 MB, PDFs 15.4 MB) |

Most photos are 720–1600 px on the long side because WhatsApp recompresses them. Only P083 (3024 x 4032) is full camera resolution. No photo was upscaled.

## 1. Brand identity

| File | Format | Size | What it is | Use |
| --- | --- | --- | --- | --- |
| `PDFLOGO.pdf` | PDF 1.5 (CorelDRAW export), 541 x 541 pt | 19 KB | **Official logo.** Vector: sun-rays, crescent moon and four-point star forming an "S" (bronze #8A5F35 and teal #336B86), wordmark "Saye Graphics" in a high-contrast display face (embedded "Arka Typeface DEMO" font) with a teal-to-bronze gradient, tagline "Your Trustworthy & Reliable Partner." | Converted to exact SVGs by `scripts/logo-to-svg.mjs`: full logo, header lockup, one-colour light lockup, emblem (favicon). Brand colours taken from it. |
| `saye company profle.pdf` | PDF, 20 landscape pages | 15.4 MB | Company profile: established 2016; aim, mission and values; services (personal branding, business collateral & printing, promotional material, logo design, outdoor marketing, signage, banners & stickers, letterheads, delivery/fee notes, receipts, roll-up banners, teardrops & backdrops, street-pole "boxes"); target market (startups, SMEs, corporates, NGOs); client logos; contact +254 741 556017, @sayegraphics on TikTok, Instagram, Facebook. | Text facts used in About, Services, structured data and footer. No page images reused (pages are designed layouts with stock city photography). Note: page 2 contains "EMA strives…", text left over from another company’s template; not reused. |

| ID | File | Pixels | Aspect | Size | What it shows | Quality | Hero | Cover | Use on site | Format |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| P004 | `…9.19.55 PM.jpeg` | 1600 x 1521 | 1.05 | 435 KB | Saye Graphics roll-up banner design (logo, service lists, phone, "Resma Plaza, Ground Floor, Room G11") placed in a stock shopping-mall render; credits a Fiverr designer | Good | No | Yes | Not shown (mockup). Used as a source for the service list and brand colours | — |

## 2. Hero candidates

The three photos chosen for the hero, plus the candidates considered. See IMAGE_SELECTION_REPORT.md for the reasoning.

| ID | File | Pixels | Aspect | Size | What it shows | Quality | Hero | Cover | Use on site | Format |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| P043 | `…9.35.00 PM.jpeg` | 1280 x 960 | 4:3 | 114 KB | Reception wall: gold mirror-acrylic 3D logo and raised white "Dashing Divas Beauty Parlour" letters on charcoal; photographer watermark at right edge, monitor at left | High | Yes | Yes | HERO main image (cropped 3:2 to exclude watermark and monitor); social preview image | AVIF + WebP |
| P124 | `…9.37.30 PM (3).jpeg` | 1280 x 1150 | 1.11 | 110 KB | Two grey hoodies embroidered with a colourful "Kenya" design | High | Yes | Yes | HERO tile (4:3 crop) | AVIF + WebP |
| P165 | `…10.00.02 PM (1).jpeg` | 1080 x 1440 | 3:4 | 98 KB | Teal and gold wedding invitations with name tags | High | Yes | Yes | HERO tile (4:3 crop) | AVIF + WebP |

## 3. Featured portfolio

Covers and gallery photos of the 12 portfolio projects.

| ID | File | Pixels | Aspect | Size | What it shows | Quality | Hero | Cover | Use on site | Format |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| P034 | `…9.34.56 PM.jpeg` | 960 x 826 | 1.16 | 198 KB | Rear of the wrapped station wagon with slogan and number-plate panel | Good | No | Yes | Portfolio: Full Vehicle Wrap gallery | AVIF + WebP |
| P035 | `…9.34.56 PM (1).jpeg` | 1200 x 1600 | 3:4 | 287 KB | Rear quarter of the wrapped station wagon (portrait) | Good | No | Yes | Portfolio: Full Vehicle Wrap gallery | AVIF + WebP |
| P036 | `…9.34.56 PM (2).jpeg` | 1280 x 960 | 4:3 | 238 KB | The same silver station wagon before wrapping | Good | No | Yes | Portfolio: Full Vehicle Wrap gallery ("before") | AVIF + WebP |
| P037 | `…9.34.57 PM.jpeg` | 1600 x 1200 | 4:3 | 207 KB | Side of the wrapped station wagon: logo, photos, slogans; vinyl offcuts on the ground | High | No | Yes | Portfolio: Full Vehicle Wrap cover | AVIF + WebP |
| P056 | `…9.35.05 PM (1).jpeg` | 747 x 1328 | 9:16 | 166 KB | Red rescue ambulance with printed lettering (portrait) | Good | No | Yes | Portfolio: Ambulance Livery gallery | AVIF + WebP |
| P059 | `…9.35.06 PM (2).jpeg` | 762 x 928 | 0.82 | 46 KB | Bank-branded umbrella | Good | No | Yes | Portfolio: Corporate Gift Range gallery | AVIF + WebP |
| P060 | `…9.35.06 PM (3).jpeg` | 720 x 900 | 4:5 | 56 KB | Two bank-branded wall clocks | Good | No | Yes | Portfolio: Corporate Gift Range gallery | AVIF + WebP |
| P061 | `…9.35.07 PM.jpeg` | 1080 x 1350 | 4:5 | 72 KB | White mugs with a blue bank logo | High | No | Yes | Portfolio: Corporate Gift Range cover | AVIF + WebP |
| P062 | `…9.35.07 PM (1).jpeg` | 963 x 1280 | 3:4 | 142 KB | Safari company T-shirts with African-print headbands | High | No | Yes | Portfolio: Branded T-Shirts & Caps cover | AVIF + WebP |
| P063 | `…9.35.07 PM (2).jpeg` | 963 x 1280 | 3:4 | 76 KB | Rows of white caps with the safari company logo | Good | No | Yes | Portfolio: Branded T-Shirts & Caps gallery | AVIF + WebP |
| P065 | `…9.35.08 PM.jpeg` | 963 x 1280 | 3:4 | 73 KB | White tumbler printed with the same flame logo | Good | No | Yes | Portfolio: Embroidered Hoodies gallery | AVIF + WebP |
| P066 | `…9.35.08 PM (1).jpeg` | 963 x 1280 | 3:4 | 100 KB | Multi-head embroidery machine with two embroidered hoodies | High | No | Yes | Portfolio: Embroidered Hoodies cover | AVIF + WebP |
| P068 | `…9.35.09 PM.jpeg` | 1280 x 963 | 4:3 | 63 KB | Seven insulated bottles, each with a logo and a name | High | No | Yes | Portfolio: Personalised Water Bottles cover | AVIF + WebP |
| P082 | `…9.37.10 PM.jpeg` | 1280 x 1016 | 5:4 | 141 KB | Curved printed backdrop behind a 360° photo booth, red carpet | High | No | Yes | Portfolio: Curved Event Backdrop cover | AVIF + WebP |
| P086 | `…9.37.14 PM (1).jpeg` | 1280 x 721 | 16:9 | 129 KB | Yellow and green ambulance by a road (wide) | Good | No | Yes | Portfolio: Ambulance Livery gallery | AVIF + WebP |
| P091 | `…9.37.16 PM (1).jpeg` | 1280 x 960 | 4:3 | 114 KB | Ambulance with chequered livery, red lettering and hotline | High | No | Yes | Portfolio: Ambulance Livery cover | AVIF + WebP |
| P127 | `…9.37.32 PM.jpeg` | 1052 x 1280 | 0.82 | 153 KB | Round backlit logo sign with halo, hand fixing it to a wall | High | Yes | Yes | Portfolio: Round Backlit Sign cover | AVIF + WebP |
| P130 | `…9.37.34 PM.jpeg` | 720 x 960 | 3:4 | 95 KB | Lodge directional signpost being installed | Good | No | Yes | Portfolio: Directional Signpost cover | AVIF + WebP |
| P135 | `…9.39.43 PM.jpeg` | 1065 x 1084 | 1:1 | 124 KB | Colour-coded acrylic school door signs | Good | No | Yes | Portfolio: Plaques & Door Signs gallery | AVIF + WebP |
| P137 | `…9.39.44 PM.jpeg` | 720 x 630 | 1.14 | 288 KB | Brass floor signs | Good | No | Yes | Portfolio: Plaques & Door Signs gallery | AVIF + WebP |
| P138 | `…9.39.45 PM.jpeg` | 763 x 768 | 1:1 | 395 KB | Brushed silver clinic door signs | Good | No | Yes | Portfolio: Plaques & Door Signs gallery | AVIF + WebP |
| P139 | `…9.39.45 PM (1).jpeg` | 766 x 760 | 1:1 | 297 KB | Two engraved brass plaques for a law firm | Good | No | Yes | Portfolio: Plaques & Door Signs cover | AVIF + WebP |
| P149 | `…9.46.37 PM.jpeg` | 844 x 1500 | 9:16 | 111 KB | Pole banners along a dual carriageway | Good | No | Yes | Portfolio: Street-Pole Banners gallery | AVIF + WebP |
| P150 | `…9.46.39 PM.jpeg` | 960 x 1280 | 3:4 | 106 KB | Green campaign banners on lamp posts, traffic below | Good | No | Yes | Portfolio: Street-Pole Banners cover | AVIF + WebP |
| P153 | `…9.46.54 PM.jpeg` | 960 x 1280 | 3:4 | 107 KB | Pole banner close-up with highway | Good | No | Yes | Portfolio: Street-Pole Banners gallery | AVIF + WebP |
| P164 | `…10.00.02 PM.jpeg` | 960 x 1280 | 3:4 | 186 KB | Pale blue wedding invitations with tulle | Good | No | Yes | Portfolio: Wedding Invitations gallery | AVIF + WebP |
| P166 | `…10.00.03 PM.jpeg` | 1080 x 810 | 4:3 | 124 KB | Silver laser-cut lace invitations with yellow bows | High | No | Yes | Portfolio: Wedding Invitations cover | AVIF + WebP |
| P168 | `…10.00.03 PM (2).jpeg` | 1080 x 1440 | 3:4 | 170 KB | Gold lace invitations with burgundy bands | High | No | Yes | Portfolio: Wedding Invitations gallery | AVIF + WebP |

## 4. Services

One photo per service card, cropped 4:3.

| ID | File | Pixels | Aspect | Size | What it shows | Quality | Hero | Cover | Use on site | Format |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| P032 | `…9.34.55 PM.jpeg` | 928 x 717 | 1.29 | 183 KB | Station wagon with a blue and white branded bonnet wrap (front view) | Good | No | Yes | Services: Vehicle Branding card | AVIF + WebP |
| P057 | `…9.35.06 PM.jpeg` | 1080 x 1350 | 4:5 | 85 KB | Blue sports bottles printed with a bank logo, red background | High | No | Yes | Services: Promotional Items card | AVIF + WebP |
| P064 | `…9.35.07 PM (3).jpeg` | 963 x 1280 | 3:4 | 79 KB | Black hoodies with an embroidered flame logo | Good | No | Yes | Services: Branded Apparel card | AVIF + WebP |
| P083 | `…9.37.12 PM.jpeg` | 3024 x 4032 | 3:4 | 1.9 MB | Hospital teardrop flag at an outdoor event, sunset sky (3024 x 4032) | High | Yes | Yes | Services: Large-Format & Outdoor card (4:3 crop); hero candidate | AVIF + WebP |
| P131 | `…9.39.32 PM.jpeg` | 960 x 1280 | 3:4 | 135 KB | Butchery shopfront with a black sign board and white 3D letters | Good | No | Yes | Services: Signage card (4:3 crop) | AVIF + WebP |
| P167 | `…10.00.03 PM (1).jpeg` | 1080 x 1440 | 3:4 | 177 KB | Navy laser-cut wedding invitations with gold foil | High | No | Yes | Services: Design & Print card | AVIF + WebP |

## 5. Product photography

Genuine product photos that are fine but not used: the portfolio already covers these categories with stronger images.

| ID | File | Pixels | Aspect | Size | What it shows | Quality | Hero | Cover | Use on site | Format |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| P019 | `…9.34.50 PM.jpeg` | 1280 x 826 | 1.55 | 110 KB | Personalised jute bags with couples’ initials on a printer bed | Good | No | Yes | Not used: same job as video V07 | — |
| P021 | `…9.34.50 PM (2).jpeg` | 1200 x 1600 | 3:4 | 265 KB | Two school-admission roll-up banners outside a shop | Good | No | Yes | Not used: roll-ups are represented in the Large-Format service; photo contains children | — |
| P022 | `…9.34.50 PM (3).jpeg` | 960 x 1280 | 3:4 | 67 KB | White T-shirt printed "Full of Good Vibes" in a poly bag | Good | No | Yes | Not used: apparel already well covered | — |
| P023 | `…9.34.51 PM.jpeg` | 591 x 1280 | 0.46 | 67 KB | Black sports-club hoodie, shoe in frame | Fair | No | No | Not used: awkward framing | — |
| P024 | `…9.34.51 PM (1).jpeg` | 960 x 1280 | 3:4 | 104 KB | Bar & grill hoodies and T-shirts in a pile | Fair | No | No | Not used | — |
| P027 | `…9.34.52 PM (2).jpeg` | 1280 x 1201 | 1.07 | 145 KB | Canvas prints (elephant at sunset artwork) | Good | No | Yes | Not used: artwork origin unknown | — |
| P049 | `…9.35.03 PM (1).jpeg` | 720 x 1241 | 0.58 | 55 KB | White caps printed with a motor dealer logo; caption overlay "Cap branding" | Fair | No | No | Not used: text overlay | — |
| P050 | `…9.35.03 PM (2).jpeg` | 720 x 938 | 0.77 | 83 KB | Pile of acrylic key holders with a utility company logo | Good | No | Yes | Not used | — |
| P054 | `…9.35.04 PM (2).jpeg` | 960 x 1280 | 3:4 | 167 KB | Green printed lanyards on a desk | Good | No | Yes | Not used | — |
| P055 | `…9.35.05 PM.jpeg` | 960 x 1280 | 3:4 | 73 KB | Pink branded paper gift bags | Fair | No | No | Not used | — |
| P067 | `…9.35.08 PM (2).jpeg` | 1200 x 1600 | 3:4 | 336 KB | Canvas tote printed "God is Able", studio-style shot | Good | No | Yes | Not used | — |
| P069 | `…9.36.46 PM.jpeg` | 1200 x 1600 | 3:4 | 170 KB | Blue printed lanyards on a white desk | Good | No | Yes | Not used | — |
| P070 | `…9.36.46 PM (1).jpeg` | 1200 x 1600 | 3:4 | 207 KB | Lanyards on a table, feet in frame | Fair | No | No | Not used | — |
| P071 | `…9.36.50 PM.jpeg` | 1200 x 1600 | 3:4 | 185 KB | TV-station flyers fanned in a hand; photographer watermark | Good | No | Yes | Not used: watermark | — |
| P075 | `…9.37.02 PM.jpeg` | 960 x 1280 | 3:4 | 140 KB | Branded reflective vests on a table | Good | No | Yes | Not used: apparel already covered | — |
| P076 | `…9.37.03 PM.jpeg` | 1152 x 2048 | 9:16 | 176 KB | Reflective vests next to a monitor | Fair | No | No | Not used | — |
| P078 | `…9.37.05 PM.jpeg` | 960 x 1280 | 3:4 | 72 KB | Button badges for a club | Fair | No | No | Not used | — |
| P080 | `…9.37.08 PM.jpeg` | 1080 x 1117 | 0.97 | 81 KB | Back of a spare-wheel cover held up | Fair | No | No | Not used | — |
| P090 | `…9.37.16 PM.jpeg` | 720 x 960 | 3:4 | 50 KB | Stack of reflective vests by a printer | Fair | No | No | Not used | — |
| P096 | `…9.37.19 PM.jpeg` | 1600 x 1200 | 4:3 | 150 KB | Revenue-authority lapel pin in a hand | Fair | No | No | Not used | — |
| P097 | `…9.37.19 PM (1).jpeg` | 1600 x 1200 | 4:3 | 92 KB | Flag lapel pins on paper | Fair | No | No | Not used | — |
| P098 | `…9.37.20 PM.jpeg` | 1600 x 1200 | 4:3 | 135 KB | Plain gold pin in a palm | Low | No | No | Not used | — |
| P100 | `…9.37.21 PM.jpeg` | 720 x 960 | 3:4 | 53 KB | Resort staff name badges | Fair | No | No | Not used | — |
| P101 | `…9.37.22 PM.jpeg` | 720 x 576 | 5:4 | 27 KB | Metal key holders on a book, 720 x 576 | Low | No | No | Not used: small | — |
| P102 | `…9.37.23 PM.jpeg` | 720 x 540 | 4:3 | 49 KB | Name badges laid out on a table | Fair | No | No | Not used: personal names | — |
| P104 | `…9.37.24 PM.jpeg` | 572 x 1020 | 9:16 | 54 KB | Garden venue caps | Fair | No | No | Not used | — |
| P105 | `…9.37.24 PM (1).jpeg` | 572 x 1020 | 9:16 | 64 KB | Printed silicone wristbands | Fair | No | No | Not used | — |
| P106 | `…9.37.24 PM (2).jpeg` | 572 x 1020 | 9:16 | 45 KB | Athletics caps | Fair | No | No | Not used | — |
| P107 | `…9.37.24 PM (3).jpeg` | 720 x 540 | 4:3 | 46 KB | Embroidered polo shirts for a workers’ agency, 720 x 540 | Fair | No | No | Not used: small | — |
| P108 | `…9.37.25 PM.jpeg` | 720 x 540 | 4:3 | 52 KB | Security reflective vests on a balcony, 720 x 540 | Fair | No | No | Not used | — |
| P109 | `…9.37.25 PM (1).jpeg` | 720 x 540 | 4:3 | 44 KB | Branded reflective vests, 720 x 540 | Fair | No | No | Not used | — |
| P113 | `…9.37.27 PM.jpeg` | 720 x 1280 | 9:16 | 130 KB | Domed school title stickers | Fair | No | No | Not used | — |
| P115 | `…9.37.27 PM (2).jpeg` | 1068 x 1280 | 0.83 | 164 KB | Orange T-shirts for a women’s meet-up | Good | No | Yes | Not used | — |
| P119 | `…9.37.29 PM (1).jpeg` | 1029 x 1280 | 4:5 | 119 KB | Branded umbrella | Fair | No | No | Not used | — |
| P120 | `…9.37.29 PM (2).jpeg` | 1111 x 1280 | 0.87 | 99 KB | Black T-shirt with "I ❤ Kikuyu" print | Good | No | Yes | Not used | — |
| P122 | `…9.37.30 PM (1).jpeg` | 720 x 720 | 1:1 | 40 KB | Non-woven bags for a maternity brand | Fair | No | No | Not used | — |
| P125 | `…9.37.31 PM.jpeg` | 720 x 712 | 1:1 | 48 KB | Hoodies printed for a short-stay company | Fair | No | No | Not used | — |
| P134 | `…9.39.38 PM.jpeg` | 589 x 712 | 0.83 | 270 KB | Gold washroom signs, 589 x 712 | Fair | No | No | Not used: small | — |
| P136 | `…9.39.43 PM (1).jpeg` | 795 x 1309 | 0.61 | 88 KB | Red school award plates | Fair | No | No | Not used | — |
| P140 | `…9.39.46 PM.jpeg` | 670 x 879 | 3:4 | 326 KB | Silver staff name badges | Fair | No | No | Not used: personal names | — |
| P141 | `…9.39.46 PM (1).jpeg` | 651 x 854 | 3:4 | 242 KB | Yellow acrylic document box | Fair | No | No | Not used | — |
| P146 | `…9.46.08 PM.jpeg` | 960 x 1280 | 3:4 | 122 KB | Avocado-oil bottles with printed labels | Good | No | Yes | Not used: alternative for label printing | — |
| P147 | `…9.46.12 PM.jpeg` | 960 x 1280 | 3:4 | 120 KB | Branded plastic cups | Good | No | Yes | Not used | — |
| P157 | `…9.59.56 PM.jpeg` | 900 x 1600 | 9:16 | 305 KB | Printed lids/labels for a dairy brand | Good | No | Yes | Not used | — |
| P159 | `…9.59.57 PM.jpeg` | 1600 x 900 | 16:9 | 231 KB | Restaurant menu stands on a counter | Good | No | Yes | Not used | — |
| P160 | `…9.59.59 PM.jpeg` | 1440 x 1305 | 1.10 | 148 KB | Branded pens in a hand | Good | No | Yes | Not used | — |

## 6. Production and workspace

| ID | File | Pixels | Aspect | Size | What it shows | Quality | Hero | Cover | Use on site | Format |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| P025 | `…9.34.52 PM.jpeg` | 1280 x 960 | 4:3 | 119 KB | Eco-solvent large-format printer in a bright showroom with printed T-shirts on the wall | Good | No | Yes | Not used: cannot confirm it is the Saye Graphics premises | — |

## 7. About section

| ID | File | Pixels | Aspect | Size | What it shows | Quality | Hero | Cover | Use on site | Format |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| P085 | `…9.37.14 PM.jpeg` | 719 x 960 | 3:4 | 78 KB | Large-format printer printing a full-colour banner, print rolling onto the floor | Good | No | Yes | About section photo | AVIF + WebP |

## 8. Supporting content

Real jobs of acceptable quality kept in reserve. Several would suit future portfolio updates.

| ID | File | Pixels | Aspect | Size | What it shows | Quality | Hero | Cover | Use on site | Format |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| P005 | `…9.19.55 PM (1).jpeg` | 844 x 1500 | 9:16 | 125 KB | Sakema Apartments 3D sign above a gate, installation in progress, ladder and debris | Fair | No | No | Not used: unfinished scene | — |
| P006 | `…9.19.55 PM (2).jpeg` | 844 x 1500 | 9:16 | 140 KB | Sakema Apartments gate sign, wider view, timber on the ground | Fair | No | No | Not used: near-duplicate of P005 | — |
| P007 | `…9.19.55 PM (3).jpeg` | 844 x 1500 | 9:16 | 87 KB | Sakema Apartments gate sign with a worker on a ladder | Fair | No | No | Not used: near-duplicate | — |
| P008 | `…9.19.56 PM.jpeg` | 844 x 1500 | 9:16 | 170 KB | Sakema Apartments gate sign, worker on ladder | Fair | No | No | Not used: near-duplicate | — |
| P009 | `…9.19.56 PM (1).jpeg` | 1500 x 844 | 16:9 | 163 KB | Sakema Apartments 3D letter sign (white and yellow letters on brown) laid on a rooftop before installation | Good | No | Yes | Not used: strong but similar 3D-letter work is already shown; V01 is the same job | — |
| P010 | `…9.19.56 PM (2).jpeg` | 1500 x 844 | 16:9 | 156 KB | Same Sakema sign, slightly different angle | Good | No | Yes | Not used: duplicate angle | — |
| P011 | `…9.19.56 PM (3).jpeg` | 844 x 1500 | 9:16 | 145 KB | Sakema sign at an angle with packaging on the floor | Fair | No | No | Not used | — |
| P012 | `…9.34.21 PM.jpeg` | 1000 x 1000 | 1:1 | 112 KB | MK Liquor illuminated shopfront sign at night | Fair | No | No | Not used: dark, glass reflections | — |
| P013 | `…9.34.21 PM (1).jpeg` | 1001 x 1000 | 1:1 | 44 KB | Nakuru Vet House Services logo (white artwork on black), digital design file | Good | No | Yes | Not used: flat artwork without context; logo design is covered in Design & Print | — |
| P014 | `…9.34.30 PM.jpeg` | 1200 x 1600 | 3:4 | 194 KB | Vertical college sign on a building at night | Fair | No | No | Not used: dark, cluttered | — |
| P016 | `…9.34.31 PM (1).jpeg` | 561 x 1280 | 0.44 | 135 KB | Dairy shop door and window graphics | Fair | No | No | Not used: narrow crop, cluttered | — |
| P017 | `…9.34.39 PM.jpeg` | 1600 x 900 | 16:9 | 271 KB | Driving-school banner on paving before hanging | Fair | No | No | Not used | — |
| P018 | `…9.34.40 PM.jpeg` | 1600 x 1200 | 4:3 | 272 KB | Water-refilling shop with full wall branding | Good | No | Yes | Not used: busy interior; kept as an alternative for interior branding | — |
| P020 | `…9.34.50 PM (1).jpeg` | 960 x 1280 | 3:4 | 85 KB | Vet clinic gate sign, overcast daylight | Fair | No | No | Not used: P042 shows the same sign lit | — |
| P033 | `…9.34.55 PM (1).jpeg` | 1125 x 1500 | 3:4 | 157 KB | Teardrop flag for a betting brand at a medical camp | Good | No | Yes | Not used: betting brand; other flags are stronger | — |
| P038 | `…9.34.58 PM.jpeg` | 1233 x 622 | 1.98 | 207 KB | Timber company banner artwork (digital design file) | Good | No | Yes | Not used: flat artwork | — |
| P039 | `…9.34.58 PM (1).jpeg` | 960 x 1280 | 3:4 | 124 KB | Massage-chair business roll-up banner in a mall | Good | No | Yes | Not used | — |
| P040 | `…9.34.58 PM (2).jpeg` | 1600 x 1200 | 4:3 | 248 KB | Wrapped station wagon during installation, vinyl scraps everywhere | Fair | No | No | Not used: P037 is cleaner | — |
| P042 | `…9.34.59 PM (1).jpeg` | 562 x 703 | 4:5 | 18 KB | Vet clinic illuminated logo sign at night | Good | No | Yes | Not used: similar lit signs chosen | — |
| P044 | `…9.35.00 PM (1).jpeg` | 1280 x 591 | 2.17 | 89 KB | Car branding job at night | Low | No | No | Not used: dark | — |
| P045 | `…9.35.01 PM.jpeg` | 1600 x 720 | 2.22 | 126 KB | Pharmacy light boxes on a workshop floor | Fair | No | No | Not used | — |
| P046 | `…9.35.02 PM.jpeg` | 591 x 1280 | 0.46 | 54 KB | School billboard on a pole against blue sky | Good | No | Yes | Not used: pole banners chosen for outdoor | — |
| P047 | `…9.35.02 PM (1).jpeg` | 580 x 771 | 3:4 | 147 KB | School poster artwork (digital) | Good | No | Yes | Not used: flat artwork with student photos | — |
| P048 | `…9.35.03 PM.jpeg` | 535 x 919 | 0.58 | 86 KB | Event backdrop with balloon arch "Congratulations Dr. Olivia" | Fair | No | No | Not used: personal name | — |
| P051 | `…9.35.03 PM (3).jpeg` | 570 x 1168 | 0.49 | 94 KB | Barbershop interior wall graphics | Fair | No | No | Not used: narrow | — |
| P052 | `…9.35.04 PM.jpeg` | 1280 x 570 | 2.25 | 90 KB | Barbershop frontage with wall graphics (wide) | Fair | No | No | Not used | — |
| P053 | `…9.35.04 PM (1).jpeg` | 570 x 1170 | 0.49 | 93 KB | Barbershop roll-up banner | Good | No | Yes | Not used | — |
| P079 | `…9.37.06 PM.jpeg` | 1080 x 1084 | 1:1 | 124 KB | Step-and-repeat media wall on a rooftop | Good | No | Yes | Not used: P082 chosen for events | — |
| P081 | `…9.37.09 PM.jpeg` | 1080 x 1121 | 0.96 | 93 KB | Printed spare-wheel cover (Africa artwork, artist URL on print) | Good | No | Yes | Not used: third-party artwork credit | — |
| P084 | `…9.37.13 PM.jpeg` | 720 x 972 | 3:4 | 128 KB | Teardrop flag for a garden venue at an event | Good | No | Yes | Not used | — |
| P087 | `…9.37.15 PM.jpeg` | 720 x 955 | 3:4 | 101 KB | Tourism campaign teardrop flag | Good | No | Yes | Not used | — |
| P089 | `…9.37.15 PM (2).jpeg` | 720 x 1600 | 0.45 | 75 KB | Apartment 3D sign in a workshop | Fair | No | No | Not used | — |
| P094 | `…9.37.18 PM (1).jpeg` | 1080 x 1440 | 3:4 | 128 KB | Recruitment agency reception: 3D letters and logo | Good | Yes | Yes | Not used: P043 is stronger; alternative hero/signage image | — |
| P103 | `…9.37.23 PM (1).jpeg` | 960 x 1280 | 3:4 | 187 KB | Cleaning company 3D sign in a workshop | Fair | No | No | Not used | — |
| P110 | `…9.37.26 PM.jpeg` | 960 x 1280 | 3:4 | 108 KB | Cleaning company shopfront with the 3D sign installed | Good | No | Yes | Not used: cluttered street scene | — |
| P111 | `…9.37.26 PM (1).jpeg` | 960 x 1280 | 3:4 | 172 KB | Cleaning company sign letters being assembled | Fair | No | No | Not used | — |
| P112 | `…9.37.26 PM (2).jpeg` | 1200 x 1600 | 3:4 | 249 KB | Sub-county headquarters gate sign being installed (photographer watermark) | Good | No | Yes | Not used: watermark; the same job is in video V15 | — |
| P114 | `…9.37.27 PM (1).jpeg` | 1040 x 780 | 4:3 | 97 KB | Property company van branding | Good | No | Yes | Not used: vehicle work already shown | — |
| P116 | `…9.37.27 PM (3).jpeg` | 1280 x 576 | 2.22 | 98 KB | Office window graphics (wide) | Fair | No | No | Not used | — |
| P118 | `…9.37.29 PM.jpeg` | 720 x 514 | 1.40 | 14 KB | Suites logo design on navy (digital artwork) | Good | No | Yes | Not used: flat artwork | — |
| P126 | `…9.37.31 PM (1).jpeg` | 1599 x 1200 | 4:3 | 131 KB | Backlit "Shoe World Kenya" letters in a shop | Good | Yes | Yes | Not used: the frame cuts the tops of the letters (tested on the Signage card and replaced by P131) | — |
| P132 | `…9.39.32 PM (1).jpeg` | 960 x 1280 | 3:4 | 172 KB | Photo-studio light box being installed on a building | Good | No | Yes | Not used | — |
| P133 | `…9.39.36 PM.jpeg` | 960 x 1280 | 3:4 | 176 KB | The same light box on the ground | Fair | No | No | Not used | — |
| P144 | `…9.39.49 PM (1).jpeg` | 720 x 540 | 4:3 | 56 KB | Car park lined with teardrop flags, 720 x 540 | Low | No | No | Not used: small | — |
| P145 | `…9.39.50 PM.jpeg` | 1066 x 1600 | 2:3 | 319 KB | Spa window graphics | Good | No | Yes | Not used | — |
| P151 | `…9.46.52 PM.jpeg` | 960 x 1280 | 3:4 | 88 KB | Pole banner "Dial *480#" against sky | Good | No | Yes | Not used: similar to P153 | — |
| P152 | `…9.46.53 PM.jpeg` | 960 x 1280 | 3:4 | 58 KB | Pole banners against sky | Good | No | Yes | Not used | — |
| P154 | `…9.48.06 PM.jpeg` | 1200 x 1600 | 3:4 | 128 KB | Office partition graphics (vehicle-tracking theme) | Good | No | Yes | Not used | — |
| P155 | `…9.48.06 PM (1).jpeg` | 1200 x 1600 | 3:4 | 121 KB | Office partition graphics, second wall | Good | No | Yes | Not used | — |
| P162 | `…10.00.01 PM.jpeg` | 1600 x 1200 | 4:3 | 237 KB | White neon "Washroom" sign being installed from a ladder | Good | No | Yes | Not used: installer blocks the sign; alternative signage image | — |
| P163 | `…10.00.01 PM (1).jpeg` | 1013 x 736 | 1.38 | 90 KB | Neon "Washrooms" sign at night in a venue | Good | No | Yes | Not used | — |

## 9. Video content

All H.264/AAC MP4 from WhatsApp (V24 is HEVC). Probed with an MP4 box reader and Chrome; 8 frames from each were inspected.

| ID | File | Pixels | Length | fps | Bitrate | Size | Audio | What it shows | Quality | Use |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| V01 | `…9.19.57 PM.mp4` | 478 x 850 | 35.64 s | 30 | 1768 kbps | 7.5 MB | AAC | Sakema Apartments 3D letter sign on a rooftop, camera walking round it | Good | Not used: legs and feet dominate; P009 shows the sign better |
| V02 | `…9.19.57 PM (1).mp4` | 478 x 850 | 35.64 s | 30 | 1768 kbps | 7.5 MB | AAC | Byte-identical copy of V01 | — | Duplicate |
| V03 | `…9.19.57 PM (2).mp4` | 478 x 850 | 35.64 s | 30 | 1768 kbps | 7.5 MB | AAC | Byte-identical copy of V01 | — | Duplicate |
| V04 | `…9.19.57 PM (3).mp4` | 478 x 850 | 35.64 s | 30 | 1768 kbps | 7.5 MB | AAC | Byte-identical copy of V01 | — | Duplicate |
| V05 | `…9.34.30 PM.mp4` | 480 x 854 | 36.55 s | 29 | 1574 kbps | 6.9 MB | AAC | Massage business door and window graphics; TikTok watermark | Fair | Not used: watermark, shaky |
| V06 | `…9.34.30 PM (1).mp4` | 480 x 854 | 36.55 s | 29 | 1574 kbps | 6.9 MB | AAC | Byte-identical copy of V05 | — | Duplicate |
| V07 | `…9.34.38 PM.mp4` | 576 x 384 | 23.93 s | 29 | 1487 kbps | 4.2 MB | AAC | Personalised jute bags on a printer bed (landscape); TikTok watermark | Good | Not used: watermark; a candidate for a future clip |
| V08 | `…9.34.49 PM.mp4` | 576 x 1024 | 63.83 s | 30 | 772 kbps | 5.9 MB | AAC | 3D sign being assembled by another company (watermark "@wallgems.3dsigns") | Good | Unsuitable: another business’s video |
| V09 | `…9.34.54 PM.mp4` | 478 x 850 | 29.98 s | 30 | 1373 kbps | 4.9 MB | AAC | Office wall branding being installed for a foundation | Fair | Not used: dim and shaky |
| V10 | `…9.35.01 PM.mp4` | 476 x 848 | 23.74 s | 26 | 1580 kbps | 4.5 MB | AAC | Multi-head embroidery machine stitching a logo onto hoodies, then finished hoodies and packing | Good | USED: "Logo embroidery" clip (5.6–9.8 s + 15.2–17.4 s) |
| V11 | `…9.36.49 PM.mp4` | 476 x 848 | 12.24 s | 28 | 1671 kbps | 2.4 MB | AAC | Hexagonal 2026 desk calendars with pen holder; burned-in text overlay | Good | Not used: text overlay |
| V12 | `…9.36.50 PM.mp4` | 848 x 478 | 9.76 s | 30 | 1774 kbps | 2.1 MB | AAC | Lit café sign (landscape) | Fair | Not used: short, reflections |
| V13 | `…9.36.55 PM.mp4` | 476 x 848 | 30.98 s | 29 | 1318 kbps | 4.9 MB | AAC | Pair of teardrop flags in a car park | Good | Not used: static subject, teardrops already in photos |
| V14 | `…9.37.11 PM.mp4` | 478 x 850 | 33.65 s | 30 | 1449 kbps | 5.8 MB | AAC | Farm-store sign from workshop to night-time install, includes car dashboard footage | Fair | Not used: mixed quality |
| V15 | `…9.37.15 PM.mp4` | 478 x 850 | 25.05 s | 30 | 1352 kbps | 4.0 MB | AAC | Cut letters being screwed onto a long sub-county HQ signboard | Good | USED: "3D sign letters" clip (1.0–5.0 s + 21.5–24.5 s) |
| V16 | `…9.37.19 PM.mp4` | 394 x 848 | 6.53 s | 29 | 1742 kbps | 1.4 MB | AAC | Large-format printer printing a banner inside the shop, shelves of stock behind | Good | USED: "Large-format printing" clip (0–2.4 s + 4.6–6.5 s) |
| V17 | `…9.37.25 PM.mp4` | 960 x 1280 | 15.03 s | 0 | 173 kbps | 318 KB | AAC | Political billboard (slideshow at 0.33 fps) | Fair | Unsuitable: political |
| V18 | `…9.37.27 PM.mp4` | 478 x 850 | 16.23 s | 30 | 1580 kbps | 3.1 MB | AAC | Embroidered polo shirts for a beauty brand, partly letterboxed | Fair | Not used: letterboxing |
| V19 | `…9.37.28 PM.mp4` | 478 x 850 | 60.2 s | 30 | 1713 kbps | 12.3 MB | AAC | Road-crossing banner installed with a crane truck | Good | USED: "Installation" clip (15.5–21.5 s) |
| V20 | `…9.37.33 PM.mp4` | 478 x 850 | 5.21 s | 24 | 1733 kbps | 1.1 MB | AAC | Campaign stickers coming off the printer | Good | Unsuitable: political campaign print |
| V21 | `…9.37.34 PM.mp4` | 476 x 848 | 28.43 s | 30 | 881 kbps | 3.0 MB | AAC | Perfume shop 3D sign (pink and gold), very shaky | Fair | Not used: shaky |
| V22 | `…9.39.33 PM.mp4` | 848 x 478 | 9.7 s | 30 | 1502 kbps | 1.7 MB | none | Rooftop 3D sign, white letters (landscape, no audio) | Good | Not used: landscape clip didn’t fit the portrait row; candidate for later |
| V23 | `…9.39.36 PM.mp4` | 848 x 478 | 16.33 s | 30 | 1633 kbps | 3.2 MB | AAC | Same rooftop sign with orange letters (landscape) | Good | Not used: as V22 |
| V24 | `…9.48.11 PM.mp4` | 1080 x 1920 | 24.28 s | 30 | 1130 kbps | 3.3 MB | AAC | Political campaign T-shirts (HEVC 1080 x 1920) | Good | Unsuitable: political |

## 10. Assets unsuitable for the website

Political material, other businesses’ content, rendered mockups, catalogue/stock images, duplicates and files too small to use.

| ID | File | Pixels | Aspect | Size | What it shows | Quality | Hero | Cover | Use on site | Format |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| P015 | `…9.34.31 PM.jpeg` | 720 x 540 | 4:3 | 13 KB | Lilies Supermarket lit sign at night, 720 x 540, heavily compressed | Low | No | No | Too small and dark | — |
| P026 | `…9.34.52 PM (1).jpeg` | 720 x 1280 | 9:16 | 126 KB | Printer being unloaded from a shipping container, shot through a grille | Low | No | No | Poor framing; not the business’s work | — |
| P028 | `…9.34.53 PM.jpeg` | 702 x 1600 | 0.44 | 102 KB | Phone screenshot of a third-party sponsored video ad for 3D signs | Low | No | No | Another business’s content | — |
| P029 | `…9.34.53 PM (1).jpeg` | 960 x 1280 | 3:4 | 84 KB | Black T-shirt with a political campaign print | Good | No | No | Political campaign material | — |
| P030 | `…9.34.53 PM (2).jpeg` | 1080 x 486 | 2.22 | 20 KB | Lounge sign at night, 1080 x 486, 20 KB | Low | No | No | Too small and compressed | — |
| P031 | `…9.34.54 PM.jpeg` | 1600 x 860 | 1.86 | 290 KB | Screenshot of CorelDRAW with political campaign stickers | Low | No | No | Screenshot; political | — |
| P041 | `…9.34.59 PM.jpeg` | 809 x 1080 | 3:4 | 71 KB | White DTF printer on a showroom curtain backdrop | Good | No | No | Looks like a supplier photo; equipment ownership not confirmed | — |
| P058 | `…9.35.06 PM (1).jpeg` | 1536 x 1024 | 3:2 | 111 KB | Bank-branded gift set in a presentation box (1536 x 1024) | Good | No | No | Also in the company profile, but its size and look match a rendered mockup; not presented as a photographed job until confirmed | — |
| P072 | `…9.37.00 PM.jpeg` | 720 x 561 | 1.28 | 32 KB | Tumblers with football club crests | Good | No | No | Third-party trademarks | — |
| P073 | `…9.37.01 PM.jpeg` | 1536 x 1024 | 3:2 | 85 KB | Spare-wheel cover with a gift-shop logo on a jeep (1536 x 1024) | Good | No | No | Rendered mockup, not a photographed job | — |
| P074 | `…9.37.01 PM (1).jpeg` | 1024 x 1536 | 2:3 | 56 KB | Bucket hat with the same gift-shop logo on white (1024 x 1536) | Good | No | No | Rendered mockup | — |
| P077 | `…9.37.04 PM.jpeg` | 1024 x 1536 | 2:3 | 59 KB | Gift-shop branded tumblers on white (1024 x 1536) | Good | No | No | Rendered mockup | — |
| P088 | `…9.37.15 PM (1).jpeg` | 720 x 483 | 3:2 | 23 KB | Pharmacy lit sign at dusk, 720 x 483, 23 KB | Low | No | No | Too small | — |
| P092 | `…9.37.17 PM.jpeg` | 635 x 1280 | 0.50 | 56 KB | Pen printed with a political candidate’s name | Fair | No | No | Political | — |
| P093 | `…9.37.18 PM.jpeg` | 960 x 1280 | 3:4 | 92 KB | Embroidered cap and jacket with a candidate’s name | Good | No | No | Political | — |
| P095 | `…9.37.18 PM (2).jpeg` | 720 x 495 | 1.45 | 34 KB | Blank gold lapel pins on a dark studio background | Fair | No | No | Supplier-style product photo | — |
| P099 | `…9.37.20 PM (1).jpeg` | 720 x 405 | 16:9 | 27 KB | Bank and aid-agency pins, studio shot, 720 x 405 | Low | No | No | Supplier-style and small | — |
| P117 | `…9.37.28 PM.jpeg` | 832 x 473 | 16:9 | 45 KB | Polo shirt mockup for an agrovet (render) | Good | No | No | Rendered mockup | — |
| P121 | `…9.37.30 PM.jpeg` | 393 x 721 | 0.55 | 36 KB | Wristbands, 393 x 721 | Low | No | No | Too small | — |
| P123 | `…9.37.30 PM (2).jpeg` | 651 x 798 | 4:5 | 40 KB | Coveralls in five colours on white (catalogue image) | Fair | No | No | Stock/catalogue image | — |
| P128 | `…9.37.32 PM (1).jpeg` | 1080 x 1073 | 1:1 | 83 KB | Round "Art Dekor" 3D sign on brick, polished studio look | Good | No | No | Origin unclear (looks like a supplier photo) | — |
| P129 | `…9.37.33 PM.jpeg` | 516 x 509 | 1:1 | 24 KB | Reflective vests on white (catalogue image) | Fair | No | No | Stock/catalogue image | — |
| P142 | `…9.39.47 PM.jpeg` | 721 x 538 | 4:3 | 28 KB | Night totem sign listing placeholder companies (TechCorp, Summit Bank…) | Good | No | No | Stock/AI mockup | — |
| P143 | `…9.39.49 PM.jpeg` | 720 x 540 | 4:3 | 27 KB | Building fascia signs, 720 x 540 | Low | No | No | Small; unclear which signs are Saye’s | — |
| P148 | `…9.46.15 PM.jpeg` | 1033 x 1170 | 0.88 | 127 KB | Business-card mockup with placeholder name "John Doe" | Good | No | No | Rendered mockup | — |
| P156 | `…9.48.07 PM.jpeg` | 900 x 1600 | 9:16 | 172 KB | Political billboard with a GPS-camera stamp | Good | No | No | Political | — |
| P158 | `…9.59.56 PM (1).jpeg` | 900 x 1600 | 9:16 | 305 KB | Exact duplicate of P157 (same bytes) | Good | No | No | Duplicate | — |
| P161 | `…9.59.59 PM (1).jpeg` | 765 x 635 | 1.20 | 82 KB | Cap mockup for a hardware shop (render) | Good | No | No | Rendered mockup | — |

## Existing site files (not uploads)

| ID | File | Notes |
| --- | --- | --- |
| P001 | `apple-touch-icon.png` | Rebuilt from the official emblem |
| P002 | `favicon-32.png` | Rebuilt from the official emblem |
| P003 | `og-image.jpg` | Rebuilt: official logo beside the P043 reception photo |
