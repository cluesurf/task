import { z } from 'zod'

export const DisassembleJvmCommandInputParser = z.object({
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
