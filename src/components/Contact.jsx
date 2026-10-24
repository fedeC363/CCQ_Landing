import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/useLanguage.js'
import { externalLinkProps, useWhatsAppUrl } from '../lib/whatsapp.js'
import { useEmail } from '../lib/email.js'
import SectionMarker from './SectionMarker.jsx'
import { ChatIcon, CheckIcon, CopyIcon } from './Icons.jsx'

const COPIED_MS = 2000

// Linea del mail: alternativa discreta a WhatsApp. Sin boton lima: texto con
// enlace y un boton de copiar. La direccion se arma en ejecucion (useEmail).
function EmailLine() {
  const { t } = useLanguage()
  const { address, href } = useEmail()
  const linkRef = useRef(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), COPIED_MS)
    return () => clearTimeout(timer)
  }, [copied])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
    } catch {
      // Si el navegador no deja copiar, se selecciona el texto para que el
      // visitante lo copie a mano.
      const selection = window.getSelection()
      const range = document.createRange()
      range.selectNodeContents(linkRef.current)
      selection.removeAllRanges()
      selection.addRange(range)
    }
  }

  if (!address) return null

  return (
    <p className="contact__email">
      <span>{t('contact.email.label')}</span>{' '}
      <a ref={linkRef} className="contact__email-link" href={href}>
        {address}
      </a>
      <button type="button" className="contact__copy" onClick={handleCopy}>
        {copied ? <CheckIcon className="icon icon--sm" /> : <CopyIcon className="icon icon--sm" />}
        <span aria-live="polite">{copied ? t('contact.email.copied') : t('contact.email.copy')}</span>
      </button>
    </p>
  )
}

export default function Contact() {
  const { t } = useLanguage()
  const whatsappUrl = useWhatsAppUrl()

  return (
    <section id="contacto" className="section section--divided" aria-labelledby="contact-title">
      <div className="container contact">
        <SectionMarker number="11" />
        <h2 id="contact-title" className="contact__title">
          {t('contact.title')}
        </h2>
        <p className="contact__subtitle">{t('contact.subtitle')}</p>
        <a className="btn btn--primary btn--xl contact__whatsapp" href={whatsappUrl} {...externalLinkProps}>
          <ChatIcon className="icon icon--lg" />
          {t('contact.whatsappButton')}
        </a>
        <EmailLine />
      </div>
    </section>
  )
}
