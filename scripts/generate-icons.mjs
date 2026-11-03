// Builds the site icons from the official emblem
// (public/assets/optimized/brand/saye-graphics-mark.svg, made by logo-to-svg.mjs):
//   public/favicon.svg           emblem on a paper tile (visible on light and dark tabs)
//   public/favicon-32.png        browser tab fallback
//   public/apple-touch-icon.png  iOS home screen (180 x 180, full bleed)
//
// Run with: npm run icons
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const publicDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')
const PAPER = '#F7F6F2'

const mark = await readFile(join(publicDir, 'assets', 'optimized', 'brand', 'saye-graphics-mark.svg'), 'utf8')
const viewBox = /viewBox="([^"]+)"/.exec(mark)[1]
const inner = mark.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')

const tile = (size, radius, inset) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="${PAPER}"/><svg x="${inset}" y="${inset}" width="${size - inset * 2}" height="${size - inset * 2}" viewBox="${viewBox}">${inner}</svg></svg>\n`

const favicon = tile(64, 14, 3)
await writeFile(join(publicDir, 'favicon.svg'), favicon)
await sharp(Buffer.from(favicon), { density: 384 }).resize(32, 32).png().toFile(join(publicDir, 'favicon-32.png'))

// iOS applies its own rounded mask, so the touch icon is a full square.
await sharp(Buffer.from(tile(180, 0, 18)), { density: 288 }).resize(180, 180).png().toFile(join(publicDir, 'apple-touch-icon.png'))

console.log('Wrote public/favicon.svg, public/favicon-32.png and public/apple-touch-icon.png')
