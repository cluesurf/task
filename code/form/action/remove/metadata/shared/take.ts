import { z } from 'zod'

export const RemoveImageMetadataParser = z.object({
  input: z.object({
    format: z.string(),
    file: z.object({
      path: z.string(),
    }),
  }),
})

export type RemoveImageMetadataRecord = z.infer<
  typeof RemoveImageMetadataParser
>
