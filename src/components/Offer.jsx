import { useLanguage } from '../i18n/useLanguage.js'
import SectionMarker from './SectionMarker.jsx'
import { offerIcons } from './Icons.jsx'

const pad = (n) => String(n).padStart(2, '0')

// El item 3 ("Edicion profesional completa") va destacado: es el que separa a
// CCQ de una herramienta automatica, y de ahi sale la cita de la izquierda.
const HIGHLIGHTED_INDEX = 2

export default function Offer() {
  const { t } = useLanguage()

  return (
    <section className="section offer" aria-labelledby="offer-title">
      <div className="container offer__inner">
        <div className="offer__intro">
          <SectionMarker number="06" />
          <h2 id="offer-title" className="section-title offer__title">
            {t('offer.title')}
          </h2>
          <blockquote className="offer__quote">
            <span className="offer__quote-mark" aria-hidden="true">
              “
            </span>
            {t('offer.quote')}
            <span className="offer__quote-mark" aria-hidden="true">
              ”
            </span>
          </blockquote>
        </div>

        <ol className="offer__list">
          {t('offer.items').map((item, index) => {
            const Icon = offerIcons[index]
            return (
              <li key={item.title} className="offer__item">
                <span className={`offer__icon${index === HIGHLIGHTED_INDEX ? ' offer__icon--highlight' : ''}`}>
                  {Icon && <Icon className="icon icon--xl" />}
                </span>
                <div className="offer__body">
                  <h3 className="offer__item-title">{item.title}</h3>
                  <p className="offer__item-text">{item.text}</p>
                </div>
                <span className="offer__number" aria-hidden="true">
                  {pad(index + 1)}
                </span>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
