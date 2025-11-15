import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  PandocFormatContentKey,
  PandocFormatData,
  PandocInputFormat,
  PandocOutputFormat,
} from '~/code/form/object/pandoc/index'
import { PANDOC_FORMAT_CONTENT_KEY } from '~/code/form/object/pandoc/constants'

export const PandocFormatContentKeyParser: z.ZodType<PandocFormatContentKey> =
  z.enum(
    PANDOC_FORMAT_CONTENT_KEY as [
      PandocFormatContentKey,
      ...PandocFormatContentKey[],
    ],
  )

let PandocFormatDataModel: z.ZodType<PandocFormatData>

export const PandocFormatDataParser =
  (): z.ZodType<PandocFormatData> => {
    if (!PandocFormatDataModel) {
      PandocFormatDataModel = z.object({
        head: z.string(),
      }) as z.ZodType<PandocFormatData>
    }
    return PandocFormatDataModel!
  }

let PandocInputFormatModel: z.ZodType<PandocInputFormat>

export const PandocInputFormatParser = () => {
  if (!PandocInputFormatModel) {
    PandocInputFormatModel = z.enum(
      LOAD('pandoc_input_format') as readonly [string, ...string[]],
    ) as z.ZodType<PandocInputFormat>
  }
  return PandocInputFormatModel!
}

let PandocOutputFormatModel: z.ZodType<PandocOutputFormat>

export const PandocOutputFormatParser = () => {
  if (!PandocOutputFormatModel) {
    PandocOutputFormatModel = z.enum(
      LOAD('pandoc_output_format') as readonly [string, ...string[]],
    ) as z.ZodType<PandocOutputFormat>
  }
  return PandocOutputFormatModel!
}
