import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'

export const ShapeFontCommandInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalPathParser)),
  }),
  text: z.string(),
  features: z.optional(z.string()),
  script: z.optional(z.string()),
  language: z.optional(z.string()),
  direction: z.optional(z.string()),
})

export type ShapeFontCommandInputRecord = z.infer<
  typeof ShapeFontCommandInputParser
>
