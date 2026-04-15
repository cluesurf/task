// ffmpeg as a convert/image backend for *animated* formats:
// gif ↔ apng ↔ webp ↔ mp4. For non-animated stills use
// convert/image/imagemagick. For plain video conversion use
// convert/video/ffmpeg.

import path from 'node:path'
import { exec } from '~/code/tool/node/process'

export type ConvertImageWithFfmpegNodeInput = {
  input: { path: string; format?: string }
  output: { path: string; format?: string }
  /** Target framerate. */
  fps?: number
  /** Quality 1–100 (interpreted per output format). */
  quality?: number
  /** Loop count (0 = infinite) for gif/apng/webp. */
  loop?: number
}

export async function convertImageWithFfmpegNode(
  source: ConvertImageWithFfmpegNodeInput,
): Promise<void> {
  const outFmt =
    source.output.format ?? path.extname(source.output.path).slice(1).toLowerCase()
  const argv = ['ffmpeg', '-y', '-i', source.input.path]
  if (source.fps) argv.push('-r', String(source.fps))

  switch (outFmt) {
    case 'gif':
      // Use palettegen + paletteuse filter for decent gifs.
      argv.push(
        '-vf',
        'split[a][b];[a]palettegen[p];[b][p]paletteuse',
      )
      if (source.loop != null) argv.push('-loop', String(source.loop))
      break
    case 'webp':
      argv.push('-loop', String(source.loop ?? 0))
      if (source.quality != null) argv.push('-q:v', String(source.quality))
      break
    case 'apng':
      argv.push(
        '-f',
        'apng',
        '-plays',
        String(source.loop ?? 0),
      )
      break
    case 'mp4':
      argv.push('-pix_fmt', 'yuv420p', '-movflags', '+faststart')
      if (source.quality != null) {
        // Map 1–100 → CRF 51–0 (higher quality = lower CRF).
        const crf = Math.max(0, Math.min(51, Math.round(51 - source.quality * 0.51)))
        argv.push('-crf', String(crf))
      }
      break
    case 'webm':
      argv.push('-pix_fmt', 'yuv420p')
      if (source.quality != null) argv.push('-crf', String(63 - Math.round(source.quality * 0.63)))
      break
  }
  argv.push(source.output.path)
  await exec(argv)
}
