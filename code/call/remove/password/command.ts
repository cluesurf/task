import type { RemovePasswordNodeInput } from './shared'

export function buildCommandToRemovePassword(
  input: RemovePasswordNodeInput,
  outputPath: string,
): { bin: 'qpdf'; args: string[] } {
  const args: string[] = ['--decrypt']
  if (input.password) args.push(`--password=${input.password}`)
  args.push(input.input, outputPath)
  return { bin: 'qpdf', args }
}
