import { z } from 'zod'

export const RemoveExifCommandInputParser = z.object({
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
  tag: z.optional(z.array(z.string())),
  preset: z.optional(z.array(z.string())),
  overwrite: z.optional(z.boolean()),
})

export type RemoveExifCommandInputRecord = z.infer<
  typeof RemoveExifCommandInputParser
>
