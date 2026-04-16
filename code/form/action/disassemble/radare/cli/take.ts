import { z } from 'zod'

export const DisassembleRadareCommandInputParser = z.object({
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
  tool: z.optional(z.string()),
  script: z.optional(z.string()),
  profile: z.optional(z.string()),
  commands: z.optional(z.array(z.string())),
})

export type DisassembleRadareCommandInputRecord = z.infer<
  typeof DisassembleRadareCommandInputParser
>
