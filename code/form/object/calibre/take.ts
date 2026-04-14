import { z } from 'zod'

import {
  CalibreInputFormat,
  CalibreInputProfile,
  CalibreOutputFormat,
  CalibreOutputProfile,
} from '~/code/form/object/calibre'
import {
  CALIBRE_INPUT_FORMAT,
  CALIBRE_INPUT_PROFILE,
  CALIBRE_OUTPUT_FORMAT,
  CALIBRE_OUTPUT_PROFILE,
} from '~/code/form/object/calibre/base'

export const CalibreFormatDataParser = z.object({
  head: z.string(),
})

export type CalibreFormatDataRecord = z.infer<
  typeof CalibreFormatDataParser
>

export const CalibreInputFormatParser = z.enum(
  CALIBRE_INPUT_FORMAT as readonly [string, ...string[]],
) as z.ZodType<CalibreInputFormat>

export const CalibreInputProfileParser = z.enum(
  CALIBRE_INPUT_PROFILE as readonly [string, ...string[]],
) as z.ZodType<CalibreInputProfile>

export const CalibreOutputFormatParser = z.enum(
  CALIBRE_OUTPUT_FORMAT as readonly [string, ...string[]],
) as z.ZodType<CalibreOutputFormat>

export const CalibreOutputProfileParser = z.enum(
  CALIBRE_OUTPUT_PROFILE as readonly [string, ...string[]],
) as z.ZodType<CalibreOutputProfile>
