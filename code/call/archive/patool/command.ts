import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'
import type { ArchiveWithPatool } from '~/code/form/action/archive/patool'

export function buildCommandToArchiveWithPatool(
  input: ArchiveWithPatool,
) {
  const cmd = getCommand('patool')

  if (input.verbose) cmd.link.push('--verbose')
  if (input.nonInteractive !== false) {
    cmd.link.push('--non-interactive')
  }

  cmd.link.push('create')
  cmd.link.push(input.output.file.path)
  cmd.link.push(input.input.path)

  return buildCommandSequence(cmd)
}
