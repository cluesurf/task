import { z } from 'zod'

import { DataFormat } from '~/code/form/object/data'
import { DATA_FORMAT } from '~/code/form/object/data/base'

export const DataFormatParser = z.enum(
  DATA_FORMAT as readonly [string, ...string[]],
) as z.ZodType<DataFormat>
