// Converts the official logo (assets-src/originals/PDFLOGO.pdf, a CorelDRAW
// export) into SVG files for the site. The PDF holds vector paths, two
// gradient fills and text set in an embedded CFF font; this script reads all
// three, so the SVGs are exact vector copies of the supplied artwork.
//
//   public/assets/optimized/brand/saye-graphics-logo.svg          full logo with tagline
//   public/assets/optimized/brand/saye-graphics-lockup.svg        emblem + wordmark (header)
//   public/assets/optimized/brand/saye-graphics-lockup-light.svg  one-colour paper version (dark footer)
//   public/assets/optimized/brand/saye-graphics-mark.svg          emblem only (favicon)
//
// Run with: node scripts/logo-to-svg.mjs
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { inflateSync } from 'node:zlib'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const input = join(root, 'assets-src', 'originals', 'PDFLOGO.pdf')
const outDir = join(root, 'public', 'assets', 'optimized', 'brand')
mkdirSync(outDir, { recursive: true })
const buf = readFileSync(input)
const src = buf.toString('latin1')
// ---------------------------------------------------------------- PDF objects
function getObj(num) {
  const re = new RegExp(`(?:^|[\\r\\n\\s])${num} 0 obj`, 'g')
  const m = re.exec(src)
  if (!m) throw new Error('no obj ' + num)
  const start = m.index + m[0].length
  const end = src.indexOf('endobj', start)
  const body = src.slice(start, end)
  const si = body.indexOf('stream')
  if (si < 0) return { dict: body, stream: null }
  const dict = body.slice(0, si)
  let p = start + si + 6
  if (src[p] === '\r') p++
  if (src[p] === '\n') p++
  const len = +/\/Length (\d+)/.exec(dict)[1]
  let data = buf.subarray(p, p + len)
  if (/FlateDecode/.test(dict)) data = inflateSync(data)
  return { dict, stream: data }
}

// ---------------------------------------------------------------- CFF parser
function readIndex(d, pos) {
  const count = d.readUInt16BE(pos)
  if (count === 0) return { items: [], end: pos + 2 }
  const offSize = d[pos + 2]
  const offs = []
  for (let i = 0; i <= count; i++) {
    let v = 0
    for (let k = 0; k < offSize; k++) v = v * 256 + d[pos + 3 + i * offSize + k]
    offs.push(v)
  }
  const base = pos + 3 + (count + 1) * offSize - 1
  const items = []
  for (let i = 0; i < count; i++) items.push(d.subarray(base + offs[i], base + offs[i + 1]))
  return { items, end: base + offs[count] }
}

function parseDict(d) {
  const out = {}
  let ops = []
  let i = 0
  while (i < d.length) {
    const b = d[i]
    if (b <= 21) {
      let key = b
      if (b === 12) key = 1200 + d[++i]
      out[key] = ops
      ops = []
      i++
    } else if (b === 28) { ops.push(d.readInt16BE(i + 1)); i += 3 }
    else if (b === 29) { ops.push(d.readInt32BE(i + 1)); i += 5 }
    else if (b === 30) {
      let s = ''
      i++
      outer: for (;;) {
        const byte = d[i++]
        for (const n of [byte >> 4, byte & 15]) {
          if (n === 15) break outer
          s += ['0','1','2','3','4','5','6','7','8','9','.','E','E-','','-'][n]
        }
      }
      ops.push(parseFloat(s))
    } else if (b >= 32 && b <= 246) { ops.push(b - 139); i++ }
    else if (b >= 247 && b <= 250) { ops.push((b - 247) * 256 + d[i + 1] + 108); i += 2 }
    else if (b >= 251 && b <= 254) { ops.push(-(b - 251) * 256 - d[i + 1] - 108); i += 2 }
    else i++
  }
  return out
}

const bias = (n) => (n < 1240 ? 107 : n < 33900 ? 1131 : 32768)

