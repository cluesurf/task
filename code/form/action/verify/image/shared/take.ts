import { z } from 'zod'

import { ImageMagickFormatParser } from '~/code/form/object/image-magick/take'

export const VerifyImageWithImageMagickParser = z.object({
  format: z.lazy(() => ImageMagickFormatParser),
  file: z.object({
    path: z.string(),
  }),
})

export type VerifyImageWithImageMagickRecord = z.infer<
  typeof VerifyImageWithImageMagickParser
>
