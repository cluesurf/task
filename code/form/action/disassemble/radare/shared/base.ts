import {
  DisassembleRadareProfile,
  DisassembleRadareTool,
} from '~/code/form/action/disassemble/radare/shared'

export const DISASSEMBLE_RADARE_PROFILE: ReadonlyArray<DisassembleRadareProfile> =
  ['functions', 'calls', 'strings', 'full']
export const DISASSEMBLE_RADARE_TOOL: ReadonlyArray<DisassembleRadareTool> =
  ['radare2', 'rizin']
