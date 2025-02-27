import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import { InspectMetadataFromImage } from '~/code/type/action/inspect/metadata/shared/index'

let InspectMetadataFromImageModel: z.ZodType<InspectMetadataFromImage>

export const InspectMetadataFromImageParser =
  (): z.ZodType<InspectMetadataFromImage> => {
    if (!InspectMetadataFromImageModel) {
      InspectMetadataFromImageModel = z.object({
        input: z.object({
          format: z.string(),
          file: z.object({
            path: z.string(),
          }),
        }),
        copyright: z.optional(z.string()),
        creator: z.optional(z.string()),
        license: z.optional(z.string()),
        keywords: z.optional(z.array(z.string())),
        artist: z.optional(z.string()),
        originalDate: z.optional(z.coerce.date()),
        allDates: z.optional(z.coerce.date()),
        creationDate: z.optional(z.coerce.date()),
        title: z.optional(z.string()),
        description: z.optional(z.string()),
      }) as z.ZodType<InspectMetadataFromImage>
    }
    return InspectMetadataFromImageModel!
  }
