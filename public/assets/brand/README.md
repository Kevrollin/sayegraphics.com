# Brand

`saye-graphics-monogram-temporary.svg` is the temporary "SG" monogram designed for the demo. It is **not** the official Saye Graphics logo.

When the owner supplies the original logo:

1. Save the vector file here, e.g. `saye-graphics-logo.svg` (or a high-resolution PNG).
2. In `src/data/business.ts`, set `logo: { src: '/assets/brand/saye-graphics-logo.svg', width: …, height: … }`.
3. Replace `public/favicon.svg` with the official mark and run `npm run icons`.
4. Update the colour values at the top of `src/styles/index.css` to the official brand colours.
