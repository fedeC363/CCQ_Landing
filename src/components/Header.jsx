import { LANGUAGES, useLanguage } from '../i18n/useLanguage.js'
import { externalLinkProps, useWhatsAppUrl } from '../lib/whatsapp.js'
import { ChatIcon } from './Icons.jsx'
import Logo from './Logo.jsx'

export default function Header() {
  const { lang, setLang, t, slogan } = useLanguage()
  const whatsappUrl = useWhatsAppUrl()

  return (
    <header className="site-header" id="top">
      <div className="container site-header__inner">
        {/* Logo (imagen) + eslogan; todo el bloque es el enlace al inicio. */}
        <a className="brand" href="#top" aria-label={t('a11y.home')}>
          <Logo className="brand__logo" loading="eager" />
          <span className="brand__slogan">{slogan}</span>
        </a>

        <div className="site-header__actions">
          <div className="lang-switch" role="group" aria-label={t('a11y.languageSelector')}>
            {LANGUAGES.map((code) => (
              <button
                key={code}
                type="button"
                className="lang-switch__button"
                lang={code}
                aria-pressed={lang === code}
                aria-label={t(`languages.${code}.label`)}
                onClick={() => setLang(code)}
              >
                {t(`languages.${code}.short`)}
              </button>
            ))}
          </div>

          <a className="btn btn--primary btn--sm site-header__cta" href={whatsappUrl} {...externalLinkProps}>
            <ChatIcon />
            {t('header.cta')}
          </a>
        </div>
      </div>
    </header>
  )
}
