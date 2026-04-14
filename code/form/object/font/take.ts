import { z } from 'zod'

import { FontFormat } from '~/code/form/object/font'
import { FONT_FORMAT } from '~/code/form/object/font/base'

export const FontFormatParser = z.enum(
  FONT_FORMAT as readonly [string, ...string[]],
) as z.ZodType<FontFormat>
