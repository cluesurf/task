import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import { FontFormat } from '~/code/form/object/font/index'

let FontFormatModel: z.ZodType<FontFormat>

export const FontFormatParser = () => {
  if (!FontFormatModel) {
    FontFormatModel = z.enum(
      LOAD('font_format') as readonly [string, ...string[]],
    ) as z.ZodType<FontFormat>
  }
  return FontFormatModel!
}
