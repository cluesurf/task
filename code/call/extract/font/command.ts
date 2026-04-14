import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'

export type ExtractFontArgs = {
  input: string
  output: string
  /** When set, restricts the ttx dump to these tables. */
  tables?: string[]
}

export function buildExtractFontCommand(args: ExtractFontArgs) {
  const cmd = getCommand('ttx')
  if (args.tables?.length) {
    for (const t of args.tables) cmd.link.push('-t', t)
  }
  cmd.link.push('-o', args.output, args.input)
  return buildCommandSequence(cmd)
}
