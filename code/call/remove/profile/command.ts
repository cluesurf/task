import type { RemoveProfileNodeInput } from './shared'

export function buildCommandToRemoveProfile(
  input: RemoveProfileNodeInput,
  outputPath: string,
): { bin: 'convert'; args: string[] } {
  // `convert <in> +profile "*" <out>` — "*" matches every embedded
  // profile (ICC, IPTC, XMP). This only nukes profile chunks, not
  // general EXIF; use `task remove metadata` for that.
  return {
    bin: 'convert',
    args: [input.input, '+profile', '*', outputPath],
  }
}