function parseCFF(d) {
  const hdrSize = d[2]
  const names = readIndex(d, hdrSize)
  const top = readIndex(d, names.end)
  const strings = readIndex(d, top.end)
  const gsubrs = readIndex(d, strings.end).items
  const topDict = parseDict(top.items[0])
  const charStrings = readIndex(d, topDict[17][0]).items
  const nGlyphs = charStrings.length
  const isCID = !!topDict[1230]
  const privOf = (dict) => {
    if (!dict[18]) return { subrs: [], defaultWidthX: 0, nominalWidthX: 0 }
    const [size, off] = dict[18]
    const pd = parseDict(d.subarray(off, off + size))
    const subrs = pd[19] ? readIndex(d, off + pd[19][0]).items : []
    return { subrs, defaultWidthX: pd[20]?.[0] ?? 0, nominalWidthX: pd[21]?.[0] ?? 0 }
  }
  let fdSelect = () => 0
  let privs
  if (isCID) {
    const fdArray = readIndex(d, topDict[1236][0]).items.map((x) => privOf(parseDict(x)))
    privs = fdArray
    const p = topDict[1237][0]
    const fmt = d[p]
    if (fmt === 0) fdSelect = (g) => d[p + 1 + g]
    else if (fmt === 3) {
      const nr = d.readUInt16BE(p + 1)
      const ranges = []
      for (let r = 0; r < nr; r++) ranges.push([d.readUInt16BE(p + 3 + r * 3), d[p + 5 + r * 3]])
      fdSelect = (g) => { let fd = 0; for (const [first, f] of ranges) if (g >= first) fd = f; return fd }
    }
  } else privs = [privOf(topDict)]
  // charset: gid -> sid/cid
  const gidToCid = [0]
  const cp = topDict[15]?.[0]
  if (cp && cp > 2) {
    const fmt = d[cp]
    let p = cp + 1
    if (fmt === 0) for (let g = 1; g < nGlyphs; g++, p += 2) gidToCid.push(d.readUInt16BE(p))
    else {
      while (gidToCid.length < nGlyphs) {
        const first = d.readUInt16BE(p)
        const nLeft = fmt === 1 ? d[p + 2] : d.readUInt16BE(p + 2)
        p += fmt === 1 ? 3 : 4
        for (let k = 0; k <= nLeft; k++) gidToCid.push(first + k)
      }
    }
  } else for (let g = 1; g < nGlyphs; g++) gidToCid.push(g)
  const cidToGid = new Map(gidToCid.map((c, g) => [c, g]))
  const fm = topDict[1207] ?? [0.001, 0, 0, 0.001, 0, 0]
  return { charStrings, gsubrs, privs, fdSelect, isCID, cidToGid, fm }
}

