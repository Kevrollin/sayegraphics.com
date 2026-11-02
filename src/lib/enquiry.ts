import { business } from '../data/business'
import { whatsappHref } from './links'

export type ContactMethod = 'whatsapp' | 'call'

export interface Enquiry {
  name: string
  service: string
  details: string
  contactMethod: ContactMethod | ''
}

export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>

export const contactMethodLabels: Record<ContactMethod, string> = {
  whatsapp: 'WhatsApp message',
  call: 'Phone call',
}

export const limits = {
  nameMax: 80,
  detailsMin: 10,
  detailsMax: 1000,
}

const collapse = (value: string) => value.replace(/\s+/g, ' ').trim()

export function validateEnquiry(enquiry: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {}
  const name = collapse(enquiry.name)
  const details = enquiry.details.trim()

  if (!name) errors.name = 'Please enter your name.'
  else if (name.length < 2) errors.name = 'Please enter your full name.'
  else if (name.length > limits.nameMax) errors.name = `Please keep your name under ${limits.nameMax} characters.`

  if (!enquiry.service) errors.service = 'Please choose the service you need.'

  if (!details) errors.details = 'Please tell us a little about your project.'
  else if (details.length < limits.detailsMin)
    errors.details = 'Please add a few more details, such as quantities, sizes or colours.'
  else if (details.length > limits.detailsMax)
    errors.details = `Please keep the description under ${limits.detailsMax} characters.`

  if (!enquiry.contactMethod) errors.contactMethod = 'Please choose how we should get back to you.'

  return errors
}

/** The text that appears in the visitor's WhatsApp chat, ready to send. */
export function formatEnquiryMessage(enquiry: Enquiry) {
  const method = enquiry.contactMethod ? contactMethodLabels[enquiry.contactMethod] : ''
  const details = enquiry.details
    .trim()
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')

  return [
    `Hello ${business.shortName}, I'd like a quote.`,
    '',
    `*Name:* ${collapse(enquiry.name)}`,
    `*Service:* ${enquiry.service}`,
    `*Project details:* ${details}`,
    `*Preferred reply:* ${method}${enquiry.contactMethod === 'call' ? ' (please call me on this number)' : ''}`,
    '',
    'Sent from the Saye Graphics website.',
  ].join('\n')
}

export function enquiryWhatsappHref(enquiry: Enquiry) {
  return whatsappHref(formatEnquiryMessage(enquiry))
}
