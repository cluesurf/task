import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'
import type { ArchiveWithTar } from '~/code/form/action/archive/tar'

const COMPRESS_FLAG: Record<string, string> = {
  tar: '',
  'tar.gz': '-z',
  tgz: '-z',
  'tar.bz2': '-j',
  tbz2: '-j',
  'tar.xz': '-J',
  txz: '-J',
  'tar.zst': '--zstd',
  tzst: '--zstd',
}

export function buildCommandToArchiveWithTar(input: ArchiveWithTar) {
  const cmd = getCommand('tar')

  cmd.link.push('-c')
  cmd.link.push('-f', input.output.file.path)

  const compress = COMPRESS_FLAG[input.output.format]
  if (compress) cmd.link.push(compress)

  if (input.dereference) cmd.link.push('-h')
  if (input.preserveOwner === false) cmd.link.push('--no-same-owner')
  if (input.preservePermissions === false) {
    cmd.link.push('--no-same-permissions')
  }
  if (input.exclude) {
    for (const pattern of input.exclude) {
      cmd.link.push(`--exclude=${pattern}`)
    }
  }
  if (input.changeDirectory) {
    cmd.link.push('-C', input.changeDirectory)
  }

  if (typeof input.compressionLevel === 'number') {
    // GNU tar forwards env to the compressor, so `-I "gzip -N"`
    // style flags belong on the compressor invocation — leave that
    // to the caller via a future `compressorFlags` field.
  }

  cmd.link.push(input.input.path)

  return buildCommandSequence(cmd)
}