// Type 2 charstring -> list of path commands in glyph units
function glyphPath(font, gid) {
  const priv = font.privs[font.fdSelect(gid)]
  const { gsubrs } = font
  const subrs = priv.subrs
  const cmds = []
  let x = 0, y = 0, stack = [], nStems = 0, haveWidth = false, open = false
  const moveTo = (nx, ny) => { if (open) cmds.push(['Z']); cmds.push(['M', nx, ny]); open = true }
  const lineTo = (nx, ny) => cmds.push(['L', nx, ny])
  const curveTo = (a, b, c, d, e, f) => cmds.push(['C', a, b, c, d, e, f])
  const stems = () => { if (stack.length % 2 && !haveWidth) stack.shift(); nStems += stack.length >> 1; stack = []; haveWidth = true }
  const run = (code) => {
    let i = 0
    while (i < code.length) {
      const v = code[i]
      if (v >= 32 || v === 28) {
        if (v === 28) { stack.push(code.readInt16BE(i + 1)); i += 3 }
        else if (v <= 246) { stack.push(v - 139); i++ }
        else if (v <= 250) { stack.push((v - 247) * 256 + code[i + 1] + 108); i += 2 }
        else if (v <= 254) { stack.push(-(v - 251) * 256 - code[i + 1] - 108); i += 2 }
        else { stack.push(code.readInt32BE(i + 1) / 65536); i += 5 }
        continue
      }
      i++
      switch (v) {
        case 1: case 3: case 18: case 23: stems(); break
        case 19: case 20: stems(); i += (nStems + 7) >> 3; break
        case 21: if (stack.length > 2 && !haveWidth) stack.shift(); haveWidth = true; y += stack.pop(); x += stack.pop(); moveTo(x, y); stack = []; break
        case 22: if (stack.length > 1 && !haveWidth) stack.shift(); haveWidth = true; x += stack.pop(); moveTo(x, y); stack = []; break
        case 4: if (stack.length > 1 && !haveWidth) stack.shift(); haveWidth = true; y += stack.pop(); moveTo(x, y); stack = []; break
        case 5: for (let k = 0; k < stack.length; k += 2) { x += stack[k]; y += stack[k + 1]; lineTo(x, y) } stack = []; break
        case 6: case 7: {
          let horiz = v === 6
          for (const d of stack) { if (horiz) x += d; else y += d; lineTo(x, y); horiz = !horiz }
          stack = []; break
        }
        case 8: for (let k = 0; k + 6 <= stack.length; k += 6) {
          const c1x = x + stack[k], c1y = y + stack[k + 1], c2x = c1x + stack[k + 2], c2y = c1y + stack[k + 3]
          x = c2x + stack[k + 4]; y = c2y + stack[k + 5]; curveTo(c1x, c1y, c2x, c2y, x, y)
        } stack = []; break
        case 24: { let k = 0
          for (; k + 6 <= stack.length - 2; k += 6) { const c1x = x + stack[k], c1y = y + stack[k + 1], c2x = c1x + stack[k + 2], c2y = c1y + stack[k + 3]; x = c2x + stack[k + 4]; y = c2y + stack[k + 5]; curveTo(c1x, c1y, c2x, c2y, x, y) }
          x += stack[k]; y += stack[k + 1]; lineTo(x, y); stack = []; break }
        case 25: { let k = 0
          for (; k + 2 <= stack.length - 6; k += 2) { x += stack[k]; y += stack[k + 1]; lineTo(x, y) }
          const c1x = x + stack[k], c1y = y + stack[k + 1], c2x = c1x + stack[k + 2], c2y = c1y + stack[k + 3]; x = c2x + stack[k + 4]; y = c2y + stack[k + 5]; curveTo(c1x, c1y, c2x, c2y, x, y); stack = []; break }
        case 26: { let k = 0; if (stack.length % 2) x += stack[k++]
          for (; k + 4 <= stack.length; k += 4) { const c1x = x, c1y = y + stack[k], c2x = c1x + stack[k + 1], c2y = c1y + stack[k + 2]; x = c2x; y = c2y + stack[k + 3]; curveTo(c1x, c1y, c2x, c2y, x, y) }
          stack = []; break }
        case 27: { let k = 0; if (stack.length % 2) y += stack[k++]
          for (; k + 4 <= stack.length; k += 4) { const c1x = x + stack[k], c1y = y, c2x = c1x + stack[k + 1], c2y = c1y + stack[k + 2]; x = c2x + stack[k + 3]; y = c2y; curveTo(c1x, c1y, c2x, c2y, x, y) }
          stack = []; break }
        case 30: case 31: {
          let horiz = v === 31, k = 0
          while (k + 4 <= stack.length) {
            const last = stack.length - k === 5
            let c1x, c1y, c2x, c2y
            if (horiz) { c1x = x + stack[k]; c1y = y; c2x = c1x + stack[k + 1]; c2y = c1y + stack[k + 2]; y = c2y + stack[k + 3]; x = c2x + (last ? stack[k + 4] : 0) }
            else { c1x = x; c1y = y + stack[k]; c2x = c1x + stack[k + 1]; c2y = c1y + stack[k + 2]; x = c2x + stack[k + 3]; y = c2y + (last ? stack[k + 4] : 0) }
            curveTo(c1x, c1y, c2x, c2y, x, y); k += last ? 5 : 4; horiz = !horiz
          }
          stack = []; break
        }
        case 10: { const n = stack.pop() + bias(subrs.length); run(subrs[n]); break }
        case 29: { const n = stack.pop() + bias(gsubrs.length); run(gsubrs[n]); break }
        case 11: return
        case 14: if (stack.length > 0 && !haveWidth) stack.shift(); if (open) cmds.push(['Z']); open = false; stack = []; return 'end'
        case 12: {
          const op = code[i++]
          if (op === 35) { // flex
            for (const k of [0, 6]) { const c1x = x + stack[k], c1y = y + stack[k + 1], c2x = c1x + stack[k + 2], c2y = c1y + stack[k + 3]; x = c2x + stack[k + 4]; y = c2y + stack[k + 5]; curveTo(c1x, c1y, c2x, c2y, x, y) }
          } else if (op === 34) { // hflex
            const [d1, d2, d3, d4, d5, d6, d7] = stack; const y0 = y
            let c1x = x + d1, c1y = y, c2x = c1x + d2, c2y = c1y + d3; x = c2x + d4; y = c2y; curveTo(c1x, c1y, c2x, c2y, x, y)
            c1x = x + d5; c1y = y; c2x = c1x + d6; c2y = y0; x = c2x + d7; y = y0; curveTo(c1x, c1y, c2x, c2y, x, y)
          } else if (op === 36) { // hflex1
            const [d1, d2, d3, d4, d5, d6, d7, d8, d9] = stack; const y0 = y
            let c1x = x + d1, c1y = y + d2, c2x = c1x + d3, c2y = c1y + d4; x = c2x + d5; y = c2y; curveTo(c1x, c1y, c2x, c2y, x, y)
            c1x = x + d6; c1y = y; c2x = c1x + d7; c2y = c1y + d8; x = c2x + d9; y = y0; curveTo(c1x, c1y, c2x, c2y, x, y)
          } else if (op === 37) { // flex1
            const s = stack, sx = x, sy = y
            let c1x = x + s[0], c1y = y + s[1], c2x = c1x + s[2], c2y = c1y + s[3]; x = c2x + s[4]; y = c2y + s[5]; curveTo(c1x, c1y, c2x, c2y, x, y)
            c1x = x + s[6]; c1y = y + s[7]; c2x = c1x + s[8]; c2y = c1y + s[9]
            const dx = c2x - sx, dy = c2y - sy
            if (Math.abs(dx) > Math.abs(dy)) { x = c2x + s[10]; y = sy } else { x = sx; y = c2y + s[10] }
            curveTo(c1x, c1y, c2x, c2y, x, y)
          }
          stack = []; break
        }
        default: stack = []
      }
    }
  }
  run(font.charStrings[gid])
  if (open && cmds.at(-1)?.[0] !== 'Z') cmds.push(['Z'])
  return cmds
}

