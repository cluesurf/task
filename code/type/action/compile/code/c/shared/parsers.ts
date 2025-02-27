import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import { CInputFormat } from '~/code/type/action/compile/code/c/shared/index'

let CInputFormatModel: z.ZodType<CInputFormat>

export const CInputFormatParser = () => {
  if (!CInputFormatModel) {
    CInputFormatModel = z.enum(
      LOAD('c_input_format') as readonly [string, ...string[]],
    ) as z.ZodType<CInputFormat>
  }
  return CInputFormatModel!
}
