import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import { CppInputFormat } from '~/code/form/action/compile/code/cpp/index'

let CppInputFormatModel: z.ZodType<CppInputFormat>

export const CppInputFormatParser = () => {
  if (!CppInputFormatModel) {
    CppInputFormatModel = z.enum(
      LOAD('cpp_input_format') as readonly [string, ...string[]],
    ) as z.ZodType<CppInputFormat>
  }
  return CppInputFormatModel!
}
