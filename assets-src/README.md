# Original assets (not deployed)

Drop the owner's original files here, keeping full quality:

```
assets-src/
  brand/       logo files (SVG, PNG, PDF/AI/CDR exports)
  portfolio/   photos of completed jobs
  products/    product photos
  workspace/   shop, equipment and production photos
```

Then run:

```bash
npm run images
```

Each photo is resized to WebP at up to 640, 1024 and 1600 px wide (never upscaled), rotated according to its EXIF data and stripped of metadata, then written to `public/assets/<folder>/`. SVG files are copied as they are. The script prints a ready-to-paste `image` entry for `src/data/portfolio.ts`.

Use descriptive file names: `team-hoodies-navy-chest-print.jpg` beats `IMG_2041.jpg`.
