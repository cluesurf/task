import { z } from 'zod'

export const LoadEnvironmentParser = z.object({
  key: z.string(),
  value: z.string(),
  file: z.optional(z.string()).default('.env'),
})

export type LoadEnvironmentRecord = z.infer<
  typeof LoadEnvironmentParser
>
