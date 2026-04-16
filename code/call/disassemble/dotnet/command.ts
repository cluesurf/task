export function buildCommandToDisassembleDotnet(input: {
  inputPath: string
  outputPath: string
  bytes?: boolean
  header?: boolean
  tokens?: boolean
  noBar?: boolean
}): { bin: 'ildasm'; args: string[] } {
  const args: string[] = [input.inputPath, `-out=${input.outputPath}`]
  if (input.bytes) args.push('-bytes')
  if (input.header) args.push('-header')
  if (input.tokens) args.push('-tokens')
  if (input.noBar !== false) args.push('-nobar')
  return { bin: 'ildasm', args }
}
