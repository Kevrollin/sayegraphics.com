import { ContourPrint } from './prints'

/*
 * A print proof: trim marks, a colour bar, the artwork under a selection box
 * and a short spec table, the way a job looks just before it goes to print.
 */

const TRIM = { x: 50, y: 48, w: 300, h: 404 }

function cropMarks() {
  const { x, y, w, h } = TRIM
  const len = 18
  const gap = 7
  const right = x + w
  const bottom = y + h
  return [
    `M${x - gap - len} ${y}h${len}`,
    `M${x} ${y - gap - len}v${len}`,
    `M${right + gap} ${y}h${len}`,
    `M${right} ${y - gap - len}v${len}`,
    `M${x - gap - len} ${bottom}h${len}`,
    `M${x} ${bottom + gap}v${len}`,
    `M${right + gap} ${bottom}h${len}`,
    `M${right} ${bottom + gap}v${len}`,
  ].join('')
}

const COLOUR_BAR = ['fill-ink', 'fill-accent', 'fill-sand-deep', 'fill-ink/45', 'fill-accent/45', 'fill-paper-deep']

const SELECTION = { x: 104, y: 81, size: 192 }

const HANDLES: [number, number][] = [0, 0.5, 1].flatMap((fy) =>
  [0, 0.5, 1]
    .filter((fx) => !(fx === 0.5 && fy === 0.5))
    .map((fx): [number, number] => [SELECTION.x + fx * SELECTION.size, SELECTION.y + fy * SELECTION.size]),
)

const SPECS = [
  { label: 'PRINT', value: 'Front chest' },
  { label: 'COLOURS', value: '1 colour' },
  { label: 'STAGE', value: 'Proof 01' },
]

export function ProofSheet({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 500"
      className={className}
      role="img"
      aria-label="Illustration of a print proof: a contour-line design with crop marks, a colour bar and selection handles"
    >
      <rect x="16" y="12" width="368" height="476" className="fill-paper-raised" />
      <path d={cropMarks()} fill="none" strokeWidth="1" className="stroke-ink" />

      <svg x="60" y="80" width="280" height="194" viewBox="0 0 150 104" overflow="visible">
        <ContourPrint line="stroke-ink" ink="fill-ink" dot="fill-accent" />
      </svg>

      <rect x={SELECTION.x} y={SELECTION.y - 17} width="80" height="14" className="fill-accent" />
      <text x={SELECTION.x + 6} y={SELECTION.y - 7} className="fill-white" fontSize="7.6" fontWeight="700" letterSpacing="0.3">
        contour-print.svg
      </text>
      <rect
        x={SELECTION.x}
        y={SELECTION.y}
        width={SELECTION.size}
        height={SELECTION.size}
        fill="none"
        strokeWidth="1.2"
        className="stroke-accent"
      />
      {HANDLES.map(([hx, hy]) => (
        <rect
          key={`${hx}-${hy}`}
          x={hx - 3.5}
          y={hy - 3.5}
          width="7"
          height="7"
          strokeWidth="1.2"
          className="fill-paper-raised stroke-accent"
        />
      ))}

      <text x="70" y="330" className="fill-ink" fontSize="16" fontWeight="800" letterSpacing="-0.3">
        Rift Valley Contour
      </text>
      <text x="70" y="347" className="fill-muted" fontSize="8.4" fontWeight="600" letterSpacing="0.3">
        Hoodie chest print · Concept artwork
      </text>
      <path d="M70 370H330" strokeWidth="1" className="stroke-line" />
      {SPECS.map(({ label, value }, i) => (
        <g key={label} transform={`translate(${70 + i * 88} 390)`}>
          <text className="fill-muted" fontSize="6.4" fontWeight="800" letterSpacing="1.6">
            {label}
          </text>
          <text y="16" className="fill-ink" fontSize="9.6" fontWeight="700">
            {value}
          </text>
        </g>
      ))}

      {COLOUR_BAR.map((fill, i) => (
        <rect key={fill} x={70 + i * 15} y="464" width="12" height="12" className={fill} />
      ))}
      <g fill="none" strokeWidth="1" className="stroke-ink">
        <circle cx="322" cy="470" r="6" />
        <path d="M322 460v20M312 470h20" />
      </g>
    </svg>
  )
}
