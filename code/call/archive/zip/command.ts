import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'
import type { ArchiveWithZip } from '~/code/form/action/archive/zip'

export function buildCommandToArchiveWithZip(input: ArchiveWithZip) {
  const cmd = getCommand('zip')

  if (input.recursive !== false) cmd.link.push('-r')
  if (input.junkPaths) cmd.link.push('-j')
  if (typeof input.level === 'number') cmd.link.push(`-${input.level}`)
  if (input.password) cmd.link.push('-P', input.password)
  if (input.encryption === 'aes-128') cmd.link.push('-Y', 'AES128')
  if (input.encryption === 'aes-256') cmd.link.push('-Y', 'AES256')
  if (input.splitSize) cmd.link.push('-s', input.splitSize)

  cmd.link.push(input.output.file.path)
  cmd.link.push(input.input.path)

  if (input.exclude) {
    cmd.link.push('-x', ...input.exclude)
  }

  return buildCommandSequence(cmd)
}
