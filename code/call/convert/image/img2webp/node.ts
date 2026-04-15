// Animated WebP from a series of images (or a single GIF).
// img2webp ships with libwebp. Tight control over per-frame
// quality + delay + codec.

import { exec } from '~/code/tool/node/process'

export type ConvertImageWithImg2webpNodeInput = {
  input: { path: string | string[] }
  output: { path: string }
  /** Quality 0–100. Ignored when lossless. */
  quality?: number
  /** Use lossless codec. */
  lossless?: boolean
  /** Frame delay (ms). */
  delay?: number
  /** Loop count (0 = infinite). */
  loop?: number
}

export async function convertImageWithImg2webpNode(
  source: ConvertImageWithImg2webpNodeInput,
): Promise<void> {
  const argv = ['img2webp']
  if (source.lossless) argv.push('-lossless')
  else argv.push('-lossy', '-q', String(source.quality ?? 80))
  if (source.delay != null) argv.push('-d', String(source.delay))
  if (source.loop != null) argv.push('-loop', String(source.loop))
  const paths = Array.isArray(source.input.path)
    ? source.input.path
    : [source.input.path]
  argv.push(...paths, '-o', source.output.path)
  await exec(argv)
}
