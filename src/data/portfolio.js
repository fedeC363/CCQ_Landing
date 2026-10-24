// Videos de la landing. Todos son verticales 9:16.
//
// Los archivos salen de compress-videos.mjs (ver README). Los ids y nombres de
// archivo son neutros: nunca se muestran en pantalla.
//
// quality: 'LIGHT', 'OMNI' o null. Se usa SOLO para el texto alternativo
//   ("Muestra de video LIGHT"); en el portfolio no se muestra en pantalla.
//   Con null el texto queda corto ("Muestra de video"). No se deduce del
//   nombre del archivo: se asigna a mano aca.
// poster: WebP con respaldo JPEG.

const poster = (id) => ({ webp: `/posters/${id}.webp`, jpg: `/posters/${id}.jpg` })

// Bucle decorativo: sin audio, sin controles. Primeros 10 s de HERO.mp4.
export const heroVideo = {
  id: 'hero',
  quality: 'OMNI',
  src: '/videos/hero.mp4',
  poster: poster('hero'),
}

// Orden decidido: no cambiarlo.
// preview: vista previa en bucle, sin audio (se carga al entrar en pantalla).
// full: version completa con audio (se descarga recien al tocar el video).
export const portfolio = [
  { id: 'portfolio-1', quality: null }, // PIXARD: sin plan definido
  { id: 'portfolio-2', quality: 'LIGHT' }, // LIGHT_1
  { id: 'portfolio-3', quality: 'LIGHT' }, // LIGHT_2
  { id: 'portfolio-4', quality: 'OMNI' }, // OMNI
].map((video) => ({
  ...video,
  preview: `/videos/${video.id}-preview.mp4`,
  full: `/videos/${video.id}-full.mp4`,
  poster: poster(video.id),
}))

// Cuantos videos se muestran antes del boton "Ver mas trabajos". Si la lista
// tiene mas entradas que este numero, aparece el boton.
export const FEATURED_COUNT = 4

// Comparador de la seccion de precios: una muestra por plan, con audio.
// plan coincide con el id de pricing.js (de ahi sale la etiqueta visible).
export const planSamples = [
  { id: 'muestra-light', plan: 'light', quality: 'LIGHT', src: '/videos/muestra-light.mp4', poster: poster('muestra-light') },
  { id: 'muestra-omni', plan: 'omni', quality: 'OMNI', src: '/videos/muestra-omni.mp4', poster: poster('muestra-omni') },
]
