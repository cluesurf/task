import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'

export function buildCompressFontCommand({
  input,
}: {
  input: string
}) {
  const cmd = getCommand('woff2_compress')
  cmd.link.push(input)
  return buildCommandSequence(cmd)
}
