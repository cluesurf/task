import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'

export const RotateImageCommandInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  degree: z.string(),
})

export type RotateImageCommandInputRecord = z.infer<
  typeof RotateImageCommandInputParser
>
