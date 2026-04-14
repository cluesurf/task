import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'

export type DumpFontArgs = {
  input: string
  output: string
  tables?: string[]
}

export function buildDumpFontCommand(args: DumpFontArgs) {
  const cmd = getCommand('ttx')
  if (args.tables?.length) {
    for (const t of args.tables) cmd.link.push('-t', t)
  }
  cmd.link.push('-o', args.output, args.input)
  return buildCommandSequence(cmd)
}
