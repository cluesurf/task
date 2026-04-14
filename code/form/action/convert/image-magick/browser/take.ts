import { TEST } from '@cluesurf/form'
import { z } from 'zod'
import * as code from '~/code/form/code'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'
import {
  ImageMagicColorMatrixParser,
  ImageMagickColorSpaceParser,
  ImageMagickCompressionParser,
  ImageMagickInputFormatParser,
  ImageMagickOutputFormatParser,
} from '~/code/form/object/image-magick/take'

export const ConvertImageWithImageMagickBrowserInputParser = z.union([
  z.lazy(() => ConvertImageWithImageMagickBrowserRemoteInputParser),
  z.lazy(() => ConvertImageWithImageMagickBrowserLocalInputParser),
])

export type ConvertImageWithImageMagickBrowserInputRecord = z.infer<
  typeof ConvertImageWithImageMagickBrowserInputParser
>

export const ConvertImageWithImageMagickBrowserLocalInputParser =
  z.object({
    handle: z.optional(z.literal('local')),
    input: z.object({
      format: z.lazy(() => ImageMagickInputFormatParser),
      file: z.object({
        content: z.lazy(() => FileContentParser),
      }),
    }),
    output: z.object({
      format: z.lazy(() => ImageMagickOutputFormatParser),
    }),
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

export type ConvertImageWithImageMagickBrowserLocalInputRecord =
  z.infer<typeof ConvertImageWithImageMagickBrowserLocalInputParser>

export const ConvertImageWithImageMagickBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type ConvertImageWithImageMagickBrowserOutputRecord = z.infer<
  typeof ConvertImageWithImageMagickBrowserOutputParser
>

export const ConvertImageWithImageMagickBrowserRemoteInputParser =
  z.object({
    handle: z.literal('remote'),
    input: z.object({
      format: z.lazy(() => ImageMagickInputFormatParser),
      file: z.lazy(() => FileContentWithSha256Parser),
    }),
    output: z.object({
      format: z.lazy(() => ImageMagickOutputFormatParser),
    }),
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

export type ConvertImageWithImageMagickBrowserRemoteInputRecord =
  z.infer<typeof ConvertImageWithImageMagickBrowserRemoteInputParser>
