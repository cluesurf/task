import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'

export type ShapeFontArgs = {
  input: string
  text: string
  features?: string
  script?: string
  language?: string
  direction?: string
}

export function buildShapeFontCommand(args: ShapeFontArgs) {
  const cmd = getCommand('hb-shape')
  if (args.features) cmd.link.push(`--features=${args.features}`)
  if (args.script) cmd.link.push(`--script=${args.script}`)
  if (args.language) cmd.link.push(`--language=${args.language}`)
  if (args.direction) cmd.link.push(`--direction=${args.direction}`)
  cmd.link.push(args.input, args.text)
  return buildCommandSequence(cmd)
}
