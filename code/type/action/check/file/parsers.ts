import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import { CheckFileTypeUsingMagicBytes } from '~/code/type/action/check/file/index'

let CheckFileTypeUsingMagicBytesModel: z.ZodType<CheckFileTypeUsingMagicBytes>

export const CheckFileTypeUsingMagicBytesParser =
  (): z.ZodType<CheckFileTypeUsingMagicBytes> => {
    if (!CheckFileTypeUsingMagicBytesModel) {
      CheckFileTypeUsingMagicBytesModel = z.object({
        input: z.object({
          file: z.object({
            path: z.string(),
          }),
        }),
      }) as z.ZodType<CheckFileTypeUsingMagicBytes>
    }
    return CheckFileTypeUsingMagicBytesModel!
  }
