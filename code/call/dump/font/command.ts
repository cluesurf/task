export type DumpFontArgs = {
  input: string
  output: string
  tables?: string[]
}

export function buildDumpFontCommand(args: DumpFontArgs): { bin: string; args: string[] } {
  const bin = 'ttx'
  const a: string[] = []
  if (args.tables?.length) {
    for (const t of args.tables) a.push('-t', t)
  }
  a.push('-o', args.output, args.input)
  return { bin, args: a }
}
