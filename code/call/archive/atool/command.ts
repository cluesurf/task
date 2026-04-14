import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'
import type { ArchiveWithAtool } from '~/code/form/action/archive/atool'

export function buildCommandToArchiveWithAtool(input: ArchiveWithAtool) {
  const cmd = getCommand('atool')

  cmd.link.push('--add')
  if (input.force) cmd.link.push('--force')
  if (input.quiet !== false) cmd.link.push('--quiet')
  if (input.verbose) cmd.link.push('--verbose')

  cmd.link.push(input.output.file.path)
  cmd.link.push(input.input.path)

  return buildCommandSequence(cmd)
}
