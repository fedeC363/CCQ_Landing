const locales = { es: 'es-AR', en: 'en-US' }

// 6 -> "6", 12.5 -> "12,50" (ES) / "12.50" (EN)
export function formatPrice(amount, lang) {
  const hasCents = !Number.isInteger(amount)
  return new Intl.NumberFormat(locales[lang] ?? 'en-US', {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(amount)
}
