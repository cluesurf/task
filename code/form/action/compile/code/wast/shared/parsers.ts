import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  WastInputFormat,
  WastOutputFormat,
} from '~/code/form/action/compile/code/wast/shared/index'

let WastInputFormatModel: z.ZodType<WastInputFormat>

export const WastInputFormatParser = () => {
  if (!WastInputFormatModel) {
    WastInputFormatModel = z.enum(
      LOAD('wast_input_format') as readonly [string, ...string[]],
    ) as z.ZodType<WastInputFormat>
  }
  return WastInputFormatModel!
}

let WastOutputFormatModel: z.ZodType<WastOutputFormat>

export const WastOutputFormatParser = () => {
  if (!WastOutputFormatModel) {
    WastOutputFormatModel = z.enum(
      LOAD('wast_output_format') as readonly [string, ...string[]],
    ) as z.ZodType<WastOutputFormat>
  }
  return WastOutputFormatModel!
}
