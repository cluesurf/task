import { z } from 'zod'

import { DecryptFileTool } from '~/code/form/action/decrypt/file/shared'
import { DECRYPT_FILE_TOOL } from '~/code/form/action/decrypt/file/shared/base'

export const DecryptFileToolParser = z.enum(
  DECRYPT_FILE_TOOL as readonly [string, ...string[]],
) as z.ZodType<DecryptFileTool>
