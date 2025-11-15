import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import { CInputFormat } from '~/code/form/action/compile/code/c/shared/index'

let CInputFormatModel: z.ZodType<CInputFormat>

export const CInputFormatParser = () => {
  if (!CInputFormatModel) {
    CInputFormatModel = z.enum(
      LOAD('c_input_format') as readonly [string, ...string[]],
    ) as z.ZodType<CInputFormat>
  }
  return CInputFormatModel!
}
