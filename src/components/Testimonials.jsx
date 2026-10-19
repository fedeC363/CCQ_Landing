import { useLanguage } from '../i18n/useLanguage.js'

// 09 Testimonios - NO SE RENDERIZA TODAVIA.
//
// Espera reseñas reales: nombre, marca y texto de cada una, minimo tres. Una
// seccion vacia o con textos inventados destruye la confianza que construyen
// el portfolio y la transparencia de precios, por eso no esta en App.jsx.
//
// Para publicarla:
//   1. Cargar en es.json y en.json, en testimonials.items, objetos con la forma
//      { "name": "...", "brand": "...", "text": "..." }
//   2. Importar este componente en App.jsx, entre <Pricing /> y <Faq />.
//   3. Agregar los estilos .testimonials__* en sections.css.
export default function Testimonials() {
  const { t } = useLanguage()
  const items = t('testimonials.items')

  if (!Array.isArray(items) || items.length === 0) return null

  return (
    <section className="section" aria-labelledby="testimonials-title">
      <div className="container">
        <header className="section-header">
          <h2 id="testimonials-title" className="section-title">
            {t('testimonials.title')}
          </h2>
        </header>

        <ul className="testimonials__list">
          {items.map((item) => (
            <li key={`${item.name}-${item.brand}`} className="testimonials__item">
              <figure>
                <blockquote className="testimonials__text">{item.text}</blockquote>
                <figcaption className="testimonials__author">
                  {item.name}, {item.brand}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
