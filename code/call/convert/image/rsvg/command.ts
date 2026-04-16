export function buildCommandToConvertImageWithRsvg(input: {
  inputPath: string
  outputPath: string
  outputFormat?: string
  width?: number
  height?: number
  dpi?: number
  background?: string
}): { bin: 'rsvg-convert'; args: string[] } {
  const fmt = input.outputFormat ?? 'png'
  const args: string[] = ['-f', fmt, '-o', input.outputPath]
  if (input.width != null) args.push('-w', String(input.width))
  if (input.height != null) args.push('-h', String(input.height))
  if (input.dpi != null) args.push('-d', String(input.dpi))
  if (input.background) args.push('-b', input.background)
  args.push(input.inputPath)
  return { bin: 'rsvg-convert', args }
}
