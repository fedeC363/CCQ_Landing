import { useEffect, useRef } from 'react'
import { useLanguage } from '../i18n/useLanguage.js'
import { CloseIcon } from './Icons.jsx'

// Reproductor completo en una ventana sobre la pagina (<dialog>).
// - Controles nativos: reproducir/pausar, barra de progreso navegable y volumen.
// - Se cierra con Escape (comportamiento propio de <dialog>), con el boton
//   visible y tocando el fondo.
// - El video se monta recien al abrir: hasta que el visitante toca, no se
//   descarga nada.
// - label: etiqueta visible opcional (la usa el comparador: LIGHT / OMNI).
export default function VideoModal({ video, onClose }) {
  const { t } = useLanguage()
  const dialogRef = useRef(null)
  const isOpen = Boolean(video)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  // Tocar el fondo (fuera del contenido) tambien cierra.
  const handleClick = (event) => {
    if (event.target === dialogRef.current) dialogRef.current.close()
  }

  return (
    <dialog
      ref={dialogRef}
      className="video-modal"
      aria-label={video?.description}
      onClose={onClose}
      onClick={handleClick}
    >
      {video && (
        <div className="video-modal__content">
          <div className="video-modal__bar">
            {video.label ? <span className="video-modal__label">{video.label}</span> : <span />}
            <button type="button" className="video-modal__close" onClick={() => dialogRef.current?.close()}>
              <CloseIcon className="icon icon--lg" />
              <span className="visually-hidden">{t('a11y.closeVideo')}</span>
            </button>
          </div>
          <video
            className="video-modal__video"
            src={video.src}
            poster={video.poster.jpg}
            aria-label={video.description}
            controls
            autoPlay
            playsInline
            preload="auto"
          >
            {video.description}
          </video>
        </div>
      )}
    </dialog>
  )
}
