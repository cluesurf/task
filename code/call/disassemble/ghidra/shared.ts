import { parseSingleFileInput } from '~/code/tool/shared/sanitize'
import { makeTestGuard } from '~/code/tool/shared/verb'

export type GhidraProfile =
  | 'functions'
  | 'calls'
  | 'imports'
  | 'exports'
  | 'strings'

export type DisassembleGhidraNodeInput = {
  input: string
  output?: string
  profile?: GhidraProfile
  /** Path to a custom post-script. Overrides `profile`. */
  script?: string
  ghidraHome?: string
  projectDir?: string
  projectName?: string
  keepProject?: boolean
  verbose?: boolean
  quiet?: boolean
}

export type DisassembleGhidraNodeOutput = {
  file: { path: string }
}

export function parseDisassembleGhidraNode(
  input: unknown,
): DisassembleGhidraNodeInput {
  return parseSingleFileInput(input, 'disassemble ghidra', {
    booleans: ['keepProject', 'verbose', 'quiet'] as const,
    strings: [
      'profile',
      'script',
      'ghidraHome',
      'projectDir',
      'projectName',
    ] as const,
  }) as DisassembleGhidraNodeInput
}

export const testDisassembleGhidraNode = makeTestGuard(
  parseDisassembleGhidraNode,
)
