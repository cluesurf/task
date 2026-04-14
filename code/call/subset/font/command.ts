import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'

export type SubsetFontArgs = {
  input: string
  output: string
  text?: string
  unicodes?: string
  layoutFeatures?: string
  flavor?: string
}

export function buildSubsetFontCommand(args: SubsetFontArgs) {
  const cmd = getCommand('pyftsubset')
  cmd.link.push(args.input, `--output-file=${args.output}`)
  if (args.text) cmd.link.push(`--text=${args.text}`)
  if (args.unicodes) cmd.link.push(`--unicodes=${args.unicodes}`)
  if (args.layoutFeatures) {
    cmd.link.push(`--layout-features=${args.layoutFeatures}`)
  }
  if (args.flavor) cmd.link.push(`--flavor=${args.flavor}`)
  return buildCommandSequence(cmd)
}
