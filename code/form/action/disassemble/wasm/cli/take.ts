import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'

export const DisassembleWasmCommandInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalPathParser)),
  }),
  folding: z.optional(z.boolean()),
  inline: z.optional(z.boolean()),
  noDebugNames: z.optional(z.boolean()),
})

export type DisassembleWasmCommandInputRecord = z.infer<
  typeof DisassembleWasmCommandInputParser
>
