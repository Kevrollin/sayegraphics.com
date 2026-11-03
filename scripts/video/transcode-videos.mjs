// Trims, crops and re-encodes the workshop clips shown in the About section.
//
//   assets-src/originals/<WhatsApp video>  →  public/assets/optimized/video/workshop-<id>.webm|mp4 + -poster.webp
//
// How: Google Chrome decodes the WhatsApp H.264 source frame by frame (exact
// seeks) and draws each frame at 360 x 640. Chrome's WebCodecs encoder turns
// those frames into H.264, packaged as MP4 by mp4mux.mjs (for Safari and as a
// fallback); the same frames are piped to ffmpeg's VP9 encoder for WebM. The
// first frame of each clip becomes its poster. Clips are silent.
//
// Requirements (not site dependencies): Google Chrome, the `playwright`
// package (`npm i -D playwright` temporarily, or run from a folder that has
// it) and an ffmpeg with libvpx-vp9, e.g. the one Playwright installs. Set
// FFMPEG=<path> to use another one.
//
// Run with: npm run videos
import { spawn } from 'node:child_process'
import { existsSync, readdirSync } from 'node:fs'
import { mkdir, stat, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { muxMp4 } from './mp4mux.mjs'
import { serve } from './serve.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const src = join(root, 'assets-src', 'originals')
const outDir = join(root, 'public', 'assets', 'optimized', 'video')
const W = 360
const H = 640
const FPS = 25

/** Source file and the seconds to keep (segments are joined in order). */
const clips = [
  { id: 'printing', file: 'WhatsApp Video 2026-11-02 at 9.37.19 PM.mp4', segments: [[0.0, 2.4], [4.6, 6.5]] },
  { id: 'embroidery', file: 'WhatsApp Video 2026-11-02 at 9.35.01 PM.mp4', segments: [[5.6, 9.8], [15.2, 17.4]] },
  { id: 'sign-letters', file: 'WhatsApp Video 2026-11-02 at 9.37.15 PM.mp4', segments: [[1.0, 5.0], [21.5, 24.5]] },
  { id: 'installation', file: 'WhatsApp Video 2026-11-02 at 9.37.28 PM.mp4', segments: [[15.5, 21.5]] },
]

function findFfmpeg() {
  if (process.env.FFMPEG) return process.env.FFMPEG
  const base = join(process.env.LOCALAPPDATA ?? join(process.env.HOME ?? '', '.cache'), 'ms-playwright')
  if (existsSync(base)) {
    for (const dir of readdirSync(base).filter((d) => d.startsWith('ffmpeg-'))) {
      for (const exe of ['ffmpeg-win64.exe', 'ffmpeg-linux', 'ffmpeg-mac']) {
        if (existsSync(join(base, dir, exe))) return join(base, dir, exe)
      }
    }
  }
  return 'ffmpeg'
}

let chromium
try {
  ;({ chromium } = await import('playwright'))
} catch {
  console.error('This script needs the "playwright" package: npm i -D playwright (then remove it again).')
  process.exit(1)
}

const ffmpeg = findFfmpeg()
await mkdir(outDir, { recursive: true })
const www = join(outDir, '.blank')
await mkdir(www, { recursive: true })
await writeFile(join(www, 'index.html'), '<!doctype html><title>transcode</title>')
const server = await serve({ src, www }, 4394)
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const page = await browser.newPage()
await page.goto('http://127.0.0.1:4394/www/index.html')

for (const clip of clips) {
  const result = await page.evaluate(
    async ({ url, segments, W, H, FPS }) => {
      const b64 = (buf) => {
        let s = ''
        const a = new Uint8Array(buf)
        for (let i = 0; i < a.length; i += 0x8000) s += String.fromCharCode(...a.subarray(i, i + 0x8000))
        return btoa(s)
      }
      const video = document.createElement('video')
      video.muted = true
      video.preload = 'auto'
      video.src = url
      await new Promise((ok, bad) => {
        video.onloadeddata = ok
        video.onerror = bad
      })
      // Centred "cover" crop to the target aspect ratio.
      const scale = Math.max(W / video.videoWidth, H / video.videoHeight)
      const cw = W / scale
      const ch = H / scale
      const sx = (video.videoWidth - cw) / 2
      const sy = (video.videoHeight - ch) / 2
      const canvas = new OffscreenCanvas(W, H)
      const ctx = canvas.getContext('2d')
      ctx.imageSmoothingQuality = 'high'

      const chunks = []
      let description = null
      const encoder = new VideoEncoder({
        output: (chunk, meta) => {
          if (meta?.decoderConfig?.description && !description) description = b64(meta.decoderConfig.description)
          const buf = new ArrayBuffer(chunk.byteLength)
          chunk.copyTo(buf)
          chunks.push({ key: chunk.type === 'key', ts: chunk.timestamp, data: b64(buf) })
        },
        error: (e) => {
          throw e
        },
      })
      encoder.configure({ codec: 'avc1.4d401e', width: W, height: H, bitrate: 650_000, bitrateMode: 'variable', framerate: FPS, latencyMode: 'quality', avc: { format: 'avc' } })

      const jpegs = []
      let n = 0
      for (const [a, b] of segments) {
        for (let t = a; t < b - 1e-6; t += 1 / FPS) {
          video.currentTime = t + 0.001
          await new Promise((ok) => (video.onseeked = ok))
          ctx.drawImage(video, sx, sy, cw, ch, 0, 0, W, H)
          const frame = new VideoFrame(canvas, { timestamp: Math.round((n * 1e6) / FPS), duration: Math.round(1e6 / FPS) })
          encoder.encode(frame, { keyFrame: n % (FPS * 2) === 0 })
          frame.close()
          const blob = await canvas.convertToBlob({ type: 'image/jpeg', quality: 0.94 })
          jpegs.push(b64(await blob.arrayBuffer()))
          n++
        }
      }
      await encoder.flush()
      encoder.close()
      return { frames: n, jpegs, chunks, description }
    },
    { url: `/src/${encodeURIComponent(clip.file)}`, segments: clip.segments, W, H, FPS },
  )

  const name = `workshop-${clip.id}`
  result.chunks.sort((a, b) => a.ts - b.ts)
  const mp4 = muxMp4({
    samples: result.chunks.map((c) => ({ key: c.key, data: Buffer.from(c.data, 'base64') })),
    description: Buffer.from(result.description, 'base64'),
    width: W,
    height: H,
    fps: FPS,
  })
  await writeFile(join(outDir, `${name}.mp4`), mp4)

  await new Promise((ok, bad) => {
    const ff = spawn(ffmpeg, [
      '-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', 'pipe:0',
      '-c:v', 'libvpx-vp9', '-b:v', '560k', '-maxrate', '760k', '-bufsize', '1100k', '-crf', '36',
      '-deadline', 'good', '-cpu-used', '1', '-row-mt', '1', '-g', String(FPS * 2), '-pix_fmt', 'yuv420p', '-an',
      '-f', 'webm', join(outDir, `${name}.webm`),
    ])
    ff.stderr.on('data', (d) => process.stderr.write(d))
    ff.on('error', bad)
    ff.on('close', (code) => (code === 0 ? ok() : bad(new Error(`ffmpeg exited with ${code}`))))
    for (const jpeg of result.jpegs) ff.stdin.write(Buffer.from(jpeg, 'base64'))
    ff.stdin.end()
  })

  await sharp(Buffer.from(result.jpegs[0], 'base64')).webp({ quality: 72 }).toFile(join(outDir, `${name}-poster.webp`))
  const size = async (ext) => ((await stat(join(outDir, `${name}${ext}`))).size / 1024).toFixed(0) + ' KB'
  console.log(`${name.padEnd(24)} ${(result.frames / FPS).toFixed(1)} s  webm ${await size('.webm')}  mp4 ${await size('.mp4')}  poster ${await size('-poster.webp')}`)
}

await browser.close()
server.close()
await import('node:fs/promises').then(({ rm }) => rm(www, { recursive: true, force: true }))
