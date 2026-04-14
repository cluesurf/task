import { z } from 'zod'

import { UnarchiverFormat } from '~/code/form/object/unarchiver'
import { UNARCHIVER_FORMAT } from '~/code/form/object/unarchiver/base'

export const UnarchiverFormatParser = z.enum(
  UNARCHIVER_FORMAT as readonly [string, ...string[]],
) as z.ZodType<UnarchiverFormat>

export const UnarchiverFormatDataParser = z.object({
  head: z.string(),
})

export type UnarchiverFormatDataRecord = z.infer<
  typeof UnarchiverFormatDataParser
>
