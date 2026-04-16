import { z } from 'zod'

import { DisassembleJvmLevel } from '~/code/form/action/disassemble/jvm/shared'
import { DISASSEMBLE_JVM_LEVEL } from '~/code/form/action/disassemble/jvm/shared/base'

export const DisassembleJvmLevelParser = z.enum(
  DISASSEMBLE_JVM_LEVEL as readonly [string, ...string[]],
) as z.ZodType<DisassembleJvmLevel>
