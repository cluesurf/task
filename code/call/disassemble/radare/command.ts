import type {
  DisassembleRadareNodeInput,
  RadareTool,
} from './shared'

export function buildCommandToDisassembleRadare(
  input: DisassembleRadareNodeInput,
  commands: string[],
): { bin: RadareTool; args: string[] } {
  const bin: RadareTool = input.tool ?? 'radare2'
  const joined = commands.join(';') + ';q'
  const args = ['-q', '-c', joined, input.input]
  return { bin, args }
}
