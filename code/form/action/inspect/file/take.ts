import { z } from 'zod'

export const InspectFileParser = z.object({
  input: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
})

export type InspectFileRecord = z.infer<typeof InspectFileParser>
