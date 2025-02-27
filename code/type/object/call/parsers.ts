import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import { CallHandle } from '~/code/type/object/call/index'

let CallHandleModel: z.ZodType<CallHandle>

export const CallHandleParser = () => {
  if (!CallHandleModel) {
    CallHandleModel = z.enum(
      LOAD('call_handle') as readonly [string, ...string[]],
    ) as z.ZodType<CallHandle>
  }
  return CallHandleModel!
}
