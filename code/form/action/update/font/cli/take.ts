import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'

export const UpdateFontCommandInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalPathParser)),
  }),
  fea: z.string(),
})

export type UpdateFontCommandInputRecord = z.infer<
  typeof UpdateFontCommandInputParser
>
