import { z } from 'zod'

import { CInputFormat } from '~/code/form/action/compile/code/c/shared'
import { C_INPUT_FORMAT } from '~/code/form/action/compile/code/c/shared/base'

export const CInputFormatParser = z.enum(
  C_INPUT_FORMAT as readonly [string, ...string[]],
) as z.ZodType<CInputFormat>
