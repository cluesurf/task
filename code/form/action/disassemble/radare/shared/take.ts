import { z } from 'zod'

import {
  DisassembleRadareProfile,
  DisassembleRadareTool,
} from '~/code/form/action/disassemble/radare/shared'
import {
  DISASSEMBLE_RADARE_PROFILE,
  DISASSEMBLE_RADARE_TOOL,
} from '~/code/form/action/disassemble/radare/shared/base'

export const DisassembleRadareProfileParser = z.enum(
  DISASSEMBLE_RADARE_PROFILE as readonly [string, ...string[]],
) as z.ZodType<DisassembleRadareProfile>

export const DisassembleRadareToolParser = z.enum(
  DISASSEMBLE_RADARE_TOOL as readonly [string, ...string[]],
) as z.ZodType<DisassembleRadareTool>
