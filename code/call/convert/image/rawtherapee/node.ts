// RAW → JPEG / TIFF / PNG via rawtherapee-cli. Similar goals to
// darktable-cli; different engine and different default look.

import { exec } from '~/code/tool/node/process'

export type ConvertImageWithRawtherapeeNodeInput = {
  input: { path: string }
  output: { path: string }
  /** Path to a .pp3 profile. */
  profile?: string
  /** JPEG quality 1–100. */
  jpegQuality?: number
  /** TIFF compression: 'none' | 'lzw' | 'zip'. */
  tiffCompression?: 'none' | 'lzw' | 'zip'
}

export async function convertImageWithRawtherapeeNode(
  source: ConvertImageWithRawtherapeeNodeInput,
): Promise<void> {
  const argv = ['rawtherapee-cli', '-o', source.output.path]
  if (source.profile) argv.push('-p', source.profile)
  if (source.jpegQuality != null) argv.push('-j', String(source.jpegQuality))
  if (source.tiffCompression) {
    const map = { none: 'n', lzw: 'l', zip: 'z' } as const
    argv.push('-t', map[source.tiffCompression])
  }
  argv.push('-c', source.input.path)
  await exec(argv)
}
