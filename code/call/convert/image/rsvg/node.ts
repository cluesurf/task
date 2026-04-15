// Vector → raster. rsvg-convert is the fast, scriptable SVG
// renderer from librsvg. Prefer over inkscape for batch jobs.

import { exec } from '~/code/tool/node/process'

export type ConvertImageWithRsvgNodeInput = {
  input: { path: string }
  output: {
    path: string
    format?: 'png' | 'pdf' | 'ps' | 'eps' | 'svg'
  }
  /** Output width in pixels. Preserves aspect ratio if only one set. */
  width?: number
  height?: number
  /** DPI for raster output. Default 96. */
  dpi?: number
  /** Background color (`#fff`, `none`, ...). Defaults to transparent. */
  background?: string
}

export async function convertImageWithRsvgNode(
  source: ConvertImageWithRsvgNodeInput,
): Promise<void> {
  const fmt = source.output.format ?? 'png'
  const argv = ['rsvg-convert', '-f', fmt, '-o', source.output.path]
  if (source.width != null) argv.push('-w', String(source.width))
  if (source.height != null) argv.push('-h', String(source.height))
  if (source.dpi != null) argv.push('-d', String(source.dpi))
  if (source.background) argv.push('-b', source.background)
  argv.push(source.input.path)
  await exec(argv)
}
