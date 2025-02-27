import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  EnscriptInputFormat,
  EnscriptOutputFormat,
} from '~/code/type/object/enscript/index'

let EnscriptInputFormatModel: z.ZodType<EnscriptInputFormat>

export const EnscriptInputFormatParser = () => {
  if (!EnscriptInputFormatModel) {
    EnscriptInputFormatModel = z.enum(
      LOAD('enscript_input_format') as readonly [string, ...string[]],
    ) as z.ZodType<EnscriptInputFormat>
  }
  return EnscriptInputFormatModel!
}

let EnscriptOutputFormatModel: z.ZodType<EnscriptOutputFormat>

export const EnscriptOutputFormatParser = () => {
  if (!EnscriptOutputFormatModel) {
    EnscriptOutputFormatModel = z.enum(
      LOAD('enscript_output_format') as readonly [string, ...string[]],
    ) as z.ZodType<EnscriptOutputFormat>
  }
  return EnscriptOutputFormatModel!
}
