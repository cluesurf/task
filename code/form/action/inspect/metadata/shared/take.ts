import { z } from 'zod'

export const InspectMetadataFromImageParser = z.object({
  input: z.object({
    format: z.string(),
    file: z.object({
      path: z.string(),
    }),
  }),
  copyright: z.optional(z.string()),
  creator: z.optional(z.string()),
  license: z.optional(z.string()),
  keywords: z.optional(z.array(z.string())),
  artist: z.optional(z.string()),
  originalDate: z.optional(z.coerce.date()),
  allDates: z.optional(z.coerce.date()),
  creationDate: z.optional(z.coerce.date()),
  title: z.optional(z.string()),
  description: z.optional(z.string()),
})

export type InspectMetadataFromImageRecord = z.infer<
  typeof InspectMetadataFromImageParser
>
