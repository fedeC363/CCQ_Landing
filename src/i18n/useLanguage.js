import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import es from '../content/es.json'
import en from '../content/en.json'
import { site, templateVars } from '../content/site.config.js'
import { interpolate } from '../lib/interpolate.js'

const dictionaries = { es, en }
export const LANGUAGES = Object.keys(dictionaries)
const STORAGE_KEY = 'ccq-lang'

function readStoredLanguage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return LANGUAGES.includes(stored) ? stored : null
  } catch {
    return null
  }
}

// Si el navegador esta en español, ES. En cualquier otro caso, EN.
function detectLanguage() {
  const browser = typeof navigator !== 'undefined' ? navigator.language || '' : ''
  return browser.toLowerCase().startsWith('es') ? 'es' : 'en'
}

function lookup(dictionary, path) {
  return path.split('.').reduce((node, key) => (node == null ? undefined : node[key]), dictionary)
}

function setMeta(selector, value) {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute('content', value)
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  // La eleccion manual (guardada) siempre gana sobre la deteccion.
  const [lang, setLangState] = useState(() => readStoredLanguage() ?? detectLanguage())

  const setLang = useCallback((next) => {
    if (!LANGUAGES.includes(next)) return
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Sin localStorage (modo privado): la eleccion vale solo para esta visita.
    }
  }, [])

  const value = useMemo(() => {
    const dictionary = dictionaries[lang]
    const t = (path, vars) => {
      const entry = lookup(dictionary, path)
      if (entry === undefined) {
        if (import.meta.env.DEV) console.warn(`[i18n] Falta el texto "${path}" en ${lang}.json`)
        return path
      }
      return interpolate(entry, { ...templateVars, ...vars })
    }
    return { lang, setLang, t, slogan: site.slogan[lang] }
  }, [lang, setLang])

  useEffect(() => {
    const { t } = value
    document.documentElement.lang = lang
    document.title = t('meta.title')
    setMeta('meta[name="description"]', t('meta.description'))
    setMeta('meta[property="og:title"]', t('meta.ogTitle'))
    setMeta('meta[property="og:description"]', t('meta.ogDescription'))
    setMeta('meta[property="og:locale"]', t('meta.ogLocale'))
  }, [lang, value])

  return createElement(LanguageContext.Provider, { value }, children)
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage() tiene que usarse dentro de <LanguageProvider>')
  return context
}
