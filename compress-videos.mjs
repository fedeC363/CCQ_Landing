#!/usr/bin/env node
// Genera las versiones web de los videos y sus posters a partir de los
// originales. Los originales no se versionan: se leen de una carpeta aparte.
//
// Uso:
//   npm run videos -- --src=../videos          procesa lo nuevo o modificado
//   npm run videos -- --src=../videos --force  reprocesa todo
//   npm run videos -- --src=../videos --only=hero,portfolio-2   solo esos ids
//   (sin --src se usa la carpeta videos-src/ del proyecto)
//
// Requiere ffmpeg en el PATH.
//
// Para agregar o cambiar un video, editar JOBS mas abajo: cada entrada dice
// que archivo original usar, con que id publicarlo y que versiones generar.
// Los ids son neutros a proposito: los nombres de archivo terminan en las URLs
// y no tienen que delatar nombres internos.

import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = dirname(fileURLToPath(import.meta.url))
const OUT_VIDEOS = join(ROOT, 'public', 'videos')
const OUT_POSTERS = join(ROOT, 'public', 'posters')

// Versiones (perfiles). Todas: MP4, H.264, yuv420p y +faststart (el video
// empieza a reproducirse antes de terminar de bajar). Solo MP4 por ahora.
const PROFILES = {
  // Pensados para mobile, que es la mayoria del trafico. CRF fija la calidad;
  // maxrate/bufsize ponen un techo de bitrate para que las escenas con mucho
  // movimiento no generen picos de peso.
  //
  // Bucle decorativo del hero: sin pista de audio, nunca. 720x1280 porque se
  // ve chico, detras de un marco: a ese tamaño 1080 no se distingue y es el
  // archivo que mas pesa en la apertura de la pagina. 10 s (minimo del rango).
  hero: { suffix: '', width: 720, height: 1280, crf: 30, maxrate: '1200k', bufsize: '2400k', duration: 10, audio: false },
  // Vista previa del portfolio: en bucle, sin audio, liviana.
  preview: { suffix: '-preview', width: 720, height: 1280, crf: 32, maxrate: '650k', bufsize: '1300k', duration: 15, audio: false },
  // Version completa del portfolio: se abre al tocar, con audio.
  full: { suffix: '-full', width: 1080, height: 1920, crf: 30, maxrate: '1800k', bufsize: '3600k', duration: null, audio: true },
  // Muestras LIGHT / OMNI de la seccion de precios: con audio. Son el
  // argumento de venta: si se ven peor, subirles la calidad aunque pesen mas.
  sample: { suffix: '', width: 1080, height: 1920, crf: 30, maxrate: '2500k', bufsize: '5000k', duration: null, audio: true },
}

// Posters: WebP con respaldo JPEG, a la resolucion en la que se muestran.
const POSTER_WIDTH = { hero: 720, preview: 720, full: 720, sample: 720 }

const JOBS = [
  { id: 'hero', file: 'HERO.mp4', profiles: ['hero'] },
  { id: 'portfolio-1', file: 'PIXARD.mp4', profiles: ['preview', 'full'] },
  { id: 'portfolio-2', file: 'LIGHT_1.mp4', profiles: ['preview', 'full'] },
  { id: 'portfolio-3', file: 'LIGHT_2.mp4', profiles: ['preview', 'full'] },
  { id: 'portfolio-4', file: 'OMNI.mp4', profiles: ['preview', 'full'] },
  { id: 'muestra-light', file: 'LIGHT_MUESTRA.mp4', profiles: ['sample'] },
  { id: 'muestra-omni', file: 'MUESTRA_OMNI.mp4', profiles: ['sample'] },
]

const args = process.argv.slice(2)
const force = args.includes('--force')
const srcArg = args.find((arg) => arg.startsWith('--src='))
const onlyArg = args.find((arg) => arg.startsWith('--only='))
const only = onlyArg ? new Set(onlyArg.slice('--only='.length).split(',')) : null
const SRC_DIR = srcArg ? resolve(ROOT, srcArg.slice('--src='.length)) : join(ROOT, 'videos-src')

