export function buildCommandToDisassembleWasm(input: {
  inputPath: string
  outputPath: string
  folding?: boolean
  inline?: boolean
  noDebugNames?: boolean
}): { bin: 'wasm2wat'; args: string[] } {
  const args: string[] = [input.inputPath, '-o', input.outputPath]
  if (input.folding) args.push('--fold-exprs')
  if (input.inline) args.push('--inline-exports', '--inline-imports')
  if (input.noDebugNames) args.push('--no-debug-names')
  return { bin: 'wasm2wat', args }
}
