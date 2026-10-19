import { useLanguage } from '../i18n/useLanguage.js'
import { heroVideo } from '../data/portfolio.js'
import { externalLinkProps, useWhatsAppUrl } from '../lib/whatsapp.js'
import VideoPlayer from './VideoPlayer.jsx'
import { ArrowIcon } from './Icons.jsx'

// Separa el titular para subrayar la parte de hero.titleHighlight ("24 horas").
// Si el texto resaltado no aparece en el titular, se muestra el titular entero.
function highlight(title, part) {
  const index = part ? title.indexOf(part) : -1
  if (index === -1) return title
  return (
    <>
      {title.slice(0, index)}
      <span className="hero__highlight">{part}</span>
      {title.slice(index + part.length)}
    </>
  )
}

export default function Hero() {
  const { t } = useLanguage()
  const whatsappUrl = useWhatsAppUrl()
  const ruler = t('hero.ruler')

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero__inner">
          <div className="hero__content">
            <p className="hero__eyebrow">{t('hero.eyebrow')}</p>
            <h1 id="hero-title" className="hero__title">
              {highlight(t('hero.title'), t('hero.titleHighlight'))}
            </h1>
            <p className="hero__subtitle">{t('hero.subtitle')}</p>
            <div className="hero__actions">
              <a className="btn btn--primary btn--lg" href={whatsappUrl} {...externalLinkProps}>
                {t('hero.ctaPrimary')}
                <ArrowIcon className="icon icon--lg" />
              </a>
              <a className="btn btn--ghost btn--lg" href="#portfolio">
                {t('hero.ctaSecondary')}
              </a>
            </div>
          </div>

          <div className="hero__media">
            <span className="hero__corner hero__corner--tl" aria-hidden="true" />
            <span className="hero__corner hero__corner--tr" aria-hidden="true" />
            <span className="hero__corner hero__corner--bl" aria-hidden="true" />
            <span className="hero__corner hero__corner--br" aria-hidden="true" />
            <VideoPlayer video={heroVideo} autoPlay lazy={false} variant="hero" />
          </div>
        </div>

        {/* Regla de tiempo: la promesa de entrega dibujada (decorativa). */}
        <div className="ruler" aria-hidden="true">
          <div className="ruler__track">
            <span className="ruler__zone" />
            <span className="ruler__needle" />
            <span className="ruler__flag">{ruler.deadline}</span>
          </div>
          <div className="ruler__marks">
            {ruler.marks.map((mark) => (
              <span key={mark}>{mark}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
