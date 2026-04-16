import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'

export const RemovePasswordCommandInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  password: z.optional(z.string()),
})

export type RemovePasswordCommandInputRecord = z.infer<
  typeof RemovePasswordCommandInputParser
>
