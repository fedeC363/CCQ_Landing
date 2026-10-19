import { useLanguage } from '../i18n/useLanguage.js'
import { packs, plans } from '../data/pricing.js'
import { formatPrice } from '../lib/format.js'
import { externalLinkProps, useWhatsAppUrl } from '../lib/whatsapp.js'

export default function Pricing() {
  const { lang, t } = useLanguage()
  const whatsappUrl = useWhatsAppUrl()
  const currency = t('pricing.currency')

  return (
    <section id="precios" className="section" aria-labelledby="pricing-title">
      <div className="container">
        <header className="section-header">
          <h2 id="pricing-title" className="section-title">
            {t('pricing.title')}
          </h2>
          <p className="section-subtitle">{t('pricing.subtitle')}</p>
        </header>

        <div className="pricing__plans">
          {plans.map((plan) => {
            const copy = t(`pricing.plans.${plan.id}`)
            return (
              <article key={plan.id} className={`plan${plan.featured ? ' plan--featured' : ''}`}>
                <h3 className="plan__name">{copy.name}</h3>
                <p className="plan__price">
                  <span className="plan__currency">{currency}</span>
                  <span className="plan__amount">{formatPrice(plan.price, lang)}</span>
                  <span className="plan__unit">{t('pricing.perCreative')}</span>
                </p>
                <p className="plan__description">{copy.description}</p>
                <ul className="plan__features">
                  {copy.features.map((feature) => (
                    <li key={feature} className="plan__feature">
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  className={`btn btn--block plan__cta ${plan.featured ? 'btn--primary' : 'btn--secondary'}`}
                  href={whatsappUrl}
                  {...externalLinkProps}
                >
                  {copy.cta}
                </a>
              </article>
            )
          })}
        </div>

        <div className="packs">
          <h3 className="packs__title">{t('pricing.packs.title')}</h3>
          <p className="packs__subtitle">{t('pricing.packs.subtitle')}</p>

          <table className="packs__table">
            <thead>
              <tr>
                <th scope="col">
                  <span className="visually-hidden">{t('pricing.packs.title')}</span>
                </th>
                {plans.map((plan) => (
                  <th key={plan.id} scope="col">
                    {t(`pricing.plans.${plan.id}.short`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {packs.map((pack) => (
                <tr key={pack.count}>
                  <th scope="row">{t('pricing.packs.rowLabel', { count: pack.count })}</th>
                  {plans.map((plan) => (
                    <td key={plan.id}>
                      {currency} {formatPrice(pack[plan.id], lang)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pricing__notes">
            <p>{t('pricing.packs.more')}</p>
            <p>{t('pricing.duration')}</p>
            {/* [PENDIENTE] Confirmar si Mercado Pago cobra en pesos argentinos a
                cotizacion del dia. Si es asi, ajustar pricing.payment y la
                pregunta "Como se paga?" en los dos idiomas. */}
            <p>{t('pricing.payment')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
