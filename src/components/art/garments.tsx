import type { ReactNode } from 'react'

/*
 * Illustrated garment mockups (front view, flat lay).
 *
 * Fabric colour is passed in as a Tailwind fill class so mockups follow the
 * palette in src/styles/index.css. Shading, ribbing and stitching are drawn
 * as translucent black or white layers on top of the fabric, so they work on
 * any colour.
 */

export interface GarmentProps {
  /** Tailwind fill class for the fabric, e.g. "fill-accent". */
  fabric: string
  /** Dark fabrics get lighter stitching and drawcords. */
  dark?: boolean
  /** Artwork placed in the print area: an <svg> with its own viewBox. */
  print?: ReactNode
  x?: number
  y?: number
  width?: number | string
  height?: number | string
  className?: string
}

const TEE = {
  viewBox: '0 0 500 480',
  silhouette:
    'M190 42C170 50 120 66 82 82L14 186L78 232C90 218 100 206 106 196C108 280 108 380 108 462C200 468 300 468 392 462C392 380 392 280 394 196C400 206 410 218 422 232L486 186L418 82C380 66 330 50 310 42C282 54 218 54 190 42Z',
  backRib: 'M190 42C218 54 282 54 310 42L300 46C278 60 222 60 200 46Z',
  neckHole: 'M200 46C222 60 278 60 300 46C290 84 210 84 200 46Z',
  frontRib: 'M190 42C198 98 302 98 310 42L300 46C290 84 210 84 200 46Z',
  collarSeam: 'M190 42C198 98 302 98 310 42',
  armholes: ['M82 82C98 120 104 160 106 196', 'M418 82C402 120 396 160 394 196'],
  hems: ['M20 180L81 223', 'M480 180L419 223', 'M110 452C200 458 300 458 390 452'],
  folds: ['M110 208C132 222 148 238 160 264', 'M390 208C368 222 352 238 340 264'],
  shade: 'M394 196C392 280 392 380 392 462C384 463 376 463 368 463C370 380 372 290 378 214Z',
  printBox: { x: 168, y: 112, width: 164, height: 220 },
}

export function Tee({ fabric, dark, print, x, y, width, height, className }: GarmentProps) {
  const stitch = dark ? 'stroke-white/22' : 'stroke-black/16'
  return (
    <svg
      viewBox={TEE.viewBox}
      x={x}
      y={y}
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d={TEE.silhouette} className={fabric} />
      <path d={TEE.shade} className="fill-black/[0.06]" />
      <path d={TEE.backRib} className="fill-black/[0.08]" />
      <path d={TEE.neckHole} className={dark ? 'fill-black/45' : 'fill-black/[0.16]'} />
      <path d={TEE.frontRib} className="fill-black/[0.05]" />
      <g fill="none" strokeLinecap="round">
        <path d={TEE.collarSeam} className="stroke-black/[0.14]" strokeWidth={1.5} />
        {TEE.armholes.map((d) => (
          <path key={d} d={d} className="stroke-black/[0.12]" strokeWidth={1.5} />
        ))}
        {TEE.hems.map((d) => (
          <path key={d} d={d} className={stitch} strokeWidth={1.4} strokeDasharray="5 4" />
        ))}
        {TEE.folds.map((d) => (
          <path key={d} d={d} className="stroke-black/[0.06]" strokeWidth={4} />
        ))}
      </g>
      {print ? (
        <svg {...TEE.printBox} overflow="visible">
          {print}
        </svg>
      ) : null}
    </svg>
  )
}

const ribLines = (x1: number, x2: number, y1: number, y2: number, step: number) => {
  const lines: string[] = []
  for (let x = x1; x <= x2; x += step) lines.push(`M${x} ${y1}V${y2}`)
  return lines.join('')
}

