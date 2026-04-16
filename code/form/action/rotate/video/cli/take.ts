import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'

export const RotateVideoCommandInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  degree: z.string(),
})

export type RotateVideoCommandInputRecord = z.infer<
  typeof RotateVideoCommandInputParser
>
