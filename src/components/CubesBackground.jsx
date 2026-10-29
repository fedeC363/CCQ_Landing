import { useId, useLayoutEffect, useState } from 'react'
import { MOBILE_QUERY, useMediaQuery } from '../lib/useMediaQuery.js'

// Fondo decorativo de cubos isometricos (SVG plano). El efecto 3D sale solo de
// pintar cada cubo con tres tonos: cara con luz, de frente y en sombra. Los
// colores y el grosor de la separacion estan en tokens.css (--cube-*).
//
// - variant: "hero" | "offer" | "closing" (posicion y mascara en global.css)
// - scale: tamaño del cubo en escritorio (1 = 48 px de ancho)
// - scaleMobile: tamaño en mobile (si no se pasa, usa scale)
//
// Va como primer hijo de la seccion, afuera del contenedor del contenido.
// No recibe clics ni foco y los lectores de pantalla lo ignoran. No ponerle
// animaciones ni filtros: es un SVG grande y recalcularlo traba el scroll.
export default function CubesBackground({ variant, scale, scaleMobile = scale }) {
  // Ids unicos por instancia: hay tres fondos en la misma pagina y cada uno
  // tiene su propio patron (si compartieran id, usarian todos el mismo).
  const uid = useId().replace(/:/g, '')
  const shapeId = `cube-${uid}`
  const patternId = `cubes-${uid}`

  const isMobile = useMediaQuery(MOBILE_QUERY)
  const currentScale = isMobile ? scaleMobile : scale

  // Grosor de la separacion en px de pantalla, leido del token una vez. Se
  // divide por la escala para que siga siendo fino aunque los cubos crezcan.
  const [gap, setGap] = useState(null)
  useLayoutEffect(() => {
    const value = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--cube-gap-px'))
    if (!Number.isNaN(value)) setGap(value)
  }, [])

  return (
    <span aria-hidden="true" className={`cubes-bg cubes-bg--${variant}`}>
      <svg width="100%" height="100%" focusable="false">
        <defs>
          <g id={shapeId} className="cubes-bg__cube" strokeWidth={gap ? gap / currentScale : 0}>
            <polygon className="cubes-bg__top" points="24,0 48,14 24,28 0,14" />
            <polygon className="cubes-bg__left" points="0,14 24,28 24,56 0,42" />
            <polygon className="cubes-bg__right" points="48,14 24,28 24,56 48,42" />
          </g>
          <pattern
            id={patternId}
            width="48"
            height="84"
            patternUnits="userSpaceOnUse"
            patternTransform={`scale(${currentScale})`}
          >
            <rect className="cubes-bg__gap" width="48" height="84" />
            <use href={`#${shapeId}`} x="0" y="0" />
            <use href={`#${shapeId}`} x="24" y="42" />
            <use href={`#${shapeId}`} x="-24" y="42" />
            <use href={`#${shapeId}`} x="0" y="84" />
            <use href={`#${shapeId}`} x="24" y="-42" />
            <use href={`#${shapeId}`} x="-24" y="-42" />
          </pattern>
        </defs>
        <rect x="-50%" y="-50%" width="200%" height="200%" fill={`url(#${patternId})`} />
      </svg>
    </span>
  )
}
