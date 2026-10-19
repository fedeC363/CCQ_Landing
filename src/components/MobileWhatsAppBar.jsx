import { useLanguage } from '../i18n/useLanguage.js'
import { externalLinkProps, useWhatsAppUrl } from '../lib/whatsapp.js'

// Boton de WhatsApp fijo abajo, solo en mobile (se oculta desde 48rem).
export default function MobileWhatsAppBar() {
  const { t } = useLanguage()
  const whatsappUrl = useWhatsAppUrl()

  return (
    <div className="mobile-bar">
      <a className="btn btn--primary btn--block" href={whatsappUrl} {...externalLinkProps}>
        {t('header.cta')}
      </a>
    </div>
  )
}
