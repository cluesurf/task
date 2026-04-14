import { z } from 'zod'

export const SearchParser = z.object({
  pattern: z.optional(z.string()),
  path: z.optional(z.string()).default('.'),
  name: z.optional(z.boolean()).default(false),
  type: z.optional(z.string()),
  files: z.optional(z.boolean()).default(false),
  count: z.optional(z.boolean()).default(false),
  hidden: z.optional(z.boolean()).default(false),
  ignoreCase: z.optional(z.boolean()).default(false),
  fixed: z.optional(z.boolean()).default(false),
  maxCount: z.optional(z.number().int().gte(0)),
})

export type SearchRecord = z.infer<typeof SearchParser>
