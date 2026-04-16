export type RadareTool = 'radare2' | 'rizin'

export function buildCommandToDisassembleRadare(input: {
  inputPath: string
  tool?: string
  commands: string[]
}): { bin: RadareTool; args: string[] } {
  const bin: RadareTool =
    input.tool === 'rizin' ? 'rizin' : 'radare2'
  const joined = input.commands.join(';') + ';q'
  const args = ['-q', '-c', joined, input.inputPath]
  return { bin, args }
}

export type RadareProfile =
  | 'functions'
  | 'calls'
  | 'strings'
  | 'full'

export const RADARE_PROFILES: Record<RadareProfile, string[]> = {
  functions: ['aaa', 'afl'],
  calls: ['aaa', 'agCd'],
  strings: ['aaa', 'izq'],
  full: ['aaa', 'afl', 'izq', 's entry0', 'pdf'],
}
