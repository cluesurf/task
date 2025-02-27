import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  UnarchiverFormat,
  UnarchiverFormatData,
} from '~/code/type/object/unarchiver/index'

let UnarchiverFormatModel: z.ZodType<UnarchiverFormat>

export const UnarchiverFormatParser = () => {
  if (!UnarchiverFormatModel) {
    UnarchiverFormatModel = z.enum(
      LOAD('unarchiver_format') as readonly [string, ...string[]],
    ) as z.ZodType<UnarchiverFormat>
  }
  return UnarchiverFormatModel!
}

let UnarchiverFormatDataModel: z.ZodType<UnarchiverFormatData>

export const UnarchiverFormatDataParser =
  (): z.ZodType<UnarchiverFormatData> => {
    if (!UnarchiverFormatDataModel) {
      UnarchiverFormatDataModel = z.object({
        head: z.string(),
      }) as z.ZodType<UnarchiverFormatData>
    }
    return UnarchiverFormatDataModel!
  }
