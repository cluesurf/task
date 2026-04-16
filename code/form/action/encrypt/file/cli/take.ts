import { z } from 'zod'

export const EncryptFileCommandInputParser = z.object({
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
  recipients: z.optional(z.array(z.string())),
  cipher: z.optional(z.string()),
  armor: z.optional(z.boolean()),
})

export type EncryptFileCommandInputRecord = z.infer<
  typeof EncryptFileCommandInputParser
>
