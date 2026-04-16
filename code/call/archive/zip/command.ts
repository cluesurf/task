import type { ArchiveWithZip } from '~/code/form/action/archive/zip'

export function buildCommandToArchiveWithZip(input: ArchiveWithZip): { bin: string; args: string[] } {
  const bin = 'zip'
  const args: string[] = []

  if (input.recursive !== false) args.push('-r')
  if (input.junkPaths) args.push('-j')
  if (typeof input.level === 'number') args.push(`-${input.level}`)
  if (input.password) args.push('-P', input.password)
  if (input.encryption === 'aes-128') args.push('-Y', 'AES128')
  if (input.encryption === 'aes-256') args.push('-Y', 'AES256')
  if (input.splitSize) args.push('-s', input.splitSize)

  args.push(input.output.file.path)
  args.push(input.input.path)

  if (input.exclude) {
    args.push('-x', ...input.exclude)
  }

  return { bin, args }
}
