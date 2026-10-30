import { site } from '../content/site.config.js'

// Logo de la marca. El texto alternativo es el nombre de site.config.js.
// width/height explicitos: el navegador reserva el espacio y nada salta al
// cargar. El alto visible lo define el CSS (className); el ancho se ajusta solo.
// El SVG no tiene fondo: no ponerle uno ni un rectangulo atras.
export default function Logo({ className, loading = 'lazy' }) {
  return (
    <img
      className={className}
      src={site.logo.src}
      width={site.logo.width}
      height={site.logo.height}
      alt={site.name}
      loading={loading}
      decoding="async"
    />
  )
}
