import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'

export const DisassembleJvmCommandInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalPathParser)),
  }),
  level: z.optional(z.string()),
  verbose: z.optional(z.boolean()),
  constants: z.optional(z.boolean()),
  lineNumbers: z.optional(z.boolean()),
  classpath: z.optional(z.string()),
  className: z.optional(z.string()),
})

export type DisassembleJvmCommandInputRecord = z.infer<
  typeof DisassembleJvmCommandInputParser
>
