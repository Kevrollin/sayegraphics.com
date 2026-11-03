// Static file server with HTTP Range support, so Chrome can seek inside the source videos.
import { createServer } from 'node:http'
import { createReadStream, statSync } from 'node:fs'
import { join, extname, normalize } from 'node:path'

const types = { '.mp4': 'video/mp4', '.webm': 'video/webm', '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.avif': 'image/avif' }

export function serve(roots, port) {
  const server = createServer((req, res) => {
    const url = decodeURIComponent(new URL(req.url, 'http://x').pathname)
    const [, mount, ...rest] = url.split('/')
    const root = roots[mount]
    if (!root) { res.writeHead(404); return res.end() }
    const file = normalize(join(root, ...rest))
    let st
    try { st = statSync(file) } catch { res.writeHead(404); return res.end() }
    const type = types[extname(file).toLowerCase()] ?? 'application/octet-stream'
    const range = /bytes=(\d*)-(\d*)/.exec(req.headers.range ?? '')
    if (range) {
      const start = range[1] ? +range[1] : 0
      const end = range[2] ? +range[2] : st.size - 1
      res.writeHead(206, { 'Content-Type': type, 'Content-Range': `bytes ${start}-${end}/${st.size}`, 'Content-Length': end - start + 1, 'Accept-Ranges': 'bytes', 'Access-Control-Allow-Origin': '*' })
      createReadStream(file, { start, end }).pipe(res)
    } else {
      res.writeHead(200, { 'Content-Type': type, 'Content-Length': st.size, 'Accept-Ranges': 'bytes', 'Access-Control-Allow-Origin': '*' })
      createReadStream(file).pipe(res)
    }
  })
  return new Promise((resolve) => server.listen(port, '127.0.0.1', () => resolve(server)))
}
