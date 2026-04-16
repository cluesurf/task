import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'

export const CompressAudioCommandInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  bitrate: z.optional(z.string()),
})

export type CompressAudioCommandInputRecord = z.infer<
  typeof CompressAudioCommandInputParser
>
