import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/useLanguage.js'
import { useReducedMotion } from '../lib/useReducedMotion.js'

// Video vertical 9:16 con poster.
//
// - autoPlay: solo el hero. Arranca muted y en loop, salvo que el usuario
//   tenga prefers-reduced-motion: ahi se muestra el poster con boton de play.
// - lazy: el src recien se asigna cuando el video se acerca a la pantalla
//   (IntersectionObserver). Con preload="none" no se descarga nada hasta que
//   se reproduce.
export default function VideoPlayer({ video, autoPlay = false, lazy = true }) {
  const { lang, t } = useLanguage()
  const reducedMotion = useReducedMotion()
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const [nearViewport, setNearViewport] = useState(!lazy)
  const [started, setStarted] = useState(false)

  const description = video.description[lang]
  const hasSource = Boolean(video.src)
  const loops = autoPlay
  const shouldAutoPlay = autoPlay && hasSource && !reducedMotion

  useEffect(() => {
    if (nearViewport) return
    if (!('IntersectionObserver' in window)) {
      setNearViewport(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNearViewport(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' },
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [nearViewport])

  // Si el usuario activa "reducir movimiento" con la pagina abierta, se frena.
  useEffect(() => {
    const el = videoRef.current
    if (!el || !autoPlay || !hasSource) return
    if (shouldAutoPlay) el.play().catch(() => {})
    else if (!started) el.pause()
  }, [autoPlay, hasSource, shouldAutoPlay, started])

  const handlePlay = () => {
    setStarted(true)
    videoRef.current?.play().catch(() => {})
  }

  const showPlayButton = hasSource && !shouldAutoPlay && !started

  return (
    <div className="video" ref={containerRef}>
      <video
        ref={videoRef}
        className="video__element"
        src={hasSource && nearViewport ? video.src : undefined}
        poster={video.poster}
        aria-label={description}
        preload="none"
        playsInline
        muted={loops}
        loop={loops}
        autoPlay={shouldAutoPlay}
        controls={started && !loops}
      >
        {description}
      </video>

      {showPlayButton && (
        <button
          type="button"
          className="video__play"
          onClick={handlePlay}
          aria-label={`${t('a11y.playVideo')}: ${description}`}
        >
          <span className="video__play-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  )
}
