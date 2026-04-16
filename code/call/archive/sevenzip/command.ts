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
): { bin: string; args: string[] } {
  const bin = '7z'
  const args: string[] = ['a']
  const fmt = input.output.format

  const flag = TYPE_FLAG[fmt]
  if (flag) args.push(`-t${flag}`)

  if (typeof input.level === 'number') {
    args.push(`-mx=${input.level}`)
  }
  if (input.method) args.push(`-m0=${input.method}`)
  if (input.solid === false) args.push('-ms=off')
  if (typeof input.multithread === 'number') {
    args.push(`-mmt=${input.multithread}`)
  }
  if (input.password) {
    args.push(`-p${input.password}`)
    if (input.encryptHeaders) args.push('-mhe=on')
  }
  if (input.volumeSize) args.push(`-v${input.volumeSize}`)
  if (input.exclude) {
    for (const pattern of input.exclude) args.push(`-xr!${pattern}`)
  }

  args.push(input.output.file.path)
  args.push(input.input.path)

  return { bin, args }
}
