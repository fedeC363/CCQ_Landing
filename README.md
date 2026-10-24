# CCQ Studio · Landing

Landing page de CCQ Studio. Vite + React (JavaScript), CSS plano con variables, sin librerías de UI ni de internacionalización. Deploy en Vercel.

## Puesta en marcha

```bash
npm install
npm run dev       # servidor local en http://localhost:5173
npm run build     # build de producción en dist/
npm run preview   # sirve el build para probarlo
```

## Dónde se cambia cada cosa

| Qué | Archivo |
| --- | --- |
| Nombre de marca, teléfono, mail, eslogan, año, redes | `src/content/site.config.js` |
| Todos los textos en español | `src/content/es.json` |
| Todos los textos en inglés | `src/content/en.json` |
| Videos del hero y del portfolio | `src/data/portfolio.js` |
| Precios de los planes (los packs no se publican: se consultan por WhatsApp) | `src/data/pricing.js` |
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
- `src/i18n/useLanguage.js` expone `useLanguage()` → `{ lang, setLang, t, slogan }`. `t('hero.title')` devuelve el texto del idioma activo; `t('contact.whatsappButton')` reemplaza variables como `{phone}` con los datos de `site.config.js`.
- Título de la pestaña, meta description y Open Graph se actualizan al cambiar de idioma. El HTML inicial sale en español (lo arma `vite.config.js` desde `es.json`).

## Videos

Todos son verticales 9:16. Los datos están en `src/data/portfolio.js`; los nombres de archivo son internos y nunca se muestran en pantalla.

| Dónde | Cómo se comporta | Cuándo se descarga |
| --- | --- | --- |
| Hero | Bucle decorativo: sin audio, sin controles, sin barra. | Al abrir la página (es el único). |
| Portfolio, vista previa | Bucle sin audio. Se pausa al salir de pantalla. | Al entrar en pantalla (IntersectionObserver, `preload="none"`). |
| Portfolio, versión completa | Se abre al tocar, con audio y controles. | Recién al tocar el video. |
| Comparador LIGHT / OMNI (Precios) | Dos reproductores lado a lado, etiquetados; con audio y controles. | Recién al tocar cada muestra. |

- Los reproductores con controles se abren en una ventana (`VideoModal`): reproducir/pausar, barra de progreso navegable, volumen, y cierre con Escape, con el botón visible o tocando el fondo.
- Con `prefers-reduced-motion` ningún video arranca solo: se ve el poster con botón de reproducir.
- Posters: WebP con respaldo JPEG.
- Texto alternativo: `"Muestra de video {calidad}"` / `"Video sample {quality}"`, con la calidad del campo `quality` de cada video en `portfolio.js` (`LIGHT`, `OMNI` o `null`). Con `null` queda `"Muestra de video"`. La calidad no se muestra en pantalla en el portfolio.

### Procesar videos: `compress-videos.mjs`

Requiere [ffmpeg](https://ffmpeg.org/download.html) en el PATH (en Windows: `winget install ffmpeg`). Los originales no se suben al repo: se leen de una carpeta aparte.

```bash
npm run videos -- --src=../videos
```

- `--src=<carpeta>`: dónde están los originales (por defecto `videos-src/` del proyecto).
- `--force`: reprocesa todo (si no, solo lo nuevo o modificado).
- `--only=hero,portfolio-2`: procesa solo esos ids de `JOBS`.

Qué original va con qué video se define en la lista `JOBS`, al principio del script. Cada video genera estas versiones (todas MP4, H.264, `yuv420p`, `-movflags +faststart`):

| Versión | Resolución | Duración | Audio | CRF |
| --- | --- | --- | --- | --- |
| Hero | 1080x1920 | 10 s | sin pista | 26 |
| Vista previa del portfolio | 720x1280 | 15 s | sin pista | 30 |
| Versión completa del portfolio | 1080x1920 | real | AAC 128k | 26 |
| Muestras LIGHT y OMNI | 1080x1920 | real | AAC 128k | 26 |

Más un poster por video (primer cuadro) en `public/posters/<id>.webp` y `.jpg`.

Para sumar un video nuevo: agregarlo a `JOBS`, correr el script y agregar su entrada (con `quality`) en `portfolio.js`.

## Contacto

La página no tiene formulario. Los canales son WhatsApp (el principal: el único botón lima) y el mail, como alternativa discreta.

- El mail aparece solo en el cierre (sección 11, con botón de copiar) y en el pie. No va arriba ni en el medio de la página.
- Para que no lo junten los bots, en `site.config.js` está partido en usuario y dominio, y se arma recién en el navegador (`src/lib/email.js`), igual que el enlace `mailto:`.
- Los datos estructurados schema.org (`Organization`) llevan solo nombre, mail y teléfono, y también se insertan en el navegador (`src/lib/useOrganizationSchema.js`).

## Secciones

Orden aprobado, un componente por sección en `src/components/`:

01 `Header` · 02 `Hero` · 03 `Stats` · 04 `Problem` · 05 `Portfolio` · 06 `Offer` · 07 `Process` · 08 `Pricing` · 09 `Testimonials` (**creado pero no se renderiza**: espera reseñas reales) · 10 `Faq` · 11 `Contact` · 12 `Footer`, más `MobileWhatsAppBar` (botón fijo abajo en mobile), `HeroVideo`, `VideoModal`, `PlanComparator` y `Poster`.

## Deploy en Vercel

Importar el repositorio en Vercel. Detecta Vite solo (build `npm run build`, salida `dist`). No hace falta configurar variables de entorno.

## Pendientes (bloquean el lanzamiento, no el desarrollo)

- Eslogan definitivo (hoy se usa la opción 1 recomendada).
- Reseñas de clientes (mínimo tres) para publicar la sección 09.
- Si Mercado Pago cobra en pesos a cotización del día.
- Logo, favicon, imagen para Open Graph y dominio.
