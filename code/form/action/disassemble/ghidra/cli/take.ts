import { z } from 'zod'

export const DisassembleGhidraCommandInputParser = z.object({
  input: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
  output: z.optional(
    z.object({
      file: z.optional(
        z.object({
          path: z.optional(z.string()),
        }),
      ),
    }),
  ),
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
