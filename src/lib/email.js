import { useEffect, useState } from 'react'
import { site } from '../content/site.config.js'

// Arma la direccion uniendo usuario y dominio. Nunca se escribe completa en el
// HTML ni en el JSX.
export function buildEmail() {
  return [site.email.user, site.email.domain].join('@')
}

// Devuelve { address, href } recien despues de montar el componente: en el
// primer render (y en el HTML que se sirve) no hay direccion ni mailto.
export function useEmail() {
  const [address, setAddress] = useState(null)

  useEffect(() => {
    setAddress(buildEmail())
  }, [])

  return { address, href: address ? `mailto:${address}` : undefined }
}
