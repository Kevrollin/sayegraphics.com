import { createContext, use, useCallback, useMemo, useState, type ReactNode } from 'react'

/**
 * Lets service cards and portfolio previews pre-select a service in the quote
 * form. `requestId` changes on every request, so asking for the same service
 * twice still updates the form.
 */
interface QuoteRequest {
  service: string
  requestId: number
}

interface QuoteContextValue {
  request: QuoteRequest | null
  requestService: (service: string) => void
}

const QuoteContext = createContext<QuoteContextValue | null>(null)

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<QuoteRequest | null>(null)
  const requestService = useCallback((service: string) => {
    setRequest((previous) => ({ service, requestId: (previous?.requestId ?? 0) + 1 }))
  }, [])
  const value = useMemo(() => ({ request, requestService }), [request, requestService])
  return <QuoteContext value={value}>{children}</QuoteContext>
}

export function useQuote() {
  const context = use(QuoteContext)
  if (!context) throw new Error('useQuote must be used inside <QuoteProvider>')
  return context
}
