import { z } from 'zod'

export const DisassembleWasmCommandInputParser = z.object({
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
  folding: z.optional(z.boolean()),
  inline: z.optional(z.boolean()),
  noDebugNames: z.optional(z.boolean()),
})

export type DisassembleWasmCommandInputRecord = z.infer<
  typeof DisassembleWasmCommandInputParser
>
