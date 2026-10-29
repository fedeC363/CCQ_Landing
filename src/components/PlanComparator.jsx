import { useState } from 'react'
import { useLanguage } from '../i18n/useLanguage.js'
import { planSamples } from '../data/portfolio.js'
import { useVideoDescription } from '../lib/useVideoDescription.js'
import Poster from './Poster.jsx'
import VideoModal from './VideoModal.jsx'
import { PlayIcon } from './Icons.jsx'

// Muestras de los planes: un ejemplo de LIGHT y uno de OMNI.
//
// NO es un comparador (el nombre del componente quedo de antes): las dos
// muestras son proyectos distintos (otro guion, otro producto, otra
// duracion), asi que no se presentan como la misma escena en dos calidades.
// Por eso el titulo habla de "un ejemplo de cada plan" y abajo se aclara que
// cada muestra es un proyecto distinto. Ningun texto visible puede sugerir
// comparacion.
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
      <h3 className="comparator__title">{t('pricing.samples.title')}</h3>
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
      <p className="comparator__note">{t('pricing.samples.note')}</p>

      <VideoModal video={active} onClose={() => setActive(null)} />
    </div>
  )
}
