import { z } from 'zod'

export const ScoutDomainParser = z.object({
  input: z.object({
    domain: z.object({
      string: z.string(),
    }),
    text: z.object({
      list: z.string(),
    }),
    extension: z.object({
      list: z.string(),
    }),
    provider: z.object({
      list: z.string(),
    }),
    length: z.object({
      number: z.instanceof(Number),
    }),
  }),
})

export type ScoutDomainRecord = z.infer<typeof ScoutDomainParser>
