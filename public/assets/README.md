# Site assets

Web-ready files generated from the owner's originals in `assets-src/originals/` (not deployed). Don't edit these by hand; change the script inputs and run them again.

| Folder                   | Contents                                                    | Made by                                   |
| ------------------------ | ----------------------------------------------------------- | ----------------------------------------- |
| `optimized/brand/`       | Official logo as SVG: full, header lockup, light lockup, emblem | `npm run logo` (from `PDFLOGO.pdf`)    |
| `optimized/hero/`        | Hero photos (AVIF + WebP, several widths)                   | `npm run media`                           |
| `optimized/services/`    | Service card photos, cropped 4:3                            | `npm run media`                           |
| `optimized/portfolio/`   | Portfolio covers and gallery photos                         | `npm run media`                           |
| `optimized/workspace/`   | About section photo                                         | `npm run media`                           |
| `optimized/video/`       | Workshop clips (WebM VP9 + MP4 H.264) and poster images     | `npm run videos`                          |

Which photo goes where, and its alt text, is set in `scripts/media-manifest.mjs` and `src/data/media.ts`.
