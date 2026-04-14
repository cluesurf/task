import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'
import type { ArchiveWithRar } from '~/code/form/action/archive/rar'

export function buildCommandToArchiveWithRar(input: ArchiveWithRar) {
  const cmd = getCommand('rar')

  cmd.link.push('a')
  if (input.recursive !== false) cmd.link.push('-r')
  if (input.solid) cmd.link.push('-s')
  if (typeof input.level === 'number') cmd.link.push(`-m${input.level}`)
  if (typeof input.recovery === 'number') {
    cmd.link.push(`-rr${input.recovery}`)
  }
  if (input.password) cmd.link.push(`-hp${input.password}`)
  if (input.volumeSize) cmd.link.push(`-v${input.volumeSize}`)

  if (input.exclude) {
    for (const pattern of input.exclude) cmd.link.push(`-x${pattern}`)
  }

  cmd.link.push(input.output.file.path)
  cmd.link.push(input.input.path)

  return buildCommandSequence(cmd)
}
