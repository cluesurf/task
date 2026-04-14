import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'
import { FontFormatParser } from '~/code/form/object/font/take'

export const ConvertFontWithFontForgeCommandInputParser = z.object({
  input: z.object({
    format: z.lazy(() => FontFormatParser),
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    format: z.lazy(() => FontFormatParser),
    file: z.lazy(() => LocalPathParser),
  }),
  pathScope: z.optional(z.string()),
})

export type ConvertFontWithFontForgeCommandInputRecord = z.infer<
  typeof ConvertFontWithFontForgeCommandInputParser
>
