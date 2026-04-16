import { z } from 'zod'

export const DisassembleDotnetCommandInputParser = z.object({
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
  bytes: z.optional(z.boolean()),
  header: z.optional(z.boolean()),
  tokens: z.optional(z.boolean()),
  noBar: z.optional(z.boolean()),
})

export type DisassembleDotnetCommandInputRecord = z.infer<
  typeof DisassembleDotnetCommandInputParser
>
