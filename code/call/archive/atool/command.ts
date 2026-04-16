import type { ArchiveWithAtool } from '~/code/form/action/archive/atool'

export function buildCommandToArchiveWithAtool(input: ArchiveWithAtool): { bin: string; args: string[] } {
  const bin = 'atool'
  const args: string[] = ['--add']

  if (input.force) args.push('--force')
  if (input.quiet !== false) args.push('--quiet')
  if (input.verbose) args.push('--verbose')

  args.push(input.output.file.path)
  args.push(input.input.path)

  return { bin, args }
}
