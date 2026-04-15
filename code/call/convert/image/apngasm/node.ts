// Assemble an APNG from a series of PNG frames or a single GIF.
// For gif → apng, caller should extract frames first (ffmpeg or
// imagemagick) and pass the frame directory.

import { exec } from '~/code/tool/node/process'

export type ConvertImageWithApngasmNodeInput = {
  /** Directory containing frames (or a glob of PNGs), OR a single
   * source GIF. apngasm picks frames in lexical order. */
  input: { path: string }
  output: { path: string }
  /** Frame delay in 1/100s. Default 10 (= 10 fps). */
  delay?: number
  /** Skip frames that are pixel-identical. */
  skipDuplicates?: boolean
}

export async function convertImageWithApngasmNode(
  source: ConvertImageWithApngasmNodeInput,
): Promise<void> {
  const argv = ['apngasm', source.output.path, source.input.path]
  if (source.delay != null) argv.push(String(source.delay), '100')
  if (source.skipDuplicates) argv.push('-kp')
  await exec(argv)
}
