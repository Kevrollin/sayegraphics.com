// Prepares the approved photographs for the web.
//
//   assets-src/originals/<WhatsApp file>  →  public/assets/optimized/<folder>/<slug>-<width>.avif|webp
//
// Reads scripts/media-manifest.mjs, applies each crop, writes AVIF and WebP at
// the listed widths (never upscaled; metadata stripped, sRGB kept), records a
// dominant colour for the loading placeholder, and writes
// src/data/media.generated.ts with the real dimensions. Also builds the social
// preview image (public/og-image.jpg). Originals are never modified.
//
// Run with: npm run media
// Regenerate only some images: npm run media -- heroCover serviceSignage
import { mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { images, socialImage } from './media-manifest.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const originals = join(root, 'assets-src', 'originals')
const outRoot = join(root, 'public', 'assets', 'optimized')
const publicPath = '/assets/optimized'

const hex = ({ r, g, b }) => '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')

function resolveCrop(crop, width, height) {
  if (!crop) return { left: 0, top: 0, width, height }
  if ('aspect' in crop) {
    const [aw, ah] = crop.aspect
    let w = width
    let h = Math.round((width * ah) / aw)
    if (h > height) {
      h = height
      w = Math.round((height * aw) / ah)
    }
    const focusY = crop.focusY ?? 0.5
    const top = Math.min(height - h, Math.max(0, Math.round(focusY * height - h / 2)))
    return { left: Math.round((width - w) / 2), top, width: w, height: h }
  }
  return crop
}

// With keys on the command line, only those images are rebuilt and the rest
// of media.generated.ts is kept.
const only = process.argv.slice(2)
const generatedFile = join(root, 'src', 'data', 'media.generated.ts')
let generated = {}
if (only.length > 0) {
  const previous = await readFile(generatedFile, 'utf8').catch(() => '')
  const match = /generatedImages = (\{[\s\S]*\}) as const/.exec(previous)
  if (match) generated = JSON.parse(match[1])
}
let sourceBytes = 0
let outputBytes = 0
const seenSources = new Set()

for (const entry of images) {
  if (only.length > 0 && !only.includes(entry.key)) continue
  const input = join(originals, entry.source)
  const original = await readFile(input)
  if (!seenSources.has(entry.source)) {
    sourceBytes += original.length
    seenSources.add(entry.source)
  }
  const base = sharp(original).rotate()
  const meta = await base.metadata()
  const rect = resolveCrop(entry.crop, meta.width, meta.height)
  const cropped = await sharp(original).rotate().extract(rect).toBuffer()

  const outDir = join(outRoot, entry.folder)
  await mkdir(outDir, { recursive: true })
  const widths = [...new Set(entry.widths.map((w) => Math.min(w, rect.width)))].sort((a, b) => a - b)
  const hero = entry.folder === 'hero'
  for (const width of widths) {
    const resized = sharp(cropped).resize({ width, withoutEnlargement: true })
    const name = `${entry.slug}-${width}`
    const avif = await resized.clone().avif({ quality: hero ? 56 : 52, effort: 6 }).toBuffer()
    const webp = await resized.clone().webp({ quality: hero ? 80 : 76, effort: 6, smartSubsample: true }).toBuffer()
    await writeFile(join(outDir, `${name}.avif`), avif)
    await writeFile(join(outDir, `${name}.webp`), webp)
    outputBytes += avif.length + webp.length
  }

  const { dominant } = await sharp(cropped).resize(32).stats()
  generated[entry.key] = {
    base: `${publicPath}/${entry.folder}/${entry.slug}`,
    width: rect.width,
    height: rect.height,
    widths,
    color: hex(dominant),
  }
  console.log(`${entry.key.padEnd(24)} ${rect.width}x${rect.height}  ${widths.join(', ')}`)
}

// Social preview: photo on the right, official logo on paper on the left.
if (only.length === 0) {
  const W = 1200
  const H = 630
  const photo = await sharp(await readFile(join(originals, socialImage.photo)))
    .rotate()
    .extract(socialImage.crop)
    .resize(600, H)
    .toBuffer()
  const logo = await sharp(join(outRoot, 'brand', 'saye-graphics-logo.svg'), { density: 300 }).resize({ width: 500 }).png().toBuffer()
  const logoMeta = await sharp(logo).metadata()
  const caption = Buffer.from(
    `<svg width="600" height="80" xmlns="http://www.w3.org/2000/svg"><text x="50" y="34" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" fill="#17191c">Branding, signage &amp; printing</text><text x="50" y="68" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#5e6167">Nakuru, Kenya · +254 741 556 017</text></svg>`,
  )
  await sharp({ create: { width: W, height: H, channels: 3, background: '#f7f6f2' } })
    .composite([
      { input: logo, left: 50, top: Math.round(H / 2 - logoMeta.height / 2 - 60) },
      { input: caption, left: 0, top: H - 150 },
      { input: photo, left: 600, top: 0 },
    ])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(join(root, 'public', 'og-image.jpg'))
  console.log('og-image.jpg             1200x630')
}

const banner = `// Generated by scripts/optimize-media.mjs. Do not edit by hand: change
// scripts/media-manifest.mjs and run \`npm run media\`.
`
await writeFile(
  generatedFile,
  `${banner}\nexport const generatedImages = ${JSON.stringify(generated, null, 2)} as const\n`,
)

// Remove the placeholder folders from the first version of the site.
for (const old of ['brand/saye-graphics-monogram-temporary.svg', 'brand/README.md', 'icons', 'portfolio', 'products', 'workspace']) {
  await rm(join(root, 'public', 'assets', old), { recursive: true, force: true })
}

const og = await stat(join(root, 'public', 'og-image.jpg'))
console.log(
  `\n${seenSources.size} image(s) prepared: ${(sourceBytes / 1024).toFixed(0)} KB of source JPEG → ` +
    `${(outputBytes / 1024).toFixed(0)} KB across all AVIF + WebP sizes. og-image.jpg ${(og.size / 1024).toFixed(0)} KB.`,
)
