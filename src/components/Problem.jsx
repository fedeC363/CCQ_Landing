import { useLanguage } from '../i18n/useLanguage.js'

export default function Problem() {
  const { t } = useLanguage()

  return (
    <section className="section" aria-labelledby="problem-title">
      <div className="container">
        <header className="section-header">
          <h2 id="problem-title" className="section-title">
            {t('problem.title')}
          </h2>
          <p className="section-subtitle">{t('problem.subtitle')}</p>
        </header>

        <ul className="problem__cards">
          {t('problem.cards').map((card) => (
            <li key={card.title} className="problem__card">
              <h3 className="problem__card-title">{card.title}</h3>
              <p className="problem__card-text">{card.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
