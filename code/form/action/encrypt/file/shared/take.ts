import { z } from 'zod'

import { EncryptFileTool } from '~/code/form/action/encrypt/file/shared'
import { ENCRYPT_FILE_TOOL } from '~/code/form/action/encrypt/file/shared/base'

export const EncryptFileToolParser = z.enum(
  ENCRYPT_FILE_TOOL as readonly [string, ...string[]],
) as z.ZodType<EncryptFileTool>