// ---------------------------------------------------------------- fonts used on the page
function loadFont(type0Num) {
  const t0 = getObj(type0Num).dict
  const descNum = +/\/DescendantFonts \[\s*(\d+) 0 R/.exec(t0)[1]
  const desc = getObj(descNum).dict
  const wNum = +/\/W (\d+) 0 R/.exec(desc)[1]
  const fdNum = +/\/FontDescriptor (\d+) 0 R/.exec(desc)[1]
  const ffNum = +/\/FontFile3 (\d+) 0 R/.exec(getObj(fdNum).dict)[1]
  const cff = parseCFF(getObj(ffNum).stream)
  // widths
  const wSrc = getObj(wNum).dict.replace(/[\r\n]+/g, ' ')
  const widths = new Map()
  const toks = wSrc.match(/\[|\]|-?[\d.]+/g)
  let k = 1 // skip outer [
  while (k < toks.length - 1) {
    const first = +toks[k++]
    if (toks[k] === '[') {
      k++
      let c = first
      while (toks[k] !== ']') widths.set(c++, +toks[k++])
      k++
    } else {
      const last = +toks[k++], w = +toks[k++]
      for (let c = first; c <= last; c++) widths.set(c, w)
    }
  }
  return { cff, widths }
}

const fonts = { F16: loadFont(16), F29: loadFont(29) }

// ---------------------------------------------------------------- content stream interpreter
const page = getObj(4).dict
const mediaH = 541.08
const content = getObj(10).stream.toString('latin1')
const tokens = content.match(/<<[\s\S]*?>>|<[0-9A-Fa-f\s]*>|\[[^\]]*\]|\/[^\s/<>\[\]()]+|\([^)]*\)|[^\s<>\[\]()/]+/g)

