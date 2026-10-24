import { useEffect } from 'react'
import { site } from '../content/site.config.js'
import { buildEmail } from './email.js'

// Datos estructurados schema.org (Organization) solo con lo que existe:
// nombre, mail y telefono. Sin direccion, CUIT, horarios ni redes: todavia no
// hay. Se insertan en ejecucion, igual que el mail, para que la direccion no
// quede escrita en el HTML (Google lee los datos insertados con JavaScript).
export function useOrganizationSchema() {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: site.name,
      email: buildEmail(),
      telephone: `+${site.whatsapp.number}`,
    })
    document.head.appendChild(script)
    return () => script.remove()
  }, [])
}
