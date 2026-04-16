import { parseSingleFileInput } from '~/code/tool/shared/sanitize'
import { makeTestGuard } from '~/code/tool/shared/verb'

export type DisassembleWasmNodeInput = {
  input: string
  output?: string
  folding?: boolean
  inline?: boolean
  noDebugNames?: boolean
}

export type DisassembleWasmNodeOutput = { file: { path: string } }

export function parseDisassembleWasmNode(
  input: unknown,
): DisassembleWasmNodeInput {
  return parseSingleFileInput(input, 'disassemble wasm', {
    booleans: ['folding', 'inline', 'noDebugNames'] as const,
  })
}

export const testDisassembleWasmNode = makeTestGuard(
  parseDisassembleWasmNode,
)
