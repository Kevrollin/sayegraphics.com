// Builds the PNG icons from public/favicon.svg:
//   public/favicon-32.png        browser tab fallback
//   public/apple-touch-icon.png  iOS home screen (180 x 180, full bleed)
//
// When the official logo arrives, replace public/favicon.svg and run:
//   npm run icons
import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const publicDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')
const svg = await readFile(join(publicDir, 'favicon.svg'))

await sharp(svg, { density: 384 }).resize(32, 32).png().toFile(join(publicDir, 'favicon-32.png'))

// iOS applies its own rounded mask, so the touch icon is a full square with
// the mark inset on the same background colour.
const background = (/<rect[^>]*fill="(#[0-9a-fA-F]{3,8})"/.exec(svg.toString()) ?? [])[1] ?? '#17191C'
const mark = await sharp(svg, { density: 1152 }).resize(140, 140).png().toBuffer()
await sharp({ create: { width: 180, height: 180, channels: 4, background } })
  .composite([{ input: mark, gravity: 'centre' }])
  .png()
  .toFile(join(publicDir, 'apple-touch-icon.png'))

console.log('Wrote public/favicon-32.png and public/apple-touch-icon.png')
