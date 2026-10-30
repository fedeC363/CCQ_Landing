import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { site, templateVars } from './src/content/site.config.js'
import { interpolate } from './src/lib/interpolate.js'

// El HTML inicial se sirve en español (idioma por defecto para buscadores y
// para quien comparte el link). Al cargar, React actualiza estos valores
// segun el idioma activo.
const es = JSON.parse(readFileSync(new URL('./src/content/es.json', import.meta.url), 'utf8'))

const escapeHtml = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function htmlMeta() {
  return {
    name: 'ccq-html-meta',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        // Con dominio, direcciones completas (WhatsApp y otros servicios las
        // necesitan para mostrar la imagen). Sin dominio, ruta relativa y sin og:url.
        const base = site.siteUrl ? site.siteUrl.replace(/\/+$/, '') : ''
        const ogUrlTag = base ? `<meta property="og:url" content="${escapeHtml(`${base}/`)}" />` : ''
        return html
          .replace(/\{\{META:(\w+)\}\}/g, (_, key) => escapeHtml(interpolate(es.meta[key], templateVars)))
          .replace(/\{\{SITE:(\w+)\}\}/g, (_, key) => escapeHtml(site[key]))
          .replace('{{OG_IMAGE}}', escapeHtml(`${base}/og-image.png`))
          .replace('{{OG_URL_TAG}}', ogUrlTag)
      },
    },
  }
}

export default defineConfig({
  plugins: [react(), htmlMeta()],
})
