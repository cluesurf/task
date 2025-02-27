import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import { TextStyle } from '~/code/type/action/convert/index'

let TextStyleModel: z.ZodType<TextStyle>

export const TextStyleParser = (): z.ZodType<TextStyle> => {
  if (!TextStyleModel) {
    TextStyleModel = z.object({
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
    }) as z.ZodType<TextStyle>
  }
  return TextStyleModel!
}
