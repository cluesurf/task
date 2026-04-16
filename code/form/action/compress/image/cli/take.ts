import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'

export const CompressImageCommandInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  quality: z.optional(z.string()),
})

export type CompressImageCommandInputRecord = z.infer<
  typeof CompressImageCommandInputParser
>
