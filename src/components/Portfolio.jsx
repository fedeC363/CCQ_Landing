import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/useLanguage.js'
import { FEATURED_COUNT, portfolio } from '../data/portfolio.js'
import { useReducedMotion } from '../lib/useReducedMotion.js'
import { useVideoDescription } from '../lib/useVideoDescription.js'
import SectionMarker from './SectionMarker.jsx'
import Poster from './Poster.jsx'
import VideoModal from './VideoModal.jsx'
import { ArrowIcon, PlayIcon } from './Icons.jsx'

// Tarjeta del portfolio.
// - Vista previa en bucle y sin audio. Su src recien se asigna cuando la
//   tarjeta entra en pantalla (IntersectionObserver, preload="none") y se
//   pausa al salir.
// - Con "reducir movimiento" la vista previa no arranca: queda el poster.
// - Al tocar se abre la version completa, con audio y controles.
// - En pantalla no se indica con que plan se hizo el video.
function PortfolioCard({ video, onOpen }) {
  const { t } = useLanguage()
  const describe = useVideoDescription()
  const reducedMotion = useReducedMotion()
  const cardRef = useRef(null)
  const videoRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [playing, setPlaying] = useState(false)

  const description = describe(video)

  useEffect(() => {
    if (reducedMotion) return
    if (!('IntersectionObserver' in window)) {
      setInView(true)
      setLoaded(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting) setLoaded(true)
      },
      { rootMargin: '200px' },
    )
    observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [reducedMotion])

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    if (inView && !reducedMotion) el.play().catch(() => {})
    else el.pause()
  }, [inView, loaded, reducedMotion])

  return (
    <button
      ref={cardRef}
      type="button"
      className="video video--card portfolio-card"
      onClick={() => onOpen({ ...video, src: video.full, description })}
      aria-label={`${t('a11y.playVideo')}: ${description}`}
    >
      <video
        ref={videoRef}
        className="video__element"
        src={loaded ? video.preview : undefined}
        aria-hidden="true"
        muted
        loop
        playsInline
        preload="none"
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <Poster poster={video.poster} alt={description} className={playing ? 'poster--hidden' : ''} />
      <span className="video__play-icon portfolio-card__play" aria-hidden="true">
        <PlayIcon className="icon icon--lg" />
      </span>
    </button>
  )
}

export default function Portfolio() {
  const { t } = useLanguage()
  const [expanded, setExpanded] = useState(false)
  const [active, setActive] = useState(null)

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
              <PortfolioCard video={video} onOpen={setActive} />
            </li>
          ))}
        </ul>
      </div>

      <VideoModal video={active} onClose={() => setActive(null)} />
    </section>
  )
}
