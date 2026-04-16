import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'

export const UpdateVideoCommandInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  subtitles: z.optional(z.string()),
})

export type UpdateVideoCommandInputRecord = z.infer<
  typeof UpdateVideoCommandInputParser
>
