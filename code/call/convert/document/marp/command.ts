export function buildCommandToConvertDocumentWithMarp(input: {
  inputPath: string
  outputPath: string
  format?: 'html' | 'pdf' | 'pptx' | 'png' | 'jpeg'
  theme?: string
  allowLocalFiles?: boolean
}): { bin: 'marp'; args: string[] } {
  const args = [input.inputPath, '-o', input.outputPath]
  if (input.format) args.push(`--${input.format}`)
  if (input.theme) args.push('--theme', input.theme)
  if (input.allowLocalFiles) args.push('--allow-local-files')
  return { bin: 'marp', args }
}
