import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'

export const SubsetFontCommandInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  text: z.optional(z.string()),
  unicodes: z.optional(z.string()),
  layoutFeatures: z.optional(z.string()),
  flavor: z.optional(z.string()),
})

export type SubsetFontCommandInputRecord = z.infer<
  typeof SubsetFontCommandInputParser
>
