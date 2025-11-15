import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import { ConvertTimeZone } from '~/code/form/action/convert/time-zone/index'
import { TimeZoneParser } from '~/code/form/object/time/parsers'

let ConvertTimeZoneModel: z.ZodType<ConvertTimeZone>

export const ConvertTimeZoneParser = (): z.ZodType<ConvertTimeZone> => {
  if (!ConvertTimeZoneModel) {
    ConvertTimeZoneModel = z.object({
      input: z.object({
        date: z.string(),
      }),
      output: z.object({
        timezone: z.lazy(() => TimeZoneParser()),
        format: z.string(),
      }),
    }) as z.ZodType<ConvertTimeZone>
  }
  return ConvertTimeZoneModel!
}
