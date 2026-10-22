import { useLanguage } from '../i18n/useLanguage.js'

export default function Stats() {
  const { t } = useLanguage()

  return (
    <section className="stats">
      <div className="container">
        <ul className="stats__list">
          {t('stats.items').map((item) => (
            <li key={item.label} className="stats__item">
              <span className="stats__value">{item.value}</span>
              <span className="mono-label">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
