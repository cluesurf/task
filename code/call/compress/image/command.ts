export function buildCommandToCompressImage(input: {
  inputPath: string
  outputPath: string
  quality?: string
}): { bin: string; args: string[] } {
  const bin = 'convert'
  const args: string[] = [
    input.inputPath,
    '-quality',
    input.quality ?? '80',
    input.outputPath,
  ]
  return { bin, args }
}
