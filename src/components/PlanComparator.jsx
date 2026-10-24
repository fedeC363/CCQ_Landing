import { useState } from 'react'
import { useLanguage } from '../i18n/useLanguage.js'
import { planSamples } from '../data/portfolio.js'
import { useVideoDescription } from '../lib/useVideoDescription.js'
import Poster from './Poster.jsx'
import VideoModal from './VideoModal.jsx'
import { PlayIcon } from './Icons.jsx'

// Comparador LIGHT / OMNI: responde "cual de los dos planes elijo".
//
// Son dos reproductores lado a lado y no un unico reproductor con
// interruptor: las dos muestras son videos distintos (otra escena, otra
// duracion), asi que mantener el momento de reproduccion al cambiar no
// mostraria la misma escena en dos calidades.
//
// Al llegar a la seccion solo se ven los posters; cada muestra se descarga
// recien cuando el visitante la toca. La etiqueta del plan se ve en la tarjeta
// y dentro del reproductor.
export default function PlanComparator() {
  const { t } = useLanguage()
  const describe = useVideoDescription()
  const [active, setActive] = useState(null)

  return (
    <div className="comparator">
      <ul className="comparator__list">
        {planSamples.map((sample) => {
          const label = t(`pricing.plans.${sample.plan}.short`)
          const caption = t(`pricing.plans.${sample.plan}.features`)[0]
          const description = describe(sample)
          return (
            <li key={sample.id} className={`comparator__item comparator__item--${sample.plan}`}>
              <p className="comparator__label">
                <span className="comparator__name">{label}</span>
                <span className="comparator__caption">{caption}</span>
              </p>
              <button
                type="button"
                className="video video--card comparator__video"
                onClick={() => setActive({ ...sample, label, description })}
                aria-label={`${t('a11y.playVideo')}: ${description}`}
              >
                <Poster poster={sample.poster} alt={description} />
                <span className="comparator__badge" aria-hidden="true">
                  {label}
                </span>
                <span className="video__play-icon portfolio-card__play" aria-hidden="true">
                  <PlayIcon className="icon icon--lg" />
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <VideoModal video={active} onClose={() => setActive(null)} />
    </div>
  )
}
