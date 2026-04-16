import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'

export const RenderFontCommandInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  text: z.string(),
  fontSize: z.optional(z.number().int().gte(0)),
  features: z.optional(z.string()),
})

export type RenderFontCommandInputRecord = z.infer<
  typeof RenderFontCommandInputParser
>
