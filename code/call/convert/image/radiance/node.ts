// HDR ↔ TIFF via Radiance's ra_tiff. For .hdr ↔ .exr, round-trip
// through TIFF (ra_tiff → OpenEXR's exrinput/exroutput) or use
// convert/image/pfstools which handles both natively.

import { exec } from '~/code/tool/node/process'

export type ConvertImageWithRadianceNodeInput = {
  input: { path: string }
  output: { path: string }
  /** Reverse direction (TIFF → HDR). Auto-detected from extensions. */
  reverse?: boolean
}

export async function convertImageWithRadianceNode(
  source: ConvertImageWithRadianceNodeInput,
): Promise<void> {
  const argv = ['ra_tiff']
  if (source.reverse) argv.push('-r')
  argv.push(source.input.path, source.output.path)
  await exec(argv)
}
