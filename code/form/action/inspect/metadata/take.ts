import { z } from 'zod'

export const InspectMetadataParser = z.object({
  input: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
})

export type InspectMetadataRecord = z.infer<
  typeof InspectMetadataParser
>
