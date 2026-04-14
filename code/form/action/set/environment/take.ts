import { z } from 'zod'

export const SetEnvironmentParser = z.object({
  key: z.string(),
  value: z.string(),
  file: z.optional(z.string()).default('.env'),
})

export type SetEnvironmentRecord = z.infer<typeof SetEnvironmentParser>
