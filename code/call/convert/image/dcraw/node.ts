// RAW (ARW/CR2/CR3/NEF/DNG/...) → TIFF or PPM.
// dcraw is the classic decoder. Output lands next to the input as
// `<basename>.tiff`; caller can rename/move.

import path from 'node:path'
import { promises as fs } from 'node:fs'
import { exec } from '~/code/tool/node/process'

export type ConvertImageWithDcrawNodeInput = {
  input: { path: string }
  output: { path: string; format?: 'tiff' | 'ppm' }
  /** Use camera white balance. Default true. */
  cameraWhiteBalance?: boolean
  /** Apply sRGB output gamma. Default true. */
  srgb?: boolean
}

export async function convertImageWithDcrawNode(
  source: ConvertImageWithDcrawNodeInput,
): Promise<void> {
  const fmt = source.output.format ?? 'tiff'
  const argv = ['dcraw']
  if (source.cameraWhiteBalance !== false) argv.push('-w')
  if (source.srgb !== false) argv.push('-o', '1')
  if (fmt === 'tiff') argv.push('-T')
  argv.push(source.input.path)
  await exec(argv)

  // dcraw writes <basename>.(tiff|ppm) next to the input. Move it
  // to the caller's requested output path.
  const dir = path.dirname(source.input.path)
  const base = path.basename(source.input.path, path.extname(source.input.path))
  const written = path.join(dir, `${base}.${fmt}`)
  if (written !== source.output.path) {
    await fs.rename(written, source.output.path)
  }
}