const HOODIE = {
  viewBox: '0 0 520 560',
  hoodBack: 'M168 152C152 86 202 36 260 36C318 36 368 86 352 152Z',
  body: 'M178 120C150 130 120 140 96 152C80 230 60 340 40 440L46 494L100 496L100 444C104 380 116 300 128 238C130 320 132 400 134 470L138 524L382 524L386 470C388 400 390 320 392 238C404 300 416 380 420 444L420 496L474 494L480 440C460 340 440 230 424 152C400 140 370 130 342 120Z',
  hoodFront:
    'M176 118C172 168 214 212 260 232C306 212 348 168 344 118C330 96 300 84 260 84C220 84 190 96 176 118Z',
  hoodLining:
    'M206 118C203 84 232 64 260 64C288 64 317 84 314 118C310 150 290 178 260 196C230 178 210 150 206 118Z',
  hoodSeam: 'M193 118C190 76 226 50 260 50C294 50 330 76 327 118C323 160 296 192 260 212C224 192 197 160 193 118Z',
  hoodOverlap: 'M236 188C246 206 254 220 260 232',
  shade: 'M392 238C390 320 388 400 386 470L366 470C368 400 370 320 374 252Z',
  sleeveShade: ['M100 444C104 380 116 300 128 238L118 300C112 360 108 400 108 444Z', 'M420 444C416 380 404 300 392 238L402 300C408 360 412 400 412 444Z'],
  armholes: ['M96 152C108 176 120 206 128 238', 'M424 152C412 176 400 206 392 238'],
  folds: ['M66 300C80 310 96 314 114 312', 'M454 300C440 310 424 314 406 312', 'M150 200C170 214 182 228 190 246', 'M370 200C350 214 338 228 330 246'],
  waistband: 'M134 470L386 470L382 524L138 524Z',
  waistRibs: ribLines(146, 374, 476, 518, 9),
  cuffs: ['M41 442L100 444L100 496L46 494Z', 'M479 442L420 444L420 496L474 494Z'],
  cuffRibs: ribLines(52, 94, 450, 488, 7) + ribLines(426, 468, 450, 488, 7),
  pocket: 'M188 352L332 352C340 382 350 412 356 440L356 462L164 462L164 440C170 412 180 382 188 352Z',
  pocketOpenings: ['M188 352C180 382 170 412 164 440', 'M332 352C340 382 350 412 356 440'],
  pocketStitch: 'M192 359H328',
  cords: ['M244 192C243 206 242 220 241 234', 'M276 192C277 206 278 220 279 232'],
  aglets: [
    { x: 236.5, y: 232, r: -2 },
    { x: 274.5, y: 230, r: 2 },
  ],
  printBox: { x: 184, y: 252, width: 152, height: 94 },
}

export function Hoodie({ fabric, dark, print, x, y, width, height, className }: GarmentProps) {
  const stitch = dark ? 'stroke-white/22' : 'stroke-black/16'
  return (
    <svg
      viewBox={HOODIE.viewBox}
      x={x}
      y={y}
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d={HOODIE.hoodBack} className={fabric} />
      <path d={HOODIE.hoodBack} className="fill-black/[0.07]" />
      <path d={HOODIE.body} className={fabric} />
      <path d={HOODIE.shade} className="fill-black/[0.06]" />
      {HOODIE.sleeveShade.map((d) => (
        <path key={d} d={d} className="fill-black/[0.05]" />
      ))}
      <path d={HOODIE.waistband} className="fill-black/[0.07]" />
      {HOODIE.cuffs.map((d) => (
        <path key={d} d={d} className="fill-black/[0.07]" />
      ))}
      <path d={HOODIE.pocket} className="fill-black/[0.04]" />
      <g fill="none" strokeLinecap="round">
        <path d={HOODIE.waistRibs + HOODIE.cuffRibs} className="stroke-black/[0.09]" strokeWidth={1.2} />
        {HOODIE.armholes.map((d) => (
          <path key={d} d={d} className="stroke-black/[0.12]" strokeWidth={1.5} />
        ))}
        {HOODIE.folds.map((d) => (
          <path key={d} d={d} className="stroke-black/[0.07]" strokeWidth={4} />
        ))}
        {HOODIE.pocketOpenings.map((d) => (
          <path key={d} d={d} className="stroke-black/[0.2]" strokeWidth={2.5} />
        ))}
        <path d={HOODIE.pocketStitch} className={stitch} strokeWidth={1.4} strokeDasharray="5 4" />
      </g>
      {print ? (
        <svg {...HOODIE.printBox} overflow="visible">
          {print}
        </svg>
      ) : null}
      <path d={HOODIE.hoodFront} className={fabric} />
      <path d={HOODIE.hoodFront} className="fill-black/[0.04]" />
      <path d={HOODIE.hoodLining} className={dark ? 'fill-black/50' : 'fill-black/30'} />
      <g fill="none" strokeLinecap="round">
        <path d={HOODIE.hoodSeam} className={stitch} strokeWidth={1.4} strokeDasharray="5 4" />
        <path d={HOODIE.hoodOverlap} className="stroke-black/[0.16]" strokeWidth={2} />
        {HOODIE.cords.map((d) => (
          <path key={d} d={d} className={dark ? 'stroke-paper/90' : 'stroke-paper'} strokeWidth={5} />
        ))}
      </g>
      {HOODIE.aglets.map(({ x: ax, y: ay, r }) => (
        <rect
          key={ax}
          x={ax}
          y={ay}
          width={9}
          height={16}
          rx={3}
          transform={`rotate(${r} ${ax + 4.5} ${ay + 8})`}
          className="fill-ink/80"
        />
      ))}
      <circle cx={244} cy={192} r={5} className="fill-black/30" />
      <circle cx={276} cy={192} r={5} className="fill-black/30" />
    </svg>
  )
}

/** Outline-only silhouettes, used by the small service illustrations. */
export const garmentOutlines = {
  tee: { viewBox: TEE.viewBox, d: TEE.silhouette, collar: TEE.collarSeam },
  hoodie: { viewBox: HOODIE.viewBox, body: HOODIE.body, hood: HOODIE.hoodBack, front: HOODIE.hoodFront, lining: HOODIE.hoodLining },
}
