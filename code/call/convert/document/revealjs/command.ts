export function buildCommandToConvertDocumentWithRevealjs(input: {
  inputPath: string
  outputPath: string
  theme?: string
  selfContained?: boolean
}): { bin: 'pandoc'; args: string[] } {
  const args = [
    input.inputPath,
    '-t',
    'revealjs',
    '-s',
    '-o',
    input.outputPath,
  ]
  if (input.theme) args.push('-V', `theme=${input.theme}`)
  if (input.selfContained) args.push('--embed-resources')
  return { bin: 'pandoc', args }
}
