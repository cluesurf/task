import type { ArchiveWithRar } from '~/code/form/action/archive/rar'

export function buildCommandToArchiveWithRar(input: ArchiveWithRar): { bin: string; args: string[] } {
  const bin = 'rar'
  const args: string[] = ['a']

  if (input.recursive !== false) args.push('-r')
  if (input.solid) args.push('-s')
  if (typeof input.level === 'number') args.push(`-m${input.level}`)
  if (typeof input.recovery === 'number') {
    args.push(`-rr${input.recovery}`)
  }
  if (input.password) args.push(`-hp${input.password}`)
  if (input.volumeSize) args.push(`-v${input.volumeSize}`)

  if (input.exclude) {
    for (const pattern of input.exclude) args.push(`-x${pattern}`)
  }

  args.push(input.output.file.path)
  args.push(input.input.path)

  return { bin, args }
}
