import { z } from 'zod'

export const GetDurationCommandInputParser = z.object({
  input: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
  output: z.optional(
    z.object({
      file: z.optional(
        z.object({
          path: z.optional(z.string()),
        }),
      ),
    }),
  ),
  unit: z.optional(z.enum(['ms', 's', 'clock'])),
  video: z.optional(z.boolean()).default(false),
})

export type GetDurationCommandInputRecord = z.infer<
  typeof GetDurationCommandInputParser
>
