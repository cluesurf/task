export function buildCommandToConvertImageWithDcraw(input: {
  inputPath: string
  outputFormat?: string
  cameraWhiteBalance?: boolean
  srgb?: boolean
}): { bin: 'dcraw'; args: string[] } {
  const fmt = input.outputFormat ?? 'tiff'
  const args: string[] = []
  if (input.cameraWhiteBalance !== false) args.push('-w')
  if (input.srgb !== false) args.push('-o', '1')
  if (fmt === 'tiff') args.push('-T')
  args.push(input.inputPath)
  return { bin: 'dcraw', args }
}
