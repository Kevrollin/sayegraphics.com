/**
 * Services shown in "What We Do", offered in the quote form and listed in the
 * structured data.
 *
 * These four come from what Google reviewers mention. They are provisional
 * until the owner confirms the full service list; add or remove entries here
 * and the rest of the site follows.
 */

export type ServiceId = 'graphic-design' | 'branding' | 'tshirt-printing' | 'hoodie-printing'

export interface Service {
  id: ServiceId
  title: string
  summary: string
}

export const services: Service[] = [
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    summary: 'Eye-catching artwork for print and screen, designed around your message.',
  },
  {
    id: 'branding',
    title: 'Branding & Identity',
    summary: 'Logos and visual identities that make your business instantly recognisable.',
  },
  {
    id: 'tshirt-printing',
    title: 'Custom T-Shirt Printing',
    summary: 'Your design printed on T-shirts for teams, events, businesses or just for you.',
  },
  {
    id: 'hoodie-printing',
    title: 'Custom Hoodie Printing',
    summary: 'Hoodies printed with your logo or artwork, made to be worn with pride.',
  },
]

/** Extra option at the end of the quote form's service list. */
export const otherServiceLabel = 'Something else'
