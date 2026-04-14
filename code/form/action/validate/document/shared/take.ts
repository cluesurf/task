import { z } from 'zod'

export const ValidatePdfWithDataParser = z.object({
  input: z.object({
    format: z.string(),
    file: z.object({
      data: z.instanceof(ArrayBuffer),
    }),
  }),
})

export type ValidatePdfWithDataRecord = z.infer<
  typeof ValidatePdfWithDataParser
>
