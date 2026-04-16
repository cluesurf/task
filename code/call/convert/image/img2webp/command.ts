export function buildCommandToConvertImageWithImg2webp(input: {
  inputPaths: string[]
  outputPath: string
  quality?: number
  lossless?: boolean
  delay?: number
  loop?: number
}): { bin: 'img2webp'; args: string[] } {
  const args: string[] = []
  if (input.lossless) args.push('-lossless')
  else args.push('-lossy', '-q', String(input.quality ?? 80))
  if (input.delay != null) args.push('-d', String(input.delay))
  if (input.loop != null) args.push('-loop', String(input.loop))
  args.push(...input.inputPaths, '-o', input.outputPath)
  return { bin: 'img2webp', args }
}
