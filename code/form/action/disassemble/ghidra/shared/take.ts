import { z } from 'zod'

import { DisassembleGhidraProfile } from '~/code/form/action/disassemble/ghidra/shared'
import { DISASSEMBLE_GHIDRA_PROFILE } from '~/code/form/action/disassemble/ghidra/shared/base'

export const DisassembleGhidraProfileParser = z.enum(
  DISASSEMBLE_GHIDRA_PROFILE as readonly [string, ...string[]],
) as z.ZodType<DisassembleGhidraProfile>
