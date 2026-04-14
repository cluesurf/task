import { z } from 'zod'

import { SwiftInputFormat } from '~/code/form/action/compile/code/swift/shared'
import { SWIFT_INPUT_FORMAT } from '~/code/form/action/compile/code/swift/shared/base'

export const SwiftInputFormatParser = z.enum(
  SWIFT_INPUT_FORMAT as readonly [string, ...string[]],
) as z.ZodType<SwiftInputFormat>