function fail(message) {
  console.error(`\n✖ ${message}\n`)
  process.exit(1)
}

if (spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' }).status !== 0) {
  fail('No se encontro ffmpeg. Instalalo ("winget install ffmpeg" en Windows) y volve a correr el script.')
}
if (!existsSync(SRC_DIR)) fail(`No existe la carpeta de originales: ${SRC_DIR}`)

mkdirSync(OUT_VIDEOS, { recursive: true })
mkdirSync(OUT_POSTERS, { recursive: true })

const isUpToDate = (input, output) => existsSync(output) && statSync(output).mtimeMs >= statSync(input).mtimeMs

function ffmpeg(ffmpegArgs) {
  const result = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...ffmpegArgs], { stdio: 'inherit' })
  return result.status === 0
}

const scale = (w, h) =>
  `scale=${w}:${h}:force_original_aspect_ratio=decrease,pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2,setsar=1`

const mb = (file) => (statSync(file).size / 1024 / 1024).toFixed(2)
const kb = (file) => Math.round(statSync(file).size / 1024)

let failures = 0
let skipped = 0

for (const job of JOBS) {
  if (only && !only.has(job.id)) continue
  const input = join(SRC_DIR, job.file)
  if (!existsSync(input)) {
    console.warn(`! ${job.id}: no esta ${job.file} en ${SRC_DIR}, se saltea`)
    skipped++
    continue
  }

  for (const name of job.profiles) {
    const p = PROFILES[name]
    const output = join(OUT_VIDEOS, `${job.id}${p.suffix}.mp4`)
    if (!force && isUpToDate(input, output)) {
      console.log(`• ${job.id}${p.suffix}.mp4: sin cambios`)
      continue
    }
    const ok = ffmpeg([
      '-i', input,
      ...(p.duration ? ['-t', String(p.duration)] : []),
      '-vf', scale(p.width, p.height),
      '-c:v', 'libx264', '-preset', 'slow', '-crf', String(p.crf),
      '-maxrate', p.maxrate, '-bufsize', p.bufsize,
      '-profile:v', 'high', '-pix_fmt', 'yuv420p',
      ...(p.audio ? ['-c:a', 'aac', '-b:a', '128k', '-ac', '2'] : ['-an']),
      '-movflags', '+faststart',
      output,
    ])
    if (ok) console.log(`✔ ${job.id}${p.suffix}.mp4  ${mb(output)} MB`)
    else {
      console.error(`✖ fallo ${job.id}${p.suffix}.mp4`)
      failures++
    }
  }

  // Un poster por video, tomado del primer cuadro (coincide con el inicio).
  const posterWidth = Math.max(...job.profiles.map((name) => POSTER_WIDTH[name]))
  const posterHeight = Math.round((posterWidth * 16) / 9)
  const webp = join(OUT_POSTERS, `${job.id}.webp`)
  const jpg = join(OUT_POSTERS, `${job.id}.jpg`)
  if (force || !isUpToDate(input, webp) || !isUpToDate(input, jpg)) {
    const vf = scale(posterWidth, posterHeight)
    const okWebp = ffmpeg(['-i', input, '-frames:v', '1', '-vf', vf, '-c:v', 'libwebp', '-quality', '72', webp])
    const okJpg = ffmpeg(['-i', input, '-frames:v', '1', '-vf', vf, '-q:v', '5', jpg])
    if (okWebp && okJpg) console.log(`✔ posters ${job.id}  webp ${kb(webp)} KB / jpg ${kb(jpg)} KB`)
    else {
      console.error(`✖ fallo el poster de ${job.id}`)
      failures++
    }
  }
}

if (skipped) console.warn(`\n${skipped} video(s) sin original; revisar los avisos de arriba.`)
if (failures) fail(`${failures} archivo(s) con errores.`)
