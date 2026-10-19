# CCQ Studio · Landing

Landing page de CCQ Studio. Vite + React (JavaScript), CSS plano con variables, sin librerías de UI ni de internacionalización. Deploy en Vercel.

## Puesta en marcha

```bash
npm install
npm run dev       # servidor local en http://localhost:5173
npm run build     # build de producción en dist/
npm run preview   # sirve el build para probarlo
```

Para el formulario, copiar `.env.example` como `.env` y completar `VITE_FORM_ENDPOINT` con el endpoint de Formspree. Sin esa variable la página funciona igual: el formulario muestra el mensaje de error del copy y deriva a WhatsApp.

## Dónde se cambia cada cosa

| Qué | Archivo |
| --- | --- |
| Nombre de marca, teléfono, eslogan, año, redes | `src/content/site.config.js` |
| Todos los textos en español | `src/content/es.json` |
| Todos los textos en inglés | `src/content/en.json` |
| Videos del hero y del portfolio | `src/data/portfolio.js` |
| Precios de planes y packs | `src/data/pricing.js` |
| Colores, tipografías, tamaños, espaciados, radios, sombras | `src/styles/tokens.css` |
| Estilos de cada sección (solo usan variables) | `src/styles/sections.css` |

Reglas del proyecto:

1. Ningún texto visible se escribe dentro de un componente: todo sale de `es.json` / `en.json`.
2. Ningún color, tamaño o espaciado se escribe a mano: todo sale de `tokens.css`. Cuando llegue el diseño definitivo, se reemplazan los tokens.
3. Nombre, teléfono y eslogan salen de `site.config.js`. En los JSON se usan como `{name}`, `{shortName}`, `{phone}` y `{year}`.
4. No se inventa contenido. Lo que falta está marcado con `[PENDIENTE]` en el código (buscar ese texto).

## Idiomas

- Al entrar, si el navegador está en español se carga ES; en cualquier otro caso, EN.
- El selector ES | EN de la barra superior gana siempre y se guarda en `localStorage` (`ccq-lang`).
- `src/i18n/useLanguage.js` expone `useLanguage()` → `{ lang, setLang, t, slogan }`. `t('hero.title')` devuelve el texto del idioma activo; `t('pricing.packs.rowLabel', { count: 5 })` reemplaza variables.
- Título de la pestaña, meta description y Open Graph se actualizan al cambiar de idioma. El HTML inicial sale en español (lo arma `vite.config.js` desde `es.json`).

## Videos

Todos los creativos son verticales 9:16 de hasta 1 minuto.

- El video del hero es el único que arranca solo (muted, loop, playsInline, autoplay, con su poster como primer frame).
- Los del portfolio usan `preload="none"` y reciben su `src` recién cuando se acercan a la pantalla (IntersectionObserver). Muestran el poster y un botón de play.
- Con `prefers-reduced-motion` activado, ningún video arranca solo: se ve el poster con botón de play.

### Comprimir videos: `compress-videos.mjs`

Requiere [ffmpeg](https://ffmpeg.org/download.html) en el PATH (en Windows: `winget install ffmpeg`).

1. Poner los originales en `videos-src/` (los que van con audio) y en `videos-src/loop/` (los que van sin audio, como el del hero). Esa carpeta no se sube al repo.
2. Correr:

   ```bash
   npm run videos
   ```

   Opciones: `npm run videos -- --force` reprocesa todo; `npm run videos -- --poster-at=1.5` toma el poster en el segundo 1,5 en lugar del primer frame.
3. El script deja `public/videos/<nombre>.mp4` (1080x1920, H.264, CRF 28, faststart) y `public/posters/<nombre>.jpg`, e imprime las líneas para pegar en `src/data/portfolio.js`.
4. En `portfolio.js`, completar `src`, `poster` y la `description` en los dos idiomas (es el texto alternativo para lectores de pantalla y para cuando el video no carga).

Hoy `portfolio.js` tiene ocho entradas de prueba con posters grises (`public/posters/test-*.svg`) y sin video. Cuando lleguen los creativos reales, reemplazarlas y borrar esos SVG.

## Secciones

Orden aprobado, un componente por sección en `src/components/`:

01 `Header` · 02 `Hero` · 03 `Stats` · 04 `Problem` · 05 `Portfolio` · 06 `Offer` · 07 `Process` · 08 `Pricing` · 09 `Testimonials` (**creado pero no se renderiza**: espera reseñas reales) · 10 `Faq` · 11 `Contact` · 12 `Footer`, más `MobileWhatsAppBar` (botón fijo abajo en mobile) y `VideoPlayer`.

## Deploy en Vercel

1. Importar el repositorio en Vercel. Detecta Vite solo (build `npm run build`, salida `dist`).
2. Cargar `VITE_FORM_ENDPOINT` en Project Settings → Environment Variables.

## Pendientes (bloquean el lanzamiento, no el desarrollo)

- Eslogan definitivo (hoy se usa la opción 1 recomendada).
- Reseñas de clientes (mínimo tres) para publicar la sección 09.
- Los 6 u 8 creativos destacados del portfolio y el video del hero.
- Aprobación de la escala de precios de packs (`src/data/pricing.js`).
- Si Mercado Pago cobra en pesos a cotización del día.
- Logo, favicon, imagen para Open Graph y dominio.
