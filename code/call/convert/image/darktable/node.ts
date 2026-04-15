// RAW → JPEG / TIFF / PNG via darktable-cli. Slower than dcraw but
// applies the full darktable pipeline (denoise, lens correction,
// color). Use this when output quality matters.

import { exec } from '~/code/tool/node/process'

export type ConvertImageWithDarktableNodeInput = {
  input: { path: string }
  output: { path: string }
  /** Optional XMP sidecar with develop parameters. */
  xmp?: string
  /** High-quality resampling (slower). */
  highQuality?: boolean
  /** Upscale output beyond the input's pixel dimensions. */
  upscale?: boolean
}

export async function convertImageWithDarktableNode(
  source: ConvertImageWithDarktableNodeInput,
): Promise<void> {
  const argv = ['darktable-cli', source.input.path]
  if (source.xmp) argv.push(source.xmp)
  argv.push(source.output.path)
  if (source.highQuality) argv.push('--hq', '1')
  if (source.upscale) argv.push('--upscale', '1')
  await exec(argv)
}
