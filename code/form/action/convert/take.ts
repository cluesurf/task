import { TEST } from '@cluesurf/form'
import { z } from 'zod'
import * as code from '~/code/form/code'

export const TextStyleParser = z.object({
  color: z.optional(
    z.string().refine(TEST('color', code.is_hex_color_6.test)),
  ),
  bold: z.optional(z.boolean()).default(false),
  italic: z.optional(z.boolean()).default(false),
  font: z.optional(
    z.object({
      size: z.optional(z.number().int().gte(0)),
      family: z.optional(z.array(z.string())),
    }),
  ),
  lineHeight: z.optional(z.number()),
  letterSpacing: z.optional(z.number()),
  allCaps: z.optional(z.boolean()).default(false),
})

export type TextStyleRecord = z.infer<typeof TextStyleParser>
