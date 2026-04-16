import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'

export const TrimImageCommandInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  crop: z.string(),
})

export type TrimImageCommandInputRecord = z.infer<
  typeof TrimImageCommandInputParser
>
