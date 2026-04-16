import type { DisassembleWasmNodeInput } from './shared'

export function buildCommandToDisassembleWasm(
  input: DisassembleWasmNodeInput,
  outputPath: string,
): { bin: 'wasm2wat'; args: string[] } {
  const args: string[] = [input.input, '-o', outputPath]
  if (input.folding) args.push('--fold-exprs')
  if (input.inline) args.push('--inline-exports', '--inline-imports')
  if (input.noDebugNames) args.push('--no-debug-names')
  return { bin: 'wasm2wat', args }
}
