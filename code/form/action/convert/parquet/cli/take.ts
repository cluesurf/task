import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'

export const ConvertParquetCommandInputParser = z.object({
  input: z.object({
    format: z.string(),
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    format: z.string(),
    directory: z.lazy(() => LocalPathParser),
    file: z.optional(z.lazy(() => LocalPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type ConvertParquetCommandInputRecord = z.infer<
  typeof ConvertParquetCommandInputParser
>
