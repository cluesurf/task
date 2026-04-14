import { z } from 'zod'

import {
  WastInputFormat,
  WastOutputFormat,
} from '~/code/form/action/compile/code/wast/shared'
import {
  WAST_INPUT_FORMAT,
  WAST_OUTPUT_FORMAT,
} from '~/code/form/action/compile/code/wast/shared/base'

export const WastInputFormatParser = z.enum(
  WAST_INPUT_FORMAT as readonly [string, ...string[]],
) as z.ZodType<WastInputFormat>

export const WastOutputFormatParser = z.enum(
  WAST_OUTPUT_FORMAT as readonly [string, ...string[]],
) as z.ZodType<WastOutputFormat>
