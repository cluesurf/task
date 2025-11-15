import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import { CliLogFormat } from '~/code/form/object/cli-log/index'

let CliLogFormatModel: z.ZodType<CliLogFormat>

export const CliLogFormatParser = () => {
  if (!CliLogFormatModel) {
    CliLogFormatModel = z.enum(
      LOAD('cli_log_format') as readonly [string, ...string[]],
    ) as z.ZodType<CliLogFormat>
  }
  return CliLogFormatModel!
}
