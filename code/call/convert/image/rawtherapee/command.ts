export function buildCommandToConvertImageWithRawtherapee(input: {
  inputPath: string
  outputPath: string
  profile?: string
  jpegQuality?: number
  tiffCompression?: 'none' | 'lzw' | 'zip'
}): { bin: 'rawtherapee-cli'; args: string[] } {
  const args: string[] = ['-o', input.outputPath]
  if (input.profile) args.push('-p', input.profile)
  if (input.jpegQuality != null)
    args.push('-j', String(input.jpegQuality))
  if (input.tiffCompression) {
    const map = { none: 'n', lzw: 'l', zip: 'z' } as const
    args.push('-t', map[input.tiffCompression])
  }
  args.push('-c', input.inputPath)
  return { bin: 'rawtherapee-cli', args }
}
