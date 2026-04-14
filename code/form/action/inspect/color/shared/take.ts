import { z } from 'zod'

export const InspectColorParser = z.object({
  value: z.string(),
})

export type InspectColorRecord = z.infer<typeof InspectColorParser>
