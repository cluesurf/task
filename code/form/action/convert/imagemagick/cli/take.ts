import { TEST } from '@cluesurf/form'
import { z } from 'zod'
import * as code from '~/code/form/code'

import { LocalPathParser } from '~/code/form/object/file/take'
import {
  ImageMagicColorMatrixParser,
  ImageMagickColorSpaceParser,
  ImageMagickCompressionParser,
} from '~/code/form/object/imagemagick/take'

export const ConvertImageWithImageMagickCommandInputParser = z.object({
  input: z.object({
    format: z.string(),
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    format: z.string(),
    file: z.optional(z.lazy(() => LocalPathParser)),
  }),
  pathScope: z.optional(z.string()),
  colorCount: z.optional(z.number().int().gte(0)),
  colorMatrix: z.optional(
    z
      .lazy(() => ImageMagicColorMatrixParser)
      .refine(
        TEST('colorMatrix', code.test_image_magic_color_matrix.test),
      ),
  ),
  colorSpace: z.optional(z.lazy(() => ImageMagickColorSpaceParser)),
  compare: z.optional(z.boolean()),
  compression: z.optional(z.lazy(() => ImageMagickCompressionParser)),
  density: z.optional(z.number().int().gte(0)),
  quality: z.optional(z.number().int().gte(0)),
})

export type ConvertImageWithImageMagickCommandInputRecord = z.infer<
  typeof ConvertImageWithImageMagickCommandInputParser
>
