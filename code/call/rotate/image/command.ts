export function buildCommandToRotateImage(input: {
  inputPath: string
  outputPath: string
  degree: string
}): { bin: string; args: string[] } {
  const bin = 'convert'
  const args: string[] = [
    input.inputPath,
    '-rotate',
    input.degree,
    input.outputPath,
  ]
  return { bin, args }
}
