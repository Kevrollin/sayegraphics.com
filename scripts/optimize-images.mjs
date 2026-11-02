// Optimises the owner's original photos for the web.
//
//   assets-src/<category>/<photo>.jpg|png|webp|tif  →  public/assets/<category>/<name>-<width>.webp
//
// Categories: brand, portfolio, products, workspace. Originals stay untouched
// in assets-src/ (not deployed). Each photo gets WebP versions at up to three
// widths, never upscaled, with EXIF orientation applied and metadata removed.
// SVG files (e.g. a vector logo) are copied as they are.
//
// For every photo the script prints an `image` entry ready to paste into
// src/data/portfolio.ts. Run with: npm run images
import { copyFile, mkdir, readdir, stat } from 'node:fs/promises'
import { dirname, extname, join, parse } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const sourceRoot = join(root, 'assets-src')
const outputRoot = join(root, 'public', 'assets')
const categories = ['brand', 'portfolio', 'products', 'workspace']
const widths = [640, 1024, 1600]
const quality = 80
const rasterTypes = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff', '.avif'])

const slug = (name) =>
  name
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

async function exists(path) {
  try {
    await stat(path)
    return true
  } catch {
    return false
  }
}

let processed = 0
for (const category of categories) {
  const sourceDir = join(sourceRoot, category)
  if (!(await exists(sourceDir))) continue
  const outputDir = join(outputRoot, category)
  await mkdir(outputDir, { recursive: true })

  for (const file of (await readdir(sourceDir)).sort()) {
    const extension = extname(file).toLowerCase()
    const name = slug(parse(file).name)
    const input = join(sourceDir, file)

    if (extension === '.svg') {
      await copyFile(input, join(outputDir, `${name}.svg`))
      console.log(`copied   ${category}/${name}.svg`)
      processed++
      continue
    }
    if (!rasterTypes.has(extension)) continue

    const image = sharp(input).rotate()
    const { width: originalWidth, height: originalHeight } = await image.metadata()
    if (!originalWidth || !originalHeight) continue

    const targets = [...new Set(widths.map((w) => Math.min(w, originalWidth)))]
    const outputs = []
    for (const width of targets) {
      const fileName = `${name}-${width}.webp`
      await sharp(input).rotate().resize({ width, withoutEnlargement: true }).webp({ quality }).toFile(join(outputDir, fileName))
      outputs.push({ fileName, width })
    }

    const largest = outputs[outputs.length - 1]
    const height = Math.round((largest.width / originalWidth) * originalHeight)
    const srcSet = outputs.map((o) => `/assets/${category}/${o.fileName} ${o.width}w`).join(', ')
    console.log(`\noptimised ${category}/${file} → ${outputs.map((o) => o.fileName).join(', ')}`)
    console.log(
      `  image: { src: '/assets/${category}/${largest.fileName}', srcSet: '${srcSet}', width: ${largest.width}, height: ${height} },`,
    )
    processed++
  }
}

console.log(processed ? `\nDone: ${processed} file(s).` : 'No images found. Put originals in assets-src/<category>/ and run again.')
