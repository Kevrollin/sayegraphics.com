export interface NavItem {
  label: string
  /** Section id on the page, without the leading "#". */
  id: string
}

export const navigation: NavItem[] = [
  { label: 'Home', id: 'home' },
  { label: 'Services', id: 'services' },
  { label: 'Our Work', id: 'work' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
]
