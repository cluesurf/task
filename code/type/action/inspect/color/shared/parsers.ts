import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import { InspectColor } from '~/code/type/action/inspect/color/shared/index'

let InspectColorModel: z.ZodType<InspectColor>

export const InspectColorParser = (): z.ZodType<InspectColor> => {
  if (!InspectColorModel) {
    InspectColorModel = z.object({
      value: z.string(),
    }) as z.ZodType<InspectColor>
  }
  return InspectColorModel!
}
