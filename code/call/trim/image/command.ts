export function buildCommandToTrimImage(input: {
  inputPath: string
  outputPath: string
  geometry: string
}): { bin: 'convert'; args: string[] } {
  return {
    bin: 'convert',
    args: [input.inputPath, '-crop', input.geometry, input.outputPath],
  }
}
