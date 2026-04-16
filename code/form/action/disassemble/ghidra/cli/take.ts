import { z } from 'zod'

import { LocalPathParser } from '~/code/form/object/file/take'

export const DisassembleGhidraCommandInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalPathParser)),
  }),
  profile: z.optional(z.string()),
  script: z.optional(z.string()),
  ghidraHome: z.optional(z.string()),
  projectDir: z.optional(z.string()),
  projectName: z.optional(z.string()),
  keepProject: z.optional(z.boolean()),
  verbose: z.optional(z.boolean()),
  quiet: z.optional(z.boolean()),
})

export type DisassembleGhidraCommandInputRecord = z.infer<
  typeof DisassembleGhidraCommandInputParser
>
