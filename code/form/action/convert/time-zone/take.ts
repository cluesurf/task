import { z } from 'zod'

import { TimeZoneParser } from '~/code/form/object/time/take'

export const ConvertTimeZoneParser = z.object({
  input: z.object({
    date: z.string(),
  }),
  output: z.object({
    timezone: z.lazy(() => TimeZoneParser),
    format: z.string(),
  }),
})

export type ConvertTimeZoneRecord = z.infer<
  typeof ConvertTimeZoneParser
>
