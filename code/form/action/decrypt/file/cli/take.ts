import { z } from 'zod'

export const DecryptFileCommandInputParser = z.object({
  input: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
  output: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
  tool: z.optional(z.string()),
  passphrase: z.optional(z.string()),
  identity: z.optional(z.string()),
  cipher: z.optional(z.string()),
})

export type DecryptFileCommandInputRecord = z.infer<
  typeof DecryptFileCommandInputParser
>
