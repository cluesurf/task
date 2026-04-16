import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'

export const TrimAudioCommandInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  start: z.optional(z.string()),
  end: z.optional(z.string()),
  duration: z.optional(z.string()),
})

export type TrimAudioCommandInputRecord = z.infer<
  typeof TrimAudioCommandInputParser
>
