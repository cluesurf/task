export function buildCommandToConvertImageWithRawtherapee(input: {
  inputPath: string
  outputPath: string
  profile?: string
  jpegQuality?: number
  tiffCompression?: string
}): { bin: 'rawtherapee-cli'; args: string[] } {
  const args: string[] = ['-o', input.outputPath]
  if (input.profile) args.push('-p', input.profile)
  if (input.jpegQuality != null)
    args.push('-j', String(input.jpegQuality))
  if (input.tiffCompression) {
    const map: Record<string, string> = {
      none: 'n',
      lzw: 'l',
      zip: 'z',
    }
    const flag = map[input.tiffCompression]
    if (flag) args.push('-t', flag)
  }
  args.push('-c', input.inputPath)
  return { bin: 'rawtherapee-cli', args }
}
