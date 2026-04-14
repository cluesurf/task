import { z } from 'zod'

import {
  EnscriptInputFormat,
  EnscriptOutputFormat,
} from '~/code/form/object/enscript'
import {
  ENSCRIPT_INPUT_FORMAT,
  ENSCRIPT_OUTPUT_FORMAT,
} from '~/code/form/object/enscript/base'

export const EnscriptInputFormatParser = z.enum(
  ENSCRIPT_INPUT_FORMAT as readonly [string, ...string[]],
) as z.ZodType<EnscriptInputFormat>

export const EnscriptOutputFormatParser = z.enum(
  ENSCRIPT_OUTPUT_FORMAT as readonly [string, ...string[]],
) as z.ZodType<EnscriptOutputFormat>
