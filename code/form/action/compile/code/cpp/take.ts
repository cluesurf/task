import { z } from 'zod'

import { CppInputFormat } from '~/code/form/action/compile/code/cpp'
import { CPP_INPUT_FORMAT } from '~/code/form/action/compile/code/cpp/base'

export const CppInputFormatParser = z.enum(
  CPP_INPUT_FORMAT as readonly [string, ...string[]],
) as z.ZodType<CppInputFormat>
