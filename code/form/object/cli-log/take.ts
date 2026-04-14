import { z } from 'zod'

import { CliLogFormat } from '~/code/form/object/cli-log'
import { CLI_LOG_FORMAT } from '~/code/form/object/cli-log/base'

export const CliLogFormatParser = z.enum(
  CLI_LOG_FORMAT as readonly [string, ...string[]],
) as z.ZodType<CliLogFormat>
