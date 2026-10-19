import { useLanguage } from '../i18n/useLanguage.js'
import { site } from '../content/site.config.js'
import { externalLinkProps, useWhatsAppUrl } from '../lib/whatsapp.js'

export default function Footer() {
  const { t, slogan } = useLanguage()
  const whatsappUrl = useWhatsAppUrl()

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div>
          <p className="site-footer__name">{site.name}</p>
          <p className="site-footer__slogan">{slogan}</p>
          <p>
            <a className="site-footer__link" href={whatsappUrl} {...externalLinkProps}>
              {t('footer.whatsapp')}
            </a>
          </p>
        </div>

        <div>
          {/* Espacio reservado para iconos de redes sociales. [PENDIENTE]
              Todavia no existen: se cargan en site.config.js (social). */}
          {site.social.length > 0 && (
            <ul className="site-footer__social">
              {site.social.map((network) => (
                <li key={network.id}>
                  <a className="site-footer__link" href={network.url} {...externalLinkProps}>
                    {network.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <p className="site-footer__copyright">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
