import { ChevronDown, CircleAlert, CircleCheck, MessageCircle, RotateCcw } from 'lucide-react'
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { useQuote } from '../context/QuoteContext'
import { otherServiceLabel, services } from '../data/services'
import {
  contactMethodLabels,
  enquiryWhatsappHref,
  limits,
  validateEnquiry,
  type ContactMethod,
  type Enquiry,
  type EnquiryErrors,
} from '../lib/enquiry'
import { buttonClasses } from './ui/button'

const EMPTY: Enquiry = { name: '', service: '', details: '', contactMethod: 'whatsapp' }
const FIELD_ORDER = ['name', 'service', 'details', 'contactMethod'] as const

const fieldClasses =
  'mt-2 block w-full border bg-paper px-4 text-base text-ink transition-colors placeholder:text-subtle hover:border-ink/50 focus:border-ink'

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-sm font-semibold text-danger">
      <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      {message}
    </p>
  )
}

function Label({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-bold">
      {children}
    </label>
  )
}

export function QuoteForm() {
  const uid = useId()
  const ids = {
    name: 'quote-name',
    service: `${uid}-service`,
    details: `${uid}-details`,
    method: `${uid}-method`,
  }
  const { request } = useQuote()
  const [values, setValues] = useState<Enquiry>(EMPTY)
  const [errors, setErrors] = useState<EnquiryErrors>({})
  const [attempted, setAttempted] = useState(false)
  const [sentHref, setSentHref] = useState<string | null>(null)

  const nameRef = useRef<HTMLInputElement>(null)
  const serviceRef = useRef<HTMLSelectElement>(null)
  const detailsRef = useRef<HTMLTextAreaElement>(null)
  const methodRef = useRef<HTMLInputElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  // A service card or portfolio preview asked for a specific service.
  useEffect(() => {
    if (!request) return
    setValues((current) => ({ ...current, service: request.service }))
    setErrors((current) => ({ ...current, service: undefined }))
    setSentHref(null)
  }, [request])

  useEffect(() => {
    if (sentHref) statusRef.current?.focus()
  }, [sentHref])

  const update = <K extends keyof Enquiry>(field: K, value: Enquiry[K]) => {
    const next = { ...values, [field]: value }
    setValues(next)
    if (attempted) setErrors(validateEnquiry(next))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const found = validateEnquiry(values)
    setAttempted(true)
    setErrors(found)

    const firstInvalid = FIELD_ORDER.find((field) => found[field])
    if (firstInvalid) {
      const refs = { name: nameRef, service: serviceRef, details: detailsRef, contactMethod: methodRef }
      refs[firstInvalid].current?.focus()
      return
    }

    const href = enquiryWhatsappHref(values)
    const opened = window.open(href, '_blank')
    if (opened) opened.opener = null
    else window.location.href = href
    setSentHref(href)
  }

  const startOver = () => {
    setValues(EMPTY)
    setErrors({})
    setAttempted(false)
    setSentHref(null)
    requestAnimationFrame(() => nameRef.current?.focus())
  }

  const border = (field: keyof Enquiry) => (errors[field] ? 'border-danger' : 'border-line-strong')
  const describedBy = (field: keyof Enquiry, ...extra: string[]) =>
    [errors[field] ? `${uid}-${field}-error` : '', ...extra].filter(Boolean).join(' ') || undefined

  if (sentHref) {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="flex min-h-[28rem] flex-col justify-center border border-line bg-paper-raised p-6 focus:outline-none sm:p-10"
      >
        <CircleCheck aria-hidden="true" className="size-10 text-accent" strokeWidth={1.6} />
        <h3 className="mt-6 text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">Your enquiry is ready in WhatsApp</h3>
        <p className="mt-3 max-w-md leading-relaxed text-muted">
          WhatsApp has opened with your message filled in. Press <strong className="text-ink">send</strong> in WhatsApp
          to share it with Saye Graphics. Nothing is sent until you do.
        </p>
        <div className="mt-8 flex flex-col gap-3 xs:flex-row">
          <a href={sentHref} target="_blank" rel="noopener noreferrer" className={buttonClasses('primary')}>
            <MessageCircle aria-hidden="true" className="size-[1.1em]" />
            Open WhatsApp again
          </a>
          <button type="button" onClick={startOver} className={buttonClasses('secondary')}>
            <RotateCcw aria-hidden="true" className="size-[1em]" />
            Start a new enquiry
          </button>
        </div>
      </div>
    )
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-labelledby={`${uid}-title`}
      className="border border-line bg-paper-raised p-6 sm:p-10"
    >
      <h3 id={`${uid}-title`} className="text-2xl font-extrabold tracking-[-0.03em]">
        Request a quote
      </h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
        Fill in the details and we will open WhatsApp with your enquiry ready to send.
      </p>

      <div className="mt-8 grid gap-6">
        <div>
          <Label htmlFor={ids.name}>Full name</Label>
          <input
            ref={nameRef}
            id={ids.name}
            name="name"
            type="text"
            autoComplete="name"
            maxLength={limits.nameMax}
            value={values.name}
            onChange={(event) => update('name', event.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy('name')}
            className={`${fieldClasses} min-h-13 ${border('name')}`}
          />
          <FieldError id={`${uid}-name-error`} message={errors.name} />
        </div>

        <div>
          <Label htmlFor={ids.service}>Service required</Label>
          <div className="relative">
            <select
              ref={serviceRef}
              id={ids.service}
              name="service"
              value={values.service}
              onChange={(event) => update('service', event.target.value)}
              aria-invalid={errors.service ? true : undefined}
              aria-describedby={describedBy('service')}
              className={`${fieldClasses} min-h-13 appearance-none pr-12 ${border('service')} ${
                values.service ? '' : 'text-subtle'
              }`}
            >
              <option value="" disabled>
                Choose a service
              </option>
              {services.map((service) => (
                <option key={service.id} value={service.title} className="text-ink">
                  {service.title}
                </option>
              ))}
              <option value={otherServiceLabel} className="text-ink">
                {otherServiceLabel}
              </option>
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-4 mt-1 size-5 -translate-y-1/2 text-muted"
            />
          </div>
          <FieldError id={`${uid}-service-error`} message={errors.service} />
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-4">
            <Label htmlFor={ids.details}>Brief description</Label>
            <span id={`${uid}-details-count`} className="text-xs text-muted tabular-nums">
              {values.details.length}/{limits.detailsMax}
            </span>
          </div>
          <textarea
            ref={detailsRef}
            id={ids.details}
            name="details"
            rows={5}
            maxLength={limits.detailsMax}
            value={values.details}
            onChange={(event) => update('details', event.target.value)}
            placeholder="For example: 30 black hoodies with our logo on the chest, mixed sizes."
            aria-invalid={errors.details ? true : undefined}
            aria-describedby={describedBy('details', `${uid}-details-count`)}
            className={`${fieldClasses} resize-y py-3.5 leading-relaxed ${border('details')}`}
          />
          <FieldError id={`${uid}-details-error`} message={errors.details} />
        </div>

        <fieldset aria-describedby={describedBy('contactMethod')}>
          <legend className="text-sm font-bold">How should we get back to you?</legend>
          <div className="mt-2 grid gap-3 xs:grid-cols-2">
            {(Object.keys(contactMethodLabels) as ContactMethod[]).map((method, index) => (
              <label
                key={method}
                className="relative flex min-h-13 cursor-pointer items-center gap-3 border border-line-strong bg-paper px-4 text-[0.9375rem] font-semibold transition-colors hover:border-ink/50 has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-paper has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-accent has-[:focus-visible]:outline-solid"
              >
                <input
                  ref={index === 0 ? methodRef : undefined}
                  type="radio"
                  name={ids.method}
                  value={method}
                  checked={values.contactMethod === method}
                  onChange={() => update('contactMethod', method)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className="grid size-4.5 shrink-0 place-items-center rounded-full border-2 border-current opacity-60 peer-checked:opacity-100"
                >
                  <span className="size-2 rounded-full bg-current opacity-0 transition-opacity [label:has(:checked)_&]:opacity-100" />
                </span>
                {contactMethodLabels[method]}
              </label>
            ))}
          </div>
          <FieldError id={`${uid}-contactMethod-error`} message={errors.contactMethod} />
        </fieldset>
      </div>

      <div className="mt-9 flex flex-col gap-4 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-sm leading-relaxed text-muted">
          Opens WhatsApp with your enquiry filled in. Nothing is sent until you press send.
        </p>
        <button type="submit" className={buttonClasses('primary', 'md', 'shrink-0')}>
          <MessageCircle aria-hidden="true" className="size-[1.1em]" />
          Send via WhatsApp
        </button>
      </div>
    </form>
  )
}
