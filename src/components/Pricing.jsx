import { useLanguage } from '../i18n/useLanguage.js'
import { packs, plans } from '../data/pricing.js'
import { formatPrice } from '../lib/format.js'
import { externalLinkProps, useWhatsAppUrl } from '../lib/whatsapp.js'
import SectionMarker from './SectionMarker.jsx'
import { ArrowIcon, CardIcon, CheckIcon, ClockIcon } from './Icons.jsx'

export default function Pricing() {
  const { lang, t } = useLanguage()
  const whatsappUrl = useWhatsAppUrl()
  const currency = t('pricing.currency')

  return (
    <section id="precios" className="section" aria-labelledby="pricing-title">
      <div className="container">
        <SectionMarker number="08" />
        <h2 id="pricing-title" className="section-title">
          {t('pricing.title')}
        </h2>
        <p className="section-subtitle">{t('pricing.subtitle')}</p>

        <div className="pricing__plans">
          {plans.map((plan) => {
            const copy = t(`pricing.plans.${plan.id}`)
            return (
              <article key={plan.id} className={`plan${plan.featured ? ' plan--featured' : ''}`}>
                {/* Se muestra el nombre corto (LIGHT / OMNI); el nombre
                    completo ("Plan LIGHT") queda para lectores de pantalla. */}
                <h3 className="plan__name">
                  <span aria-hidden="true">{copy.short}</span>
                  <span className="visually-hidden">{copy.name}</span>
                </h3>
                <p className="plan__price">
                  <span className="plan__amount">
                    {currency} {formatPrice(plan.price, lang)}
                  </span>
                  <span className="plan__unit">{t('pricing.perCreative')}</span>
                </p>
                <p className="plan__description">{copy.description}</p>
                <ul className="plan__features">
                  {copy.features.map((feature) => (
                    <li key={feature} className="plan__feature">
                      <CheckIcon className="icon icon--sm plan__check" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  className={`btn btn--block plan__cta ${plan.featured ? 'btn--dark' : 'btn--ghost'}`}
                  href={whatsappUrl}
                  {...externalLinkProps}
                >
                  {copy.cta}
                  {plan.featured && <ArrowIcon />}
                </a>
              </article>
            )
          })}
        </div>

        <div className="packs">
          <div className="packs__header">
            <h3 className="packs__title">{t('pricing.packs.title')}</h3>
            <p className="packs__subtitle">{t('pricing.packs.subtitle')}</p>
          </div>

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

          <a className="packs__more" href={whatsappUrl} {...externalLinkProps}>
            <span>{t('pricing.packs.more')}</span>
            <ArrowIcon className="icon icon--lg" />
          </a>
        </div>

        <div className="pricing__notes">
          <p className="pricing__note">
            <ClockIcon />
            {t('pricing.duration')}
          </p>
          {/* [PENDIENTE] Confirmar si Mercado Pago cobra en pesos argentinos a
              cotizacion del dia. Si es asi, ajustar pricing.payment y la
              pregunta "Como se paga?" en los dos idiomas. */}
          <p className="pricing__note">
            <CardIcon />
            {t('pricing.payment')}
          </p>
        </div>
      </div>
    </section>
  )
}
