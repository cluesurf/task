import { parseSingleFileInput } from '~/code/tool/shared/sanitize'
import { makeTestGuard } from '~/code/tool/shared/verb'

export type DisassembleDotnetNodeInput = {
  input: string
  output?: string
  bytes?: boolean
  header?: boolean
  tokens?: boolean
  noBar?: boolean
}

export type DisassembleDotnetNodeOutput = {
  file: { path: string }
}

export function parseDisassembleDotnetNode(
  input: unknown,
): DisassembleDotnetNodeInput {
  return parseSingleFileInput(input, 'disassemble dotnet', {
    booleans: ['bytes', 'header', 'tokens', 'noBar'] as const,
  })
}

export const testDisassembleDotnetNode = makeTestGuard(
  parseDisassembleDotnetNode,
)
