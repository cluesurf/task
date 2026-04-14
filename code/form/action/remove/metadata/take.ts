import { z } from 'zod'

export const RemoveMetadataParser = z.object({
  input: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
  output: z.object({
    file: z.object({
      path: z.optional(z.string()),
    }),
  }),
})

export type RemoveMetadataRecord = z.infer<typeof RemoveMetadataParser>
