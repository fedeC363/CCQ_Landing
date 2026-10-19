import { LANGUAGES, useLanguage } from '../i18n/useLanguage.js'
import { site } from '../content/site.config.js'
import { externalLinkProps, useWhatsAppUrl } from '../lib/whatsapp.js'

export default function Header() {
  const { lang, setLang, t, slogan } = useLanguage()
  const whatsappUrl = useWhatsAppUrl()

  return (
    <header className="site-header" id="top">
      <div className="container site-header__inner">
        {/* [PENDIENTE] Logo: todavia no existe, se usa el nombre escrito. */}
        <a className="brand" href="#top" aria-label={t('a11y.home')}>
          <span className="brand__name">{site.name}</span>
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

          <a className="btn btn--primary btn--small site-header__cta" href={whatsappUrl} {...externalLinkProps}>
            {t('header.cta')}
          </a>
        </div>
      </div>
    </header>
  )
}
