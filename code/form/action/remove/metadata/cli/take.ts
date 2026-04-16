import { z } from 'zod'

export const RemoveMetadataCommandInputParser = z.object({
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

export type RemoveMetadataCommandInputRecord = z.infer<
  typeof RemoveMetadataCommandInputParser
>
