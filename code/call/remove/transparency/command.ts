import type { RemoveTransparencyNodeInput } from './shared'

export function buildCommandToRemoveTransparency(
  input: RemoveTransparencyNodeInput,
  outputPath: string,
): { bin: 'convert'; args: string[] } {
  const bg = input.background ?? 'white'
  return {
    bin: 'convert',
    args: [
      input.input,
      '-background',
      bg,
      '-alpha',
      'remove',
      '-alpha',
      'off',
      outputPath,
    ],
  }
}
