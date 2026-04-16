export function buildCommandToRemoveTransparency(input: {
  inputPath: string
  outputPath: string
  background?: string
}): { bin: 'convert'; args: string[] } {
  const bg = input.background ?? 'white'
  return {
    bin: 'convert',
    args: [
      input.inputPath,
      '-background',
      bg,
      '-alpha',
      'remove',
      '-alpha',
      'off',
      input.outputPath,
    ],
  }
}
