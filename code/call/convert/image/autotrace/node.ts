// Raster → vector for general-purpose inputs (png/jpg/tiff/bmp).
// Slower and less precise than potrace for pure line art, but
// handles color rasters that potrace can't.

import { exec } from '~/code/tool/node/process'

export type ConvertImageWithAutotraceNodeInput = {
  input: { path: string }
  output: { path: string; format?: 'svg' | 'eps' | 'dxf' | 'pdf' }
  /** Number of colors to reduce to before tracing. */
  colors?: number
  /** Despeckle level. */
  despeckleLevel?: number
}

export async function convertImageWithAutotraceNode(
  source: ConvertImageWithAutotraceNodeInput,
): Promise<void> {
  const fmt = source.output.format ?? 'svg'
  const argv = [
    'autotrace',
    '-output-file',
    source.output.path,
    '-output-format',
    fmt,
  ]
  if (source.colors != null) argv.push('-color-count', String(source.colors))
  if (source.despeckleLevel != null) {
    argv.push('-despeckle-level', String(source.despeckleLevel))
  }
  argv.push(source.input.path)
  await exec(argv)
}
