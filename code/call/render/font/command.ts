import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'

export type RenderFontArgs = {
  input: string
  output: string
  text: string
  fontSize?: number
  features?: string
}

export function buildRenderFontCommand(args: RenderFontArgs) {
  const cmd = getCommand('hb-view')
  if (args.fontSize) cmd.link.push(`--font-size=${args.fontSize}`)
  if (args.features) cmd.link.push(`--features=${args.features}`)
  cmd.link.push(`--output-file=${args.output}`, args.input, args.text)
  return buildCommandSequence(cmd)
}
