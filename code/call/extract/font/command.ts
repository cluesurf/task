export type ExtractFontArgs = {
  input: string
  output: string
  /** When set, restricts the ttx dump to these tables. */
  tables?: string[]
}

export function buildCommandToExtractFont(
  args: ExtractFontArgs,
): { bin: 'ttx'; args: string[] } {
  const argv: string[] = []
  if (args.tables?.length) {
    for (const t of args.tables) argv.push('-t', t)
  }
  argv.push('-o', args.output, args.input)
  return { bin: 'ttx', args: argv }
}
