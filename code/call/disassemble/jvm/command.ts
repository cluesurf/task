import type { DisassembleJvmNodeInput } from './shared'

export function buildCommandToDisassembleJvm(
  input: DisassembleJvmNodeInput,
): { bin: 'javap'; args: string[] } {
  const args: string[] = []

  switch (input.level) {
    case 'public':
      args.push('-public')
      break
    case 'protected':
      args.push('-protected')
      break
    case 'package':
      args.push('-package')
      break
    case 'private':
      args.push('-p')
      break
    default:
      args.push('-p')
      break
  }
  if (input.verbose) args.push('-v')
  if (input.constants) args.push('-constants')
  if (input.lineNumbers) args.push('-l')
  if (input.classpath) args.push('-classpath', input.classpath)

  // Input can be a file path (.class) or a fully-qualified class
  // name. If className is supplied, prefer it; otherwise pass the
  // path verbatim.
  if (input.className) args.push(input.className)
  else args.push(input.input)

  return { bin: 'javap', args }
}
