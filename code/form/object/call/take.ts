import { z } from 'zod'

import { CallHandle } from '~/code/form/object/call'
import { CALL_HANDLE } from '~/code/form/object/call/base'

export const CallHandleParser = z.enum(
  CALL_HANDLE as readonly [string, ...string[]],
) as z.ZodType<CallHandle>