const fmt = (n) => +n.toFixed(1)
const P = (x, y) => `${fmt(x)} ${fmt(mediaH - y)}`
const mul = (a, b) => [a[0] * b[0] + a[1] * b[2], a[0] * b[1] + a[1] * b[3], a[2] * b[0] + a[3] * b[2], a[2] * b[1] + a[3] * b[3], a[4] * b[0] + a[5] * b[2] + b[4], a[4] * b[1] + a[5] * b[3] + b[5]]
const apply = (m, x, y) => [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]]

const shadings = {}
for (const [name, num] of [...page.matchAll(/\/(Sh\d+) (\d+) 0 R/g)].map((m) => [m[1], +m[2]])) {
  const sd = getObj(num).dict
  const coords = /\/Coords \[([^\]]+)\]/.exec(sd)[1].trim().split(/\s+/).map(Number)
  const fnNum = +/\/Function (\d+) 0 R/.exec(sd)[1]
  const sub = +/\/Functions \[\s*(\d+) 0 R/.exec(getObj(fnNum).dict)[1]
  const fd = getObj(sub).dict
  const c0 = /\/C0 \[([^\]]+)\]/.exec(fd)[1].trim().split(/\s+/).map(Number)
  const c1 = /\/C1 \[([^\]]+)\]/.exec(fd)[1].trim().split(/\s+/).map(Number)
  shadings[name] = { coords, c0, c1 }
}

const hex = (c) => '#' + c.map((v) => Math.round(v * 255).toString(16).padStart(2, '0')).join('')
const elements = [] // { kind: 'path', d, fill } | { kind: 'clipfill', d, shading }
let stack = []
let fill = '#000', strokeW = 1
let path = ''
let font = null, size = 0, Tm = [1, 0, 0, 1, 0, 0], Tlm = [1, 0, 0, 1, 0, 0], Tr = 0
let clipText = ''
const bbox = [Infinity, Infinity, -Infinity, -Infinity]
const grow = (x, y) => { bbox[0] = Math.min(bbox[0], x); bbox[1] = Math.min(bbox[1], y); bbox[2] = Math.max(bbox[2], x); bbox[3] = Math.max(bbox[3], y) }

function showText(hexStr) {
  const h = hexStr.replace(/[<>\s]/g, '')
  for (let i = 0; i < h.length; i += 4) {
    const cid = parseInt(h.slice(i, i + 4), 16)
    const f = fonts[font]
    const gid = f.cff.isCID ? f.cff.cidToGid.get(cid) ?? cid : cid
    const cmds = glyphPath(f.cff, gid)
    const trm = mul([size * f.cff.fm[0], 0, 0, size * f.cff.fm[3], 0, 0], Tm)
    let d = ''
    for (const c of cmds) {
      if (c[0] === 'Z') { d += 'Z'; continue }
      d += c[0]
      for (let k = 1; k < c.length; k += 2) { const [px, py] = apply(trm, c[k], c[k + 1]); grow(px, py); d += P(px, py) + ' ' }
    }
    if (Tr === 7) clipText += d
    else elements.push({ kind: 'path', d, fill, text: true })
    const w = (f.widths.get(cid) ?? 0) / 1000 * size
    Tm = mul([1, 0, 0, 1, w, 0], Tm)
  }
}

