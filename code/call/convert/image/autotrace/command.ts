export function buildCommandToConvertImageWithAutotrace(input: {
  inputPath: string
  outputPath: string
  outputFormat?: string
  colors?: number
  despeckleLevel?: number
}): { bin: 'autotrace'; args: string[] } {
  const fmt = input.outputFormat ?? 'svg'
  const args: string[] = [
    '-output-file',
    input.outputPath,
    '-output-format',
    fmt,
  ]
  if (input.colors != null)
    args.push('-color-count', String(input.colors))
  if (input.despeckleLevel != null)
    args.push('-despeckle-level', String(input.despeckleLevel))
  args.push(input.inputPath)
  return { bin: 'autotrace', args }
}
