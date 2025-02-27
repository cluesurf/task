import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import { ConvertImageWithImageMagickCommandInput } from '~/code/type/action/convert/image-magick/cli/index'
import {
  ImageMagicColorMatrixParser,
  ImageMagickColorSpaceParser,
  ImageMagickCompressionParser,
  ImageMagickInputFormatParser,
  ImageMagickOutputFormatParser,
} from '~/code/type/object/image-magick/parsers'
import { LocalPathParser } from '~/code/type/object/file/parsers'

let ConvertImageWithImageMagickCommandInputModel: z.ZodType<ConvertImageWithImageMagickCommandInput>

export const ConvertImageWithImageMagickCommandInputParser =
  (): z.ZodType<ConvertImageWithImageMagickCommandInput> => {
    if (!ConvertImageWithImageMagickCommandInputModel) {
      ConvertImageWithImageMagickCommandInputModel = z.object({
        input: z.object({
          format: z.lazy(() => ImageMagickInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => ImageMagickOutputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
        colorCount: z.optional(z.number().int().gte(0)),
        colorMatrix: z.optional(
          z
            .lazy(() => ImageMagicColorMatrixParser())
            .refine(
              TEST(
                'colorMatrix',
                code.test_image_magic_color_matrix.test,
              ),
            ),
        ),
        colorSpace: z.optional(
          z.lazy(() => ImageMagickColorSpaceParser()),
        ),
        compare: z.optional(z.boolean()),
        compression: z.optional(
          z.lazy(() => ImageMagickCompressionParser()),
        ),
        density: z.optional(z.number().int().gte(0)),
        quality: z.optional(z.number().int().gte(0)),
      }) as z.ZodType<ConvertImageWithImageMagickCommandInput>
    }
    return ConvertImageWithImageMagickCommandInputModel!
  }
