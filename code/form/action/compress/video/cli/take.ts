import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'

export const CompressVideoCommandInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  crf: z.optional(z.string()),
  preset: z.optional(z.string()),
})

export type CompressVideoCommandInputRecord = z.infer<
  typeof CompressVideoCommandInputParser
>
