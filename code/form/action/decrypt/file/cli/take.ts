import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'

export const DecryptFileCommandInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  tool: z.optional(z.string()),
  passphrase: z.optional(z.string()),
  identity: z.optional(z.string()),
  cipher: z.optional(z.string()),
})

export type DecryptFileCommandInputRecord = z.infer<
  typeof DecryptFileCommandInputParser
>
