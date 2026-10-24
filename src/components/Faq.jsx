import { useState } from 'react'
import { useLanguage } from '../i18n/useLanguage.js'
import SectionMarker from './SectionMarker.jsx'
import { MinusIcon, PlusIcon } from './Icons.jsx'

export default function Faq() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => setOpenIndex((current) => (current === index ? null : index))

  return (
    <section className="section section--divided" aria-labelledby="faq-title">
      <div className="container faq">
        <div className="faq__intro">
          <SectionMarker number="10" />
          <h2 id="faq-title" className="section-title faq__title">
            {t('faq.title')}
          </h2>
        </div>

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
                    {isOpen ? (
                      <MinusIcon className="icon icon--lg faq__icon" />
                    ) : (
                      <PlusIcon className="icon icon--lg faq__icon" />
                    )}
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} className="faq__answer" hidden={!isOpen}>
                  <p>{item.a}</p>
                  {/* Subapartado opcional dentro de la respuesta (item.sub). */}
                  {item.sub && (
                    <div className="faq__sub">
                      <h4 className="faq__sub-title">{item.sub.q}</h4>
                      <p>{item.sub.a}</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
