import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'
import type { ArchiveWithSevenzip } from '~/code/form/action/archive/sevenzip'

const TYPE_FLAG: Record<string, string> = {
  '7z': '7z',
  zip: 'zip',
  tar: 'tar',
  'tar.gz': 'gzip',
  'tar.bz2': 'bzip2',
  'tar.xz': 'xz',
  gz: 'gzip',
  bz2: 'bzip2',
  xz: 'xz',
  zst: 'zstd',
}

export function buildCommandToArchiveWithSevenzip(
  input: ArchiveWithSevenzip,
) {
  const cmd = getCommand('7z')
  const fmt = input.output.format

  cmd.link.push('a')
  const flag = TYPE_FLAG[fmt]
  if (flag) cmd.link.push(`-t${flag}`)

  if (typeof input.level === 'number') {
    cmd.link.push(`-mx=${input.level}`)
  }
  if (input.method) cmd.link.push(`-m0=${input.method}`)
  if (input.solid === false) cmd.link.push('-ms=off')
  if (typeof input.multithread === 'number') {
    cmd.link.push(`-mmt=${input.multithread}`)
  }
  if (input.password) {
    cmd.link.push(`-p${input.password}`)
    if (input.encryptHeaders) cmd.link.push('-mhe=on')
  }
  if (input.volumeSize) cmd.link.push(`-v${input.volumeSize}`)
  if (input.exclude) {
    for (const pattern of input.exclude) cmd.link.push(`-xr!${pattern}`)
  }

  cmd.link.push(input.output.file.path)
  cmd.link.push(input.input.path)

  return buildCommandSequence(cmd)
}
