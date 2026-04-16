import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'

export const FlipImageCommandInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  horizontal: z.optional(z.boolean()),
  vertical: z.optional(z.boolean()),
})

export type FlipImageCommandInputRecord = z.infer<
  typeof FlipImageCommandInputParser
>
