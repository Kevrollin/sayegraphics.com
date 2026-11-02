import { Fragment, type ReactNode } from 'react'

/** Keeps hyphenated words such as "T-shirts" from breaking across two lines. */
export function keepHyphens(text: string): ReactNode {
  return text.split(/(\S*\w-\w\S*)/g).map((part, index) =>
    index % 2 === 1 ? (
      <span key={index} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  )
}
