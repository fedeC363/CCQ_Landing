import { useLanguage } from './i18n/useLanguage.js'
import { useOrganizationSchema } from './lib/useOrganizationSchema.js'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import Problem from './components/Problem.jsx'
import Portfolio from './components/Portfolio.jsx'
import Offer from './components/Offer.jsx'
import Process from './components/Process.jsx'
import Pricing from './components/Pricing.jsx'
import Faq from './components/Faq.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import MobileWhatsAppBar from './components/MobileWhatsAppBar.jsx'

export default function App() {
  const { t } = useLanguage()
  useOrganizationSchema()

  return (
    <>
      <a className="skip-link" href="#main">
        {t('a11y.skipToContent')}
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Stats />
        <Problem />
        <Portfolio />
        <Offer />
        <Process />
        <Pricing />
        {/* 09 Testimonios: NO se renderiza todavia. Espera reseñas reales
            (nombre, marca y texto, minimo tres). Cuando existan, cargarlas en
            testimonials.items de es.json / en.json e importar
            components/Testimonials.jsx aca. */}
        <Faq />
        <Contact />
      </main>
      <Footer />
      <MobileWhatsAppBar />
    </>
  )
}
