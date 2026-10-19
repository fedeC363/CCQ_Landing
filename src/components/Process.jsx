import { useLanguage } from '../i18n/useLanguage.js'

export default function Process() {
  const { t } = useLanguage()

  return (
    <section className="section section--alt" aria-labelledby="process-title">
      <div className="container">
        <header className="section-header">
          <h2 id="process-title" className="section-title">
            {t('process.title')}
          </h2>
          <p className="section-subtitle">{t('process.subtitle')}</p>
        </header>

        <ol className="steps">
          {t('process.steps').map((step) => (
            <li key={step.number} className="steps__item">
              <span className="steps__number" aria-hidden="true">
                {step.number}
              </span>
              <div>
                <h3 className="steps__title">{step.title}</h3>
                <p className="steps__text">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
