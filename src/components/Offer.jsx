import { useLanguage } from '../i18n/useLanguage.js'

export default function Offer() {
  const { t } = useLanguage()

  return (
    <section className="section" aria-labelledby="offer-title">
      <div className="container">
        <header className="section-header">
          <h2 id="offer-title" className="section-title">
            {t('offer.title')}
          </h2>
        </header>

        <ol className="offer__list">
          {t('offer.items').map((item) => (
            <li key={item.title} className="offer__item">
              <h3 className="offer__title">{item.title}</h3>
              <p className="offer__text">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
