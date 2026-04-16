import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'

export const NormalizeAudioCommandInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  target: z.optional(z.string()),
  peak: z.optional(z.string()),
  range: z.optional(z.string()),
})

export type NormalizeAudioCommandInputRecord = z.infer<
  typeof NormalizeAudioCommandInputParser
>