for (const t of tokens) {
  if (/^[a-zA-Z*'"]+$/.test(t)) {
    const n = stack.map(Number)
    switch (t) {
      case 'm': path += `M${P(n[0], n[1])} `; grow(n[0], n[1]); break
      case 'l': path += `L${P(n[0], n[1])} `; grow(n[0], n[1]); break
      case 'c': path += `C${P(n[0], n[1])} ${P(n[2], n[3])} ${P(n[4], n[5])} `; grow(n[4], n[5]); break
      case 'h': path += 'Z '; break
      case 'w': strokeW = n[0]; break
      case 'scn': case 'sc': case 'rg': if (n.length === 3) fill = hex(n); break
      case 'b*': case 'f*': case 'f': case 'b': case 'B': case 'B*':
        elements.push({ kind: 'path', d: path.trim(), fill, evenodd: t.includes('*'), stroke: t.startsWith('b') || t.startsWith('B') ? strokeW : 0 })
        path = ''; break
      case 'n': path = ''; break
      case 'BT': Tm = [1, 0, 0, 1, 0, 0]; Tlm = [1, 0, 0, 1, 0, 0]; clipText = ''; break
      case 'Tr': Tr = n[0]; break
      case 'Tf': font = stack[0].slice(1); size = n[1]; break
      case 'Tm': Tm = n.slice(0, 6); Tlm = Tm.slice(); break
      case 'TD': case 'Td': Tlm = mul([1, 0, 0, 1, n[0], n[1]], Tlm); Tm = Tlm.slice(); break
      case 'Tj': showText(stack[0]); break
      case 'ET': if (Tr === 7 && clipText) elements.push({ kind: 'clip', d: clipText }); Tr = Tr === 7 ? 7 : Tr; break
      case 'sh': {
        const clip = [...elements].reverse().find((e) => e.kind === 'clip' && !e.used)
        clip.used = true
        clip.shading = shadings[stack[0].slice(1)]
        break
      }
      case 'Q': Tr = 0; break
    }
    stack = []
  } else stack.push(t)
}

// ---------------------------------------------------------------- write SVGs
const PAPER = '#f7f6f2'

function boundsOf(paths, pad) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity
  for (const d of paths)
    for (const m of d.matchAll(/(-?[\d.]+) (-?[\d.]+)/g)) {
      x0 = Math.min(x0, +m[1]); x1 = Math.max(x1, +m[1]); y0 = Math.min(y0, +m[2]); y1 = Math.max(y1, +m[2])
    }
  return [x0 - pad, y0 - pad, x1 - x0 + pad * 2, y1 - y0 + pad * 2].map(fmt)
}

/**
 * tagline: include the "Your Trustworthy & Reliable Partner." line
 * wordmark: include "Saye Graphics"
 * paper:    single colour (paper) for dark backgrounds
 */
function render({ tagline, wordmark, paper = false, square = false }) {
  const defs = []
  const body = []
  const paths = []
  let gi = 0
  for (const e of elements) {
    if (e.kind === 'path') {
      if (e.text && !tagline) continue
      const col = paper ? PAPER : e.fill
      const stroke = e.stroke ? ` stroke="${col}" stroke-width="${e.stroke}"` : ''
      body.push(`<path${e.evenodd ? ' fill-rule="evenodd"' : ''} fill="${col}"${stroke} d="${e.d}"/>`)
      paths.push(e.d)
    } else if (e.kind === 'clip' && e.shading && wordmark) {
      paths.push(e.d)
      if (paper) {
        body.push(`<path fill="${PAPER}" d="${e.d}"/>`)
        continue
      }
      const { coords: c, c0, c1 } = e.shading
      const id = `g${gi++}`
      defs.push(`<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${fmt(c[0])}" y1="${fmt(mediaH - c[1])}" x2="${fmt(c[2])}" y2="${fmt(mediaH - c[3])}"><stop offset="0" stop-color="${hex(c0)}"/><stop offset="1" stop-color="${hex(c1)}"/></linearGradient>`)
      body.push(`<path fill="url(#${id})" d="${e.d}"/>`)
    }
  }
  let box = boundsOf(paths, 2)
  if (square) {
    const s = Math.max(box[2], box[3])
    box = [fmt(box[0] + box[2] / 2 - s / 2), fmt(box[1] + box[3] / 2 - s / 2), fmt(s), fmt(s)]
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${box.join(' ')}" width="${box[2]}" height="${box[3]}">${defs.length ? `<defs>${defs.join('')}</defs>` : ''}${body.join('')}</svg>\n`
  return { svg, width: box[2], height: box[3] }
}

const outputs = {
  'saye-graphics-logo.svg': render({ tagline: true, wordmark: true }),
  'saye-graphics-lockup.svg': render({ tagline: false, wordmark: true }),
  'saye-graphics-lockup-light.svg': render({ tagline: false, wordmark: true, paper: true }),
  'saye-graphics-mark.svg': render({ tagline: false, wordmark: false, square: true }),
}
for (const [name, { svg, width, height }] of Object.entries(outputs)) {
  writeFileSync(join(outDir, name), svg)
  console.log(`${name.padEnd(34)} ${width} x ${height}  ${(svg.length / 1024).toFixed(1)} KB`)
}
