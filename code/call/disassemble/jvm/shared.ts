import { parseSingleFileInput } from '~/code/tool/shared/sanitize'
import { makeTestGuard } from '~/code/tool/shared/verb'

export type DisassembleJvmLevel =
  | 'public'
  | 'protected'
  | 'package'
  | 'private'

export type DisassembleJvmNodeInput = {
  input: string
  output?: string
  level?: DisassembleJvmLevel
  verbose?: boolean
  constants?: boolean
  lineNumbers?: boolean
  classpath?: string
  className?: string
}

export type DisassembleJvmNodeOutput = { file?: { path: string } }

export function parseDisassembleJvmNode(
  input: unknown,
): DisassembleJvmNodeInput {
  return parseSingleFileInput(input, 'disassemble jvm', {
    booleans: ['verbose', 'constants', 'lineNumbers'] as const,
    strings: ['level', 'classpath', 'className'] as const,
  }) as DisassembleJvmNodeInput
}

export const testDisassembleJvmNode = makeTestGuard(
  parseDisassembleJvmNode,
)
