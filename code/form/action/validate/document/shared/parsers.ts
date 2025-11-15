import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import { ValidatePdfWithData } from '~/code/form/action/validate/document/shared/index'

let ValidatePdfWithDataModel: z.ZodType<ValidatePdfWithData>

export const ValidatePdfWithDataParser =
  (): z.ZodType<ValidatePdfWithData> => {
    if (!ValidatePdfWithDataModel) {
      ValidatePdfWithDataModel = z.object({
        input: z.object({
          format: z.string(),
          file: z.object({
            data: z.instanceof(ArrayBuffer),
          }),
        }),
      }) as z.ZodType<ValidatePdfWithData>
    }
    return ValidatePdfWithDataModel!
  }
