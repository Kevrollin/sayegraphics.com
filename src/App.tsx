import { About } from './components/About'
import { Contact } from './components/Contact'
import { FloatingWhatsApp } from './components/FloatingWhatsApp'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Portfolio } from './components/Portfolio'
import { Process } from './components/Process'
import { Services } from './components/Services'
import { TrustSection } from './components/TrustSection'
import { QuoteProvider } from './context/QuoteContext'
import { useReveal } from './hooks/useReveal'

export default function App() {
  useReveal()

  return (
    <QuoteProvider>
      <Navbar />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Process />
        <TrustSection />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </QuoteProvider>
  )
}
