import { useLanguage } from '../i18n/useLanguage.js'
import SectionMarker from './SectionMarker.jsx'

const pad = (n) => String(n).padStart(2, '0')

export default function Problem() {
  const { t } = useLanguage()

  return (
    <section className="section" aria-labelledby="problem-title">
      <div className="container">
        <header className="reveal">
          <SectionMarker number="04" />
          <h2 id="problem-title" className="section-title problem__title">
            {t('problem.title')}
          </h2>
          <p className="section-subtitle">{t('problem.subtitle')}</p>
        </header>

        <ol className="problem__cards reveal">
          {t('problem.cards').map((card, index) => (
            <li key={card.title} className="problem__card">
              <span className="problem__number" aria-hidden="true">
                {pad(index + 1)}
              </span>
              <h3 className="problem__card-title">{card.title}</h3>
              <p className="problem__card-text">{card.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
