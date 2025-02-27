import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import { VerifyImageWithImageMagick } from '~/code/type/action/verify/image/shared/index'
import { ImageMagickFormatParser } from '~/code/type/object/image-magick/parsers'

let VerifyImageWithImageMagickModel: z.ZodType<VerifyImageWithImageMagick>

export const VerifyImageWithImageMagickParser =
  (): z.ZodType<VerifyImageWithImageMagick> => {
    if (!VerifyImageWithImageMagickModel) {
      VerifyImageWithImageMagickModel = z.object({
        format: z.lazy(() => ImageMagickFormatParser()),
        file: z.object({
          path: z.string(),
        }),
      }) as z.ZodType<VerifyImageWithImageMagick>
    }
    return VerifyImageWithImageMagickModel!
  }
