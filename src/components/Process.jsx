import { useLanguage } from '../i18n/useLanguage.js'
import SectionMarker from './SectionMarker.jsx'

export default function Process() {
  const { t } = useLanguage()
  const steps = t('process.steps')

  return (
    <section className="section process" aria-labelledby="process-title">
      <div className="container">
        <SectionMarker number="07" />
        <div className="process__header">
          <h2 id="process-title" className="section-title">
            {t('process.title')}
          </h2>
          <p className="process__subtitle">{t('process.subtitle')}</p>
        </div>

        <ol className="steps">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1
            return (
              <li key={step.number} className={`steps__item${isLast ? ' steps__item--last' : ''}`}>
                <div className="steps__track" aria-hidden="true">
                  {isLast && <span className="steps__flag">{t('process.deadline')}</span>}
                </div>
                <span className="steps__number" aria-hidden="true">
                  {step.number}
                </span>
                <h3 className="steps__title">{step.title}</h3>
                <p className="steps__text">{step.text}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
