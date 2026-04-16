import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'

export const RemoveTransparencyCommandInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  background: z.optional(z.string()).default('white'),
})

export type RemoveTransparencyCommandInputRecord = z.infer<
  typeof RemoveTransparencyCommandInputParser
>
