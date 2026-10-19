import { site } from '../content/site.config.js'
import { useLanguage } from '../i18n/useLanguage.js'

export function whatsappUrl(message) {
  const base = `https://wa.me/${site.whatsapp.number}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

// Link de WhatsApp con el mensaje precargado en el idioma activo.
export function useWhatsAppUrl() {
  const { t } = useLanguage()
  return whatsappUrl(t('whatsapp.message'))
}

// Atributos comunes para todos los links que abren WhatsApp.
export const externalLinkProps = { target: '_blank', rel: 'noopener noreferrer' }
