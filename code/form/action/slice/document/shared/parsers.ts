import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  SlicePdf,
  SlicePdfWithData,
} from '~/code/form/action/slice/document/shared/index'

let SlicePdfModel: z.ZodType<SlicePdf>

export const SlicePdfParser = (): z.ZodType<SlicePdf> => {
  if (!SlicePdfModel) {
    SlicePdfModel = z.object({
      input: z.object({
        format: z.string(),
        file: z.object({
          path: z.string(),
        }),
      }),
      startPage: z.number().int().gte(0),
      endPage: z.number().int().gte(0),
      output: z.object({
        file: z.object({
          path: z.string(),
        }),
      }),
    }) as z.ZodType<SlicePdf>
  }
  return SlicePdfModel!
}

let SlicePdfWithDataModel: z.ZodType<SlicePdfWithData>

export const SlicePdfWithDataParser =
  (): z.ZodType<SlicePdfWithData> => {
    if (!SlicePdfWithDataModel) {
      SlicePdfWithDataModel = z.object({
        input: z.object({
          format: z.string(),
          file: z.object({
            data: z.instanceof(ArrayBuffer),
          }),
        }),
        startPage: z.number().int().gte(0),
        endPage: z.number().int().gte(0),
      }) as z.ZodType<SlicePdfWithData>
    }
    return SlicePdfWithDataModel!
  }
