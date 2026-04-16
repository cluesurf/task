import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'

export const UpdateImageCommandInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalPathParser)),
  }),
  grayscale: z.optional(z.boolean()),
  brightness: z.optional(z.string()),
  contrast: z.optional(z.string()),
  saturation: z.optional(z.string()),
})

export type UpdateImageCommandInputRecord = z.infer<
  typeof UpdateImageCommandInputParser
>
