import { useLanguage } from '../i18n/useLanguage.js'
import { heroVideo } from '../data/portfolio.js'
import { externalLinkProps, useWhatsAppUrl } from '../lib/whatsapp.js'
import VideoPlayer from './VideoPlayer.jsx'

export default function Hero() {
  const { t } = useLanguage()
  const whatsappUrl = useWhatsAppUrl()

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="eyebrow">{t('hero.eyebrow')}</p>
          <h1 id="hero-title" className="hero__title">
            {t('hero.title')}
          </h1>
          <p className="hero__subtitle">{t('hero.subtitle')}</p>
          <div className="hero__actions">
            <a className="btn btn--primary" href={whatsappUrl} {...externalLinkProps}>
              {t('hero.ctaPrimary')}
            </a>
            <a className="btn btn--secondary" href="#portfolio">
              {t('hero.ctaSecondary')}
            </a>
          </div>
        </div>

        <div className="hero__media">
          <VideoPlayer video={heroVideo} autoPlay lazy={false} />
        </div>
      </div>
    </section>
  )
}
