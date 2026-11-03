// Minimal progressive MP4 (moov before mdat) muxer for one H.264 video track.
// Used by transcode-videos.mjs to package the frames Chrome's WebCodecs encoder produces.
const u8 = (n) => Buffer.from([n & 255])
const u16 = (n) => { const b = Buffer.alloc(2); b.writeUInt16BE(n); return b }
const u32 = (n) => { const b = Buffer.alloc(4); b.writeUInt32BE(n >>> 0); return b }
const str = (s) => Buffer.from(s, 'latin1')
const box = (type, ...parts) => { const body = Buffer.concat(parts.flat()); return Buffer.concat([u32(body.length + 8), str(type), body]) }
const full = (type, version, flags, ...parts) => box(type, u8(version), Buffer.from([(flags >> 16) & 255, (flags >> 8) & 255, flags & 255]), ...parts)
const matrix = Buffer.concat([0x00010000, 0, 0, 0, 0x00010000, 0, 0, 0, 0x40000000].map(u32))

export function muxMp4({ samples, description, width, height, fps }) {
  const timescale = fps * 512
  const delta = 512
  const n = samples.length
  const durTs = n * delta
  const durMs = Math.round((n / fps) * 1000)

  const avc1 = box('avc1',
    Buffer.alloc(6), u16(1), Buffer.alloc(16), u16(width), u16(height),
    u32(0x00480000), u32(0x00480000), u32(0), u16(1), Buffer.alloc(32), u16(0x0018), u16(0xffff),
    box('avcC', description), box('pasp', u32(1), u32(1)))
  const stsd = full('stsd', 0, 0, u32(1), avc1)
  const stts = full('stts', 0, 0, u32(1), u32(n), u32(delta))
  const keys = samples.map((s, i) => (s.key ? i + 1 : 0)).filter(Boolean)
  const stss = full('stss', 0, 0, u32(keys.length), ...keys.map(u32))
  const stsc = full('stsc', 0, 0, u32(1), u32(1), u32(n), u32(1))
  const stsz = full('stsz', 0, 0, u32(0), u32(n), ...samples.map((s) => u32(s.data.length)))

  const build = (offset) => {
    const stco = full('stco', 0, 0, u32(1), u32(offset))
    const stbl = box('stbl', stsd, stts, stss, stsc, stsz, stco)
    const minf = box('minf', full('vmhd', 0, 1, u16(0), u16(0), u16(0), u16(0)), box('dinf', full('dref', 0, 0, u32(1), full('url ', 0, 1))), stbl)
    const mdia = box('mdia',
      full('mdhd', 0, 0, u32(0), u32(0), u32(timescale), u32(durTs), u16(0x55c4), u16(0)),
      full('hdlr', 0, 0, u32(0), str('vide'), Buffer.alloc(12), str('VideoHandler\0')),
      minf)
    const tkhd = full('tkhd', 0, 3, u32(0), u32(0), u32(1), u32(0), u32(durMs), Buffer.alloc(8), u16(0), u16(0), u16(0), u16(0), matrix, u32(width << 16), u32(height << 16))
    const mvhd = full('mvhd', 0, 0, u32(0), u32(0), u32(1000), u32(durMs), u32(0x00010000), u16(0x0100), Buffer.alloc(10), matrix, Buffer.alloc(24), u32(2))
    return box('moov', mvhd, box('trak', tkhd, mdia))
  }
  const ftyp = box('ftyp', str('isom'), u32(512), str('isom'), str('iso2'), str('avc1'), str('mp41'))
  const moovSize = build(0).length
  const offset = ftyp.length + moovSize + 8
  const moov = build(offset)
  const payload = Buffer.concat(samples.map((s) => s.data))
  const mdat = Buffer.concat([u32(payload.length + 8), str('mdat'), payload])
  return Buffer.concat([ftyp, moov, mdat])
}
