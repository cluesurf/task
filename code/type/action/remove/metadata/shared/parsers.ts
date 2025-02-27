import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import { RemoveImageMetadata } from '~/code/type/action/remove/metadata/shared/index'

let RemoveImageMetadataModel: z.ZodType<RemoveImageMetadata>

export const RemoveImageMetadataParser =
  (): z.ZodType<RemoveImageMetadata> => {
    if (!RemoveImageMetadataModel) {
      RemoveImageMetadataModel = z.object({
        input: z.object({
          format: z.string(),
          file: z.object({
            path: z.string(),
          }),
        }),
      }) as z.ZodType<RemoveImageMetadata>
    }
    return RemoveImageMetadataModel!
  }
