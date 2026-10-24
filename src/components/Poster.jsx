import { useState } from 'react'

// Poster de un video: WebP con respaldo JPEG. Se muestra hasta que el video
// arranca y queda como reemplazo si el video no carga.
//
// Si la imagen no carga, el navegador dibujaria el texto alternativo encima de
// la tarjeta, y ese texto incluye la calidad (LIGHT / OMNI), que en el
// portfolio no se muestra. Por eso la imagen rota se oculta a la vista; el
// texto sigue disponible para lectores de pantalla en el boton de la tarjeta.
export default function Poster({ poster, alt, className = '' }) {
  const [failed, setFailed] = useState(false)

  return (
    <picture className={`poster ${className}${failed ? ' poster--failed' : ''}`}>
      {poster.webp && <source srcSet={poster.webp} type="image/webp" />}
      <img className="poster__img" src={poster.jpg} alt={alt} decoding="async" onError={() => setFailed(true)} />
    </picture>
  )
}
