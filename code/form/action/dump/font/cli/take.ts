import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'

export const DumpFontCommandInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalPathParser)),
  }),
  tables: z.optional(z.string()),
})

export type DumpFontCommandInputRecord = z.infer<
  typeof DumpFontCommandInputParser
>
