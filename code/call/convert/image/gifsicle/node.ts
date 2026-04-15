// Animated GIF optimizer + converter. gif → gif (resize, quantize,
// optimize) is the core use case; for gif → other formats prefer
// convert/image/ffmpeg or convert/image/img2webp.

import { exec } from '~/code/tool/node/process'

export type ConvertImageWithGifsicleNodeInput = {
  input: { path: string }
  output: { path: string }
  /** Optimization level 1–3; higher is slower + smaller. */
  optimize?: 1 | 2 | 3
  /** Lossy quantization level (0 = lossless, 200 = most lossy). */
  lossy?: number
  /** Resize output — `400x300` or `_x300` (preserve aspect ratio). */
  resize?: string
  /** Reduce palette to N colors (max 256). */
  colors?: number
}

export async function convertImageWithGifsicleNode(
  source: ConvertImageWithGifsicleNodeInput,
): Promise<void> {
  const argv = ['gifsicle']
  argv.push(`-O${source.optimize ?? 3}`)
  if (source.lossy != null) argv.push(`--lossy=${source.lossy}`)
  if (source.resize) argv.push('--resize', source.resize)
  if (source.colors != null) argv.push('--colors', String(source.colors))
  argv.push(source.input.path, '-o', source.output.path)
  await exec(argv)
}
