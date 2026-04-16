import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'

export const TrimVideoCommandInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  start: z.optional(z.string()),
  end: z.optional(z.string()),
  duration: z.optional(z.string()),
  reencode: z.optional(z.boolean()),
})

export type TrimVideoCommandInputRecord = z.infer<
  typeof TrimVideoCommandInputParser
>
