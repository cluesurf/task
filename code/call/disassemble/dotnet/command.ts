import type { DisassembleDotnetNodeInput } from './shared'

export function buildCommandToDisassembleDotnet(
  input: DisassembleDotnetNodeInput,
  outputPath: string,
): { bin: 'ildasm'; args: string[] } {
  const args: string[] = [input.input, `-out=${outputPath}`]
  if (input.bytes) args.push('-bytes')
  if (input.header) args.push('-header')
  if (input.tokens) args.push('-tokens')
  if (input.noBar !== false) args.push('-nobar')
  return { bin: 'ildasm', args }
}
