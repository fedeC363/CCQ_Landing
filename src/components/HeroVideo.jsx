import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/useLanguage.js'
import { useReducedMotion } from '../lib/useReducedMotion.js'
import { useVideoDescription } from '../lib/useVideoDescription.js'
import Poster from './Poster.jsx'
import { PlayIcon } from './Icons.jsx'

// Video del hero: bucle decorativo. Sin audio, sin controles, sin barra.
// Es el unico video que se descarga al abrir la pagina. Con "reducir
// movimiento" no arranca solo: se ve el poster con un boton de reproducir.
export default function HeroVideo({ video }) {
  const { t } = useLanguage()
  const describe = useVideoDescription()
  const reducedMotion = useReducedMotion()
  const videoRef = useRef(null)
  const [requested, setRequested] = useState(false)
  const [playing, setPlaying] = useState(false)

  const description = describe(video)
  const hasSource = Boolean(video.src)
  const shouldPlay = hasSource && (!reducedMotion || requested)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    if (shouldPlay) el.play().catch(() => {})
    else el.pause()
  }, [shouldPlay])

  return (
    <div className="video video--hero">
      {hasSource && (
        <video
          ref={videoRef}
          className="video__element"
          src={video.src}
          aria-hidden="true"
          muted
          loop
          playsInline
          autoPlay={shouldPlay}
          preload={shouldPlay ? 'auto' : 'none'}
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      )}

      <Poster poster={video.poster} alt={description} className={playing ? 'poster--hidden' : ''} />

      {hasSource && !shouldPlay && (
        <button
          type="button"
          className="video__play"
          onClick={() => setRequested(true)}
          aria-label={`${t('a11y.playVideo')}: ${description}`}
        >
          <span className="video__play-icon">
            <PlayIcon className="icon icon--lg" />
          </span>
        </button>
      )}
    </div>
  )
}
