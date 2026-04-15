// Raster → vector. potrace reads bitmaps (pbm/pgm/bmp) and emits
// SVG / EPS / PostScript. Use convert/image/autotrace if the input
// is a general raster (png/jpg/tiff).

import { exec } from '~/code/tool/node/process'

export type ConvertImageWithPotraceNodeInput = {
  input: { path: string }
  output: { path: string; format?: 'svg' | 'eps' | 'ps' }
  /** Black-level threshold for the input bitmap (0.0–1.0). */
  threshold?: number
  /** Speckle size filter. */
  turdsize?: number
}

export async function convertImageWithPotraceNode(
  source: ConvertImageWithPotraceNodeInput,
): Promise<void> {
  const fmt = source.output.format ?? 'svg'
  const argv = ['potrace', source.input.path, `--${fmt}`, '-o', source.output.path]
  if (source.threshold != null) argv.push('-t', String(source.threshold))
  if (source.turdsize != null) argv.push('-T', String(source.turdsize))
  await exec(argv)
}
