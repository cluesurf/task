export function buildCommandToConvertImageWithGifsicle(input: {
  inputPath: string
  outputPath: string
  optimize?: 1 | 2 | 3
  lossy?: number
  resize?: string
  colors?: number
}): { bin: 'gifsicle'; args: string[] } {
  const args: string[] = []
  args.push(`-O${input.optimize ?? 3}`)
  if (input.lossy != null) args.push(`--lossy=${input.lossy}`)
  if (input.resize) args.push('--resize', input.resize)
  if (input.colors != null) args.push('--colors', String(input.colors))
  args.push(input.inputPath, '-o', input.outputPath)
  return { bin: 'gifsicle', args }
}
