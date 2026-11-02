// Runs after the client and SSR builds. Writes the rendered page into
// dist/index.html, adds SEO tags and creates robots.txt (and sitemap.xml once
// a production domain is known).
//
//   SITE_URL        Production URL, e.g. https://www.sayegraphics.co.ke
//   ALLOW_INDEXING  "true" to let search engines index the site.
//
// Without both, the build is marked noindex: the right default for a demo the
// owner has not approved yet. The canonical URL, og:url and sitemap are only
// added once SITE_URL is set.
import { readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssrDir = join(root, 'dist-ssr')

const siteUrl = (process.env.SITE_URL ?? '').trim().replace(/\/+$/, '')
const allowIndexing = process.env.ALLOW_INDEXING === 'true' && siteUrl !== ''

if (siteUrl && !/^https:\/\/[^/\s]+$/.test(siteUrl)) {
  throw new Error(`SITE_URL must look like https://www.example.co.ke (got "${siteUrl}")`)
}

const { render, buildStructuredData } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href)

const head = []

// Preload the Latin Manrope file so headings render in the brand font sooner.
const bundles = await readdir(join(dist, 'static'))
const font = bundles.find((file) => /^manrope-latin-wght-normal-.*\.woff2$/.test(file))
if (font) head.push(`<link rel="preload" href="/static/${font}" as="font" type="font/woff2" crossorigin>`)

if (!allowIndexing) head.push('<meta name="robots" content="noindex, nofollow">')
if (siteUrl) {
  head.push(`<link rel="canonical" href="${siteUrl}/">`, `<meta property="og:url" content="${siteUrl}/">`)
}
const jsonLd = JSON.stringify(buildStructuredData(siteUrl)).replace(/</g, '\\u003c')
head.push(`<script type="application/ld+json">${jsonLd}</script>`)

let html = await readFile(join(dist, 'index.html'), 'utf8')
if (!html.includes('<!--app-html-->') || !html.includes('<!--head-extra-->')) {
  throw new Error('dist/index.html is missing the <!--app-html--> or <!--head-extra--> placeholder')
}
if (siteUrl) html = html.replace('content="/og-image.jpg"', `content="${siteUrl}/og-image.jpg"`)
html = html.replace('<!--head-extra-->', head.join('\n    ')).replace('<!--app-html-->', render())
await writeFile(join(dist, 'index.html'), html)

const robots = allowIndexing
  ? `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
  : 'User-agent: *\nDisallow: /\n'
await writeFile(join(dist, 'robots.txt'), robots)

if (allowIndexing) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${siteUrl}/</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url>
</urlset>
`
  await writeFile(join(dist, 'sitemap.xml'), sitemap)
}

// The folder notes in public/assets are for maintainers, not visitors.
for (const entry of await readdir(join(dist, 'assets'), { recursive: true })) {
  if (entry.endsWith('README.md')) await rm(join(dist, 'assets', entry))
}

await rm(ssrDir, { recursive: true, force: true })
console.log(
  `Prerendered dist/index.html (${allowIndexing ? `indexable at ${siteUrl}` : 'noindex demo build'}).`,
)
