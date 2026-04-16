export function buildCommandToConvertImageWithApngasm(input: {
  inputPath: string
  outputPath: string
  delay?: number
  skipDuplicates?: boolean
}): { bin: 'apngasm'; args: string[] } {
  const args: string[] = [input.outputPath, input.inputPath]
  if (input.delay != null) args.push(String(input.delay), '100')
  if (input.skipDuplicates) args.push('-kp')
  return { bin: 'apngasm', args }
}
