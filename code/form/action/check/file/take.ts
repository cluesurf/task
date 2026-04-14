import { z } from 'zod'

export const CheckFileTypeUsingMagicBytesParser = z.object({
  input: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
})

export type CheckFileTypeUsingMagicBytesRecord = z.infer<
  typeof CheckFileTypeUsingMagicBytesParser
>
