import { z } from 'zod'

import {
  PandocFormatContentKey,
  PandocInputFormat,
  PandocOutputFormat,
} from '~/code/form/object/pandoc'
import {
  PANDOC_FORMAT_CONTENT_KEY,
  PANDOC_INPUT_FORMAT,
  PANDOC_OUTPUT_FORMAT,
} from '~/code/form/object/pandoc/base'

export const PandocFormatContentKeyParser: z.ZodType<PandocFormatContentKey> =
  z.enum(
    PANDOC_FORMAT_CONTENT_KEY as [
      PandocFormatContentKey,
      ...PandocFormatContentKey[],
    ],
  )

export const PandocFormatDataParser = z.object({
  head: z.string(),
})

export type PandocFormatDataRecord = z.infer<
  typeof PandocFormatDataParser
>

export const PandocInputFormatParser = z.enum(
  PANDOC_INPUT_FORMAT as readonly [string, ...string[]],
) as z.ZodType<PandocInputFormat>

export const PandocOutputFormatParser = z.enum(
  PANDOC_OUTPUT_FORMAT as readonly [string, ...string[]],
) as z.ZodType<PandocOutputFormat>
