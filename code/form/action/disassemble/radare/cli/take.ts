import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'

export const DisassembleRadareCommandInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalPathParser)),
  }),
  tool: z.optional(z.string()),
  script: z.optional(z.string()),
  profile: z.optional(z.string()),
  commands: z.optional(z.array(z.string())),
})

export type DisassembleRadareCommandInputRecord = z.infer<
  typeof DisassembleRadareCommandInputParser
>
