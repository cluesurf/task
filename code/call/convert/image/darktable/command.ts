export function buildCommandToConvertImageWithDarktable(input: {
  inputPath: string
  outputPath: string
  xmp?: string
  highQuality?: boolean
  upscale?: boolean
}): { bin: 'darktable-cli'; args: string[] } {
  const args: string[] = [input.inputPath]
  if (input.xmp) args.push(input.xmp)
  args.push(input.outputPath)
  if (input.highQuality) args.push('--hq', '1')
  if (input.upscale) args.push('--upscale', '1')
  return { bin: 'darktable-cli', args }
}
