import { useState } from 'react'
import { useLanguage } from '../i18n/useLanguage.js'
import { externalLinkProps, useWhatsAppUrl } from '../lib/whatsapp.js'
import SectionMarker from './SectionMarker.jsx'
import { ChatIcon } from './Icons.jsx'

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT

export default function Contact() {
  const { t } = useLanguage()
  const whatsappUrl = useWhatsAppUrl()
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget

    // Validacion en el cliente con las reglas nativas (required, type=email).
    // El navegador muestra los avisos en el idioma del usuario.
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    if (!FORM_ENDPOINT) {
      console.error('[contacto] Falta VITE_FORM_ENDPOINT. Definila en .env (ver .env.example) o en Vercel.')
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      form.reset()
      setStatus('success')
    } catch (error) {
      console.error('[contacto] No se pudo enviar el formulario:', error)
      setStatus('error')
    }
  }

  const statusClass =
    status === 'success' ? ' contact-form__status--success' : status === 'error' ? ' contact-form__status--error' : ''

  return (
    <section id="contacto" className="section section--divided" aria-labelledby="contact-title">
      <div className="container contact">
        <div className="contact__intro">
          <SectionMarker number="11" />
          <h2 id="contact-title" className="contact__title">
            {t('contact.title')}
          </h2>
          <p className="contact__subtitle">{t('contact.subtitle')}</p>
          <a className="btn btn--primary btn--xl contact__whatsapp" href={whatsappUrl} {...externalLinkProps}>
            <ChatIcon className="icon icon--lg" />
            {t('contact.whatsappButton')}
          </a>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate aria-labelledby="contact-form-heading">
          <h3 id="contact-form-heading" className="contact-form__heading">
            {t('contact.form.heading')}
          </h3>

          <div className="contact-form__row">
            <div className="field">
              <label className="field__label" htmlFor="contact-name">
                {t('contact.form.name')}
              </label>
              <input className="field__input" id="contact-name" name="name" type="text" autoComplete="name" required />
            </div>

            <div className="field">
              <label className="field__label" htmlFor="contact-email">
                {t('contact.form.email')}
              </label>
              <input
                className="field__input"
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="field__label" htmlFor="contact-brand">
              {t('contact.form.brand')}
            </label>
            <input
              className="field__input"
              id="contact-brand"
              name="brand"
              type="text"
              autoComplete="organization"
              required
            />
          </div>

          <div className="field">
            <label className="field__label" htmlFor="contact-need">
              {t('contact.form.need')}
            </label>
            <textarea
              className="field__input field__input--textarea"
              id="contact-need"
              name="message"
              rows={4}
              placeholder={t('contact.form.needHint')}
              required
            />
          </div>

          {/* Trampa para bots de Formspree: las personas no ven este campo. */}
          <input
            className="contact-form__honeypot"
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <button type="submit" className="btn btn--light btn--block" disabled={status === 'sending'}>
            {t('contact.form.submit')}
          </button>

          <p className={`contact-form__status${statusClass}`} role="status" aria-live="polite">
            {status === 'success' && t('contact.form.success')}
            {status === 'error' && t('contact.form.error')}
          </p>
        </form>
      </div>
    </section>
  )
}
