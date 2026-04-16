export function buildCommandToRemovePassword(input: {
  inputPath: string
  outputPath: string
  password?: string
}): { bin: 'qpdf'; args: string[] } {
  const args: string[] = ['--decrypt']
  if (input.password) args.push(`--password=${input.password}`)
  args.push(input.inputPath, input.outputPath)
  return { bin: 'qpdf', args }
}
