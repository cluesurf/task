import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import { CropPdfWithPdfCrop } from '~/code/type/action/convert/crop/document/shared/index'

let CropPdfWithPdfCropModel: z.ZodType<CropPdfWithPdfCrop>

export const CropPdfWithPdfCropParser =
  (): z.ZodType<CropPdfWithPdfCrop> => {
    if (!CropPdfWithPdfCropModel) {
      CropPdfWithPdfCropModel = z.object({
        margin: z.optional(z.number().int().gte(0)),
        input: z.object({
          file: z.object({
            path: z.string(),
          }),
        }),
        output: z.object({
          file: z.object({
            path: z.string(),
          }),
        }),
      }) as z.ZodType<CropPdfWithPdfCrop>
    }
    return CropPdfWithPdfCropModel!
  }
