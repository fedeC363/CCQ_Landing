import { useState } from 'react'
import { useLanguage } from '../i18n/useLanguage.js'

export default function Faq() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => setOpenIndex((current) => (current === index ? null : index))

  return (
    <section className="section" aria-labelledby="faq-title">
      <div className="container">
        <header className="section-header">
          <h2 id="faq-title" className="section-title">
            {t('faq.title')}
          </h2>
        </header>

        <div className="faq__list">
          {t('faq.items').map((item, index) => {
            const isOpen = openIndex === index
            const buttonId = `faq-button-${index}`
            const panelId = `faq-panel-${index}`
            return (
              <div key={item.q} className="faq__item">
                <h3 className="faq__question">
                  <button
                    id={buttonId}
                    type="button"
                    className="faq__button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                  >
                    <span>{item.q}</span>
                    <span className="faq__icon" aria-hidden="true" />
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} className="faq__answer" hidden={!isOpen}>
                  <p>{item.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
