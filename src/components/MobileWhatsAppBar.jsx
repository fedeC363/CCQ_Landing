import { useLanguage } from '../i18n/useLanguage.js'
import { externalLinkProps, useWhatsAppUrl } from '../lib/whatsapp.js'
import { ChatIcon } from './Icons.jsx'

// Boton de WhatsApp fijo abajo, solo en mobile (se oculta desde 48rem).
export default function MobileWhatsAppBar() {
  const { t } = useLanguage()
  const whatsappUrl = useWhatsAppUrl()

  return (
    <div className="mobile-bar">
      <a className="btn btn--primary btn--block mobile-bar__button" href={whatsappUrl} {...externalLinkProps}>
        <ChatIcon className="icon icon--lg" />
        {t('header.cta')}
      </a>
    </div>
  )
}
