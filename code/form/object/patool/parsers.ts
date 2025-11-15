import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import { PatoolFormat } from '~/code/form/object/patool/index'

let PatoolFormatModel: z.ZodType<PatoolFormat>

export const PatoolFormatParser = () => {
  if (!PatoolFormatModel) {
    PatoolFormatModel = z.enum(
      LOAD('patool_format') as readonly [string, ...string[]],
    ) as z.ZodType<PatoolFormat>
  }
  return PatoolFormatModel!
}
