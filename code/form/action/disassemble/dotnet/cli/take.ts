import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'

export const DisassembleDotnetCommandInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalPathParser)),
  }),
  bytes: z.optional(z.boolean()),
  header: z.optional(z.boolean()),
  tokens: z.optional(z.boolean()),
  noBar: z.optional(z.boolean()),
})

export type DisassembleDotnetCommandInputRecord = z.infer<
  typeof DisassembleDotnetCommandInputParser
>
