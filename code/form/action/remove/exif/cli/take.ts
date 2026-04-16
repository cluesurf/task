import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'

export const RemoveExifCommandInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  tag: z.optional(z.array(z.string())),
  preset: z.optional(z.array(z.string())),
  overwrite: z.optional(z.boolean()),
})

export type RemoveExifCommandInputRecord = z.infer<
  typeof RemoveExifCommandInputParser
>
