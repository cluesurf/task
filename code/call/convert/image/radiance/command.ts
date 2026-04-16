export function buildCommandToConvertImageWithRadiance(input: {
  inputPath: string
  outputPath: string
  reverse?: boolean
}): { bin: 'ra_tiff'; args: string[] } {
  const args: string[] = []
  if (input.reverse) args.push('-r')
  args.push(input.inputPath, input.outputPath)
  return { bin: 'ra_tiff', args }
}
