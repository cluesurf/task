import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import { SwiftInputFormat } from '~/code/form/action/compile/code/swift/shared/index'

let SwiftInputFormatModel: z.ZodType<SwiftInputFormat>

export const SwiftInputFormatParser = () => {
  if (!SwiftInputFormatModel) {
    SwiftInputFormatModel = z.enum(
      LOAD('swift_input_format') as readonly [string, ...string[]],
    ) as z.ZodType<SwiftInputFormat>
  }
  return SwiftInputFormatModel!
}
