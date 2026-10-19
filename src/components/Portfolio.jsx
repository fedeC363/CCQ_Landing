import { useState } from 'react'
import { useLanguage } from '../i18n/useLanguage.js'
import { FEATURED_COUNT, portfolio } from '../data/portfolio.js'
import VideoPlayer from './VideoPlayer.jsx'
import SectionMarker from './SectionMarker.jsx'
import { ArrowIcon } from './Icons.jsx'

export default function Portfolio() {
  const { t } = useLanguage()
  const [expanded, setExpanded] = useState(false)

  const hasMore = portfolio.length > FEATURED_COUNT
  const visible = expanded ? portfolio : portfolio.slice(0, FEATURED_COUNT)

  return (
    <section id="portfolio" className="section portfolio" aria-labelledby="portfolio-title">
      <div className="container">
        <SectionMarker number="05" />
        <div className="portfolio__header">
          <div>
            <h2 id="portfolio-title" className="section-title">
              {t('portfolio.title')}
            </h2>
            <p className="section-subtitle">{t('portfolio.subtitle')}</p>
          </div>
          {hasMore && !expanded && (
            <button type="button" className="btn btn--ghost" onClick={() => setExpanded(true)}>
              {t('portfolio.more')}
              <ArrowIcon />
            </button>
          )}
        </div>
      </div>

      {/* En mobile es un carrusel horizontal: el contenedor es enfocable para
          poder desplazarlo con el teclado. En escritorio, grilla de cuatro
          columnas con las pares desfasadas hacia abajo. */}
      <div className="portfolio__scroller" tabIndex={0} role="region" aria-labelledby="portfolio-title">
        <ul className="portfolio__list">
          {visible.map((video) => (
            <li key={video.id} className="portfolio__item">
              <VideoPlayer video={video} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
