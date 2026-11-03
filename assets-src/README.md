# Original assets (not deployed)

`originals/` holds the owner's uploads exactly as received on 2 November 2026: the logo PDF, the company profile PDF, 165 WhatsApp photos and 24 WhatsApp videos (about 150 MB). Filenames are unchanged so they can be matched to the IDs in `research/ASSET_INVENTORY.md`.

The folder is excluded from Git and from Vercel uploads. **Keep a backup of it**: it is the only copy of the originals in the project.

The site never links to these files. Scripts read them and write web-ready copies to `public/assets/optimized/`:

| Script           | Reads                         | Writes                                   |
| ---------------- | ----------------------------- | ---------------------------------------- |
| `npm run logo`   | `PDFLOGO.pdf`                 | `optimized/brand/*.svg`                  |
| `npm run media`  | photos listed in `scripts/media-manifest.mjs` | `optimized/{hero,services,portfolio,workspace}/` and `public/og-image.jpg` |
| `npm run videos` | clips listed in `scripts/video/transcode-videos.mjs` | `optimized/video/`          |

To add a new photo, put the original in `originals/` (ideally the full-resolution file, not a WhatsApp copy) and follow "Adding or swapping a photo" in the main README.
