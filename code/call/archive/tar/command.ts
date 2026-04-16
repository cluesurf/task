import path from 'node:path'
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

export function buildCommandToArchiveWithTar(input: ArchiveWithTar): { bin: string; args: string[] } {
  const bin = 'tar'
  const args: string[] = ['-c', '-f', input.output.file.path]

  const compress = COMPRESS_FLAG[input.output.format]
  if (compress) args.push(compress)

  if (input.dereference) args.push('-h')
  if (input.preserveOwner === false) args.push('--no-same-owner')
  if (input.preservePermissions === false) {
    args.push('--no-same-permissions')
  }
  if (input.exclude) {
    for (const pattern of input.exclude) {
      args.push(`--exclude=${pattern}`)
    }
  }
  let entry = input.input.path
  if (input.changeDirectory) {
    args.push('-C', input.changeDirectory)
  } else if (path.isAbsolute(entry) || entry.includes('/')) {
    const parent = path.dirname(entry) || '.'
    const base = path.basename(entry)
    args.push('-C', parent)
    entry = base
  }

  if (typeof input.compressionLevel === 'number') {
    // GNU tar forwards env to the compressor, so `-I "gzip -N"`
    // style flags belong on the compressor invocation -- leave that
    // to the caller via a future `compressorFlags` field.
  }

  args.push(entry)

  return { bin, args }
}
