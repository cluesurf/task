import { z } from 'zod'

export const UpdateImageCommandInputParser = z.object({
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
  grayscale: z.optional(z.boolean()),
  brightness: z.optional(z.string()),
  contrast: z.optional(z.string()),
  saturation: z.optional(z.string()),
})

export type UpdateImageCommandInputRecord = z.infer<
  typeof UpdateImageCommandInputParser
>
