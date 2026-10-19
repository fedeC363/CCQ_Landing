// Reemplaza {clave} por su valor. Las claves sin valor quedan tal cual para
// que el error sea visible en pantalla en lugar de desaparecer.
export function interpolate(text, vars = {}) {
  if (typeof text !== 'string') return text
  return text.replace(/\{(\w+)\}/g, (match, key) => (vars[key] ?? match).toString())
}
