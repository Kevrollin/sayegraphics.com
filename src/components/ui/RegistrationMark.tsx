/** Printer's registration target, used as a small decorative marker. */
export function RegistrationMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="8" cy="8" r="4.4" />
        <path d="M8 0.5v15M0.5 8h15" />
      </g>
    </svg>
  )
}
