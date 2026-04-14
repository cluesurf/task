import { z } from 'zod'

import { PatoolFormat } from '~/code/form/object/patool'
import { PATOOL_FORMAT } from '~/code/form/object/patool/base'

export const PatoolFormatParser = z.enum(
  PATOOL_FORMAT as readonly [string, ...string[]],
) as z.ZodType<PatoolFormat>
