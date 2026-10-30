import { useLanguage } from '../i18n/useLanguage.js'
import { site } from '../content/site.config.js'
import { externalLinkProps, useWhatsAppUrl } from '../lib/whatsapp.js'
import { useEmail } from '../lib/email.js'
import Logo from './Logo.jsx'

export default function Footer() {
  const { t, slogan } = useLanguage()
  const whatsappUrl = useWhatsAppUrl()
  const email = useEmail()

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <Logo className="site-footer__logo" loading="lazy" sizes="100px" />
          <span className="site-footer__slogan">{slogan}</span>
        </div>

        <div className="site-footer__contact">
          <a className="site-footer__link" href={whatsappUrl} {...externalLinkProps}>
            {t('footer.whatsapp')}
          </a>
          {/* El mail se arma en ejecucion (useEmail): no queda escrito en el HTML. */}
          {email.address && (
            <a className="site-footer__link" href={email.href}>
              {t('footer.email')} {email.address}
            </a>
          )}
        </div>

        {/* Espacio reservado para iconos de redes sociales. [PENDIENTE]
            Todavia no existen: se cargan en site.config.js (social). */}
        {site.social.length > 0 && (
          <ul className="site-footer__social">
            {site.social.map((network) => (
              <li key={network.id}>
                <a className="site-footer__social-link" href={network.url} {...externalLinkProps}>
                  {network.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        <span className="site-footer__copyright">{t('footer.copyright')}</span>
      </div>
    </footer>
  )
}
