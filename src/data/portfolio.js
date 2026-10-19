// Videos de la landing. Todos son verticales 9:16, de hasta 1 minuto.
//
// Cada entrada:
//   id           identificador unico
//   src          video comprimido en /public/videos (null = todavia no hay video)
//   poster       imagen que se muestra antes de reproducir, en /public/posters
//   description  texto alternativo para lectores de pantalla y para cuando el
//                video no carga. Describe lo que se ve, en los dos idiomas.
//
// Para generar src y poster a partir de los originales, ver compress-videos.mjs
// y el README.
//
// [PENDIENTE] Los creativos reales todavia no fueron entregados. Todo lo que
// sigue son archivos de prueba (posters grises, sin video) para que el sistema
// de carga diferida quede listo. Reemplazar por los 6 u 8 destacados.

export const heroVideo = {
  id: 'hero',
  src: null, // ej: '/videos/hero.mp4' (comprimido con la carpeta loop/, sin audio)
  poster: '/posters/test-hero.svg',
  description: {
    es: 'Video de prueba del hero',
    en: 'Hero test video',
  },
}

// Cuantos videos se muestran antes del boton "Ver mas trabajos". Si la lista
// tiene mas entradas que este numero, aparece el boton.
export const FEATURED_COUNT = 8

const testVideo = (n) => ({
  id: `test-${n}`,
  src: null, // ej: `/videos/creativo-${n}.mp4`
  poster: `/posters/test-${n}.svg`,
  description: {
    es: `Video de prueba ${n}`,
    en: `Test video ${n}`,
  },
})

export const portfolio = ['01', '02', '03', '04', '05', '06', '07', '08'].map(testVideo)
