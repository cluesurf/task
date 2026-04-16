import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'

export const EncryptFileCommandInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  tool: z.optional(z.string()),
  passphrase: z.optional(z.string()),
  recipients: z.optional(z.array(z.string())),
  cipher: z.optional(z.string()),
  armor: z.optional(z.boolean()),
})

export type EncryptFileCommandInputRecord = z.infer<
  typeof EncryptFileCommandInputParser
>
