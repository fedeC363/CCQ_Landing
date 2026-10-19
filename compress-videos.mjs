#!/usr/bin/env node
// Comprime los videos originales a formato web y genera el poster de cada uno.
//
//   videos-src/*.mp4        -> public/videos/<nombre>.mp4   (con audio, AAC 128k)
//   videos-src/loop/*.mp4   -> public/videos/<nombre>.mp4   (sin audio, para loops como el hero)
//   cada video              -> public/posters/<nombre>.jpg  (primer frame)
//
// Salida: 1080x1920 (9:16), H.264, CRF 28, yuv420p, faststart (empieza a
// reproducir antes de terminar de descargar).
//
// Uso:
//   npm run videos                    procesa solo lo nuevo o modificado
//   npm run videos -- --force         reprocesa todo
//   npm run videos -- --poster-at=1.5 toma el poster en el segundo 1.5
//
// Requiere ffmpeg instalado y en el PATH.

import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { basename, dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = dirname(fileURLToPath(import.meta.url))
const SRC_DIR = join(ROOT, 'videos-src')
const LOOP_DIR = join(SRC_DIR, 'loop')
const OUT_VIDEOS = join(ROOT, 'public', 'videos')
const OUT_POSTERS = join(ROOT, 'public', 'posters')
const VIDEO_EXTENSIONS = new Set(['.mp4', '.mov', '.m4v', '.webm', '.mkv', '.avi'])

const args = process.argv.slice(2)
const force = args.includes('--force')
const posterArg = args.find((arg) => arg.startsWith('--poster-at='))
const posterAt = posterArg ? posterArg.split('=')[1] : '0'

function fail(message) {
  console.error(`\n✖ ${message}\n`)
  process.exit(1)
}

if (spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' }).status !== 0) {
  fail('No se encontro ffmpeg. Instalalo (https://ffmpeg.org/download.html, o "winget install ffmpeg" en Windows) y volve a correr el script.')
}

if (!existsSync(SRC_DIR)) {
  mkdirSync(LOOP_DIR, { recursive: true })
  fail('Cree la carpeta videos-src/. Pone ahi los videos originales (y en videos-src/loop/ los que van sin audio) y volve a correr el script.')
}

mkdirSync(OUT_VIDEOS, { recursive: true })
mkdirSync(OUT_POSTERS, { recursive: true })

const listVideos = (dir) =>
  existsSync(dir)
    ? readdirSync(dir)
        .filter((file) => VIDEO_EXTENSIONS.has(extname(file).toLowerCase()))
        .map((file) => join(dir, file))
    : []

const jobs = [
  ...listVideos(SRC_DIR).map((input) => ({ input, loop: false })),
  ...listVideos(LOOP_DIR).map((input) => ({ input, loop: true })),
]

if (jobs.length === 0) fail('No hay videos en videos-src/ ni en videos-src/loop/.')

const isUpToDate = (input, output) => existsSync(output) && statSync(output).mtimeMs >= statSync(input).mtimeMs

function run(ffmpegArgs) {
  const result = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...ffmpegArgs], { stdio: 'inherit' })
  return result.status === 0
}

const SCALE_9_16 =
  'scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,setsar=1'

const done = []
let failures = 0

for (const { input, loop } of jobs) {
  const name = basename(input, extname(input))
  const videoOut = join(OUT_VIDEOS, `${name}.mp4`)
  const posterOut = join(OUT_POSTERS, `${name}.jpg`)

  if (!force && isUpToDate(input, videoOut) && isUpToDate(input, posterOut)) {
    console.log(`• ${name}: sin cambios, se saltea`)
    done.push({ name, loop })
    continue
  }

  console.log(`▶ ${name}${loop ? ' (loop, sin audio)' : ''}`)

  const audioArgs = loop ? ['-an'] : ['-c:a', 'aac', '-b:a', '128k', '-ac', '2']
  const videoOk = run([
    '-i', input,
    '-vf', SCALE_9_16,
    '-c:v', 'libx264',
    '-preset', 'slow',
    '-crf', '28',
    '-profile:v', 'high',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    ...audioArgs,
    videoOut,
  ])

  if (!videoOk) {
    console.error(`  ✖ fallo la compresion de ${name}`)
    failures++
    continue
  }

  const posterOk = run(['-ss', posterAt, '-i', videoOut, '-frames:v', '1', '-q:v', '3', posterOut])
  if (!posterOk) {
    console.error(`  ✖ fallo el poster de ${name}`)
    failures++
    continue
  }

  const sizeMb = (statSync(videoOut).size / 1024 / 1024).toFixed(1)
  console.log(`  ✔ public/videos/${name}.mp4 (${sizeMb} MB) + public/posters/${name}.jpg`)
  done.push({ name, loop })
}

console.log('\nPara usarlos, en src/data/portfolio.js:')
for (const { name } of done) {
  console.log(`  src: '/videos/${name}.mp4', poster: '/posters/${name}.jpg'`)
}

if (failures > 0) fail(`${failures} video(s) con errores.`)
