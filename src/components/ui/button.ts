type Variant = 'primary' | 'secondary' | 'dark' | 'light' | 'outline-light'
type Size = 'md' | 'sm'

const base =
  'group/button inline-flex items-center justify-center gap-2.5 rounded-full font-bold tracking-[-0.01em] whitespace-nowrap select-none transition-[background-color,color,border-color,translate] duration-300 ease-out-quint active:translate-y-px'

const sizes: Record<Size, string> = {
  md: 'min-h-13 px-7 text-[0.9375rem]',
  sm: 'min-h-11 px-5 text-sm',
}

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-white hover:bg-accent-deep',
  secondary: 'border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-paper',
  dark: 'bg-ink text-paper hover:bg-ink-raised',
  light: 'bg-paper text-ink hover:bg-white',
  'outline-light': 'border border-paper/25 text-paper hover:border-paper hover:bg-paper hover:text-ink',
}

/** Shared button styling for <a> and <button> elements. */
export function buttonClasses(variant: Variant = 'primary', size: Size = 'md', extra = '') {
  return `${base} ${sizes[size]} ${variants[variant]} ${extra}`.trim()
}

/** Icon that nudges forward on hover. Pair with buttonClasses(). */
export const buttonIconClasses =
  'size-[1.05em] shrink-0 transition-transform duration-300 ease-out-quint group-hover/button:translate-x-0.5'
