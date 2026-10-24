import { useLanguage } from '../i18n/useLanguage.js'

// Texto alternativo de un video: "Muestra de video {calidad}".
// Si el video no tiene calidad asignada (null), queda el texto corto
// "Muestra de video", sin agregar nada.
export function useVideoDescription() {
  const { t } = useLanguage()
  return (video) =>
    video.quality ? t('a11y.video.sampleWithQuality', { quality: video.quality }) : t('a11y.video.sample')
}
