import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'

export const RemoveProfileCommandInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
})

export type RemoveProfileCommandInputRecord = z.infer<
  typeof RemoveProfileCommandInputParser
>
