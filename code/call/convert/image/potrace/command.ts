export function buildCommandToConvertImageWithPotrace(input: {
  inputPath: string
  outputPath: string
  outputFormat?: string
  threshold?: number
  turdsize?: number
}): { bin: 'potrace'; args: string[] } {
  const fmt = input.outputFormat ?? 'svg'
  const args: string[] = [
    input.inputPath,
    `--${fmt}`,
    '-o',
    input.outputPath,
  ]
  if (input.threshold != null) args.push('-t', String(input.threshold))
  if (input.turdsize != null) args.push('-T', String(input.turdsize))
  return { bin: 'potrace', args }
}
