import { parseSingleFileInput } from '~/code/tool/shared/sanitize'
import { makeTestGuard } from '~/code/tool/shared/verb'

export type RadareTool = 'radare2' | 'rizin'

export type RadareProfile =
  | 'functions'
  | 'calls'
  | 'strings'
  | 'full'

export type DisassembleRadareNodeInput = {
  input: string
  output?: string
  tool?: RadareTool
  script?: string
  profile?: RadareProfile
  commands?: string[]
}

export type DisassembleRadareNodeOutput = {
  file?: { path: string }
}

export const RADARE_PROFILES: Record<RadareProfile, string[]> = {
  functions: ['aaa', 'afl'],
  calls: ['aaa', 'agCd'],
  strings: ['aaa', 'izq'],
  full: ['aaa', 'afl', 'izq', 's entry0', 'pdf'],
}

export function parseDisassembleRadareNode(
  input: unknown,
): DisassembleRadareNodeInput {
  return parseSingleFileInput(input, 'disassemble radare', {
    strings: ['tool', 'script', 'profile'] as const,
    arrays: ['commands'] as const,
  }) as DisassembleRadareNodeInput
}

export const testDisassembleRadareNode = makeTestGuard(
  parseDisassembleRadareNode,
)
