import type { ArchiveWithPatool } from '~/code/form/action/archive/patool'

export function buildCommandToArchiveWithPatool(
  input: ArchiveWithPatool,
): { bin: string; args: string[] } {
  const bin = 'patool'
  const args: string[] = []

  if (input.verbose) args.push('--verbose')
  if (input.nonInteractive !== false) {
    args.push('--non-interactive')
  }

  args.push('create')
  args.push(input.output.file.path)
  args.push(input.input.path)

  return { bin, args }
}
