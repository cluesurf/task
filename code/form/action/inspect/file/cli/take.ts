import { z } from 'zod'

export const InspectFileCommandInputParser = z.object({
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
})

export type InspectFileCommandInputRecord = z.infer<
  typeof InspectFileCommandInputParser
>
