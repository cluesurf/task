import { z } from 'zod'

export const CheckDomainAvailabilityParser = z.object({
  input: z.object({
    domain: z.object({
      list: z.string(),
    }),
    provider: z.object({
      string: z.string(),
    }),
  }),
})

export type CheckDomainAvailabilityRecord = z.infer<
  typeof CheckDomainAvailabilityParser
>
