import { TEST } from '@cluesurf/form'
import { z } from 'zod'
import * as code from '~/code/form/code'

import {
  FileContentParser,
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'
import {
  ImageMagicColorMatrixParser,
  ImageMagickColorSpaceParser,
  ImageMagickCompressionParser,
  ImageMagickInputFormatParser,
  ImageMagickOutputFormatParser,
} from '~/code/form/object/imagemagick/take'

export const ConvertImageWithImageMagickNodeClientInputParser =
  z.object({
    handle: z.literal('client'),
    input: z.object({
      format: z.lazy(() => ImageMagickInputFormatParser),
      file: z.union([
        z.lazy(() => FileInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
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

export type ConvertImageWithImageMagickNodeClientInputRecord = z.infer<
  typeof ConvertImageWithImageMagickNodeClientInputParser
>

export const ConvertImageWithImageMagickNodeExternalInputParser =
  z.object({
    handle: z.literal('external'),
    input: z.object({
      format: z.lazy(() => ImageMagickInputFormatParser),
      file: z.union([
        z.lazy(() => RemoteInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
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

export type ConvertImageWithImageMagickNodeExternalInputRecord =
  z.infer<typeof ConvertImageWithImageMagickNodeExternalInputParser>

export const ConvertImageWithImageMagickNodeInputParser = z.union([
  z.lazy(() => ConvertImageWithImageMagickNodeRemoteInputParser),
  z.lazy(() => ConvertImageWithImageMagickNodeLocalExternalInputParser),
  z.lazy(() => ConvertImageWithImageMagickNodeLocalInternalInputParser),
])

export type ConvertImageWithImageMagickNodeInputRecord = z.infer<
  typeof ConvertImageWithImageMagickNodeInputParser
>

export const ConvertImageWithImageMagickNodeLocalExternalInputParser =
  z.object({
    handle: z.literal('external'),
    input: z.object({
      format: z.string(),
      file: z.union([
        z.lazy(() => FilePathParser),
        z.lazy(() => FileContentParser),
      ]),
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

export type ConvertImageWithImageMagickNodeLocalExternalInputRecord =
  z.infer<
    typeof ConvertImageWithImageMagickNodeLocalExternalInputParser
  >

export const ConvertImageWithImageMagickNodeLocalInputParser = z.object(
  {
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
  },
)

export type ConvertImageWithImageMagickNodeLocalInputRecord = z.infer<
  typeof ConvertImageWithImageMagickNodeLocalInputParser
>

export const ConvertImageWithImageMagickNodeLocalInternalInputParser =
  z.object({
    handle: z.optional(z.literal('internal')),
    input: z.object({
      format: z.string(),
      file: z.union([
        z.lazy(() => FilePathParser),
        z.lazy(() => FileContentParser),
      ]),
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

export type ConvertImageWithImageMagickNodeLocalInternalInputRecord =
  z.infer<
    typeof ConvertImageWithImageMagickNodeLocalInternalInputParser
  >

export const ConvertImageWithImageMagickNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type ConvertImageWithImageMagickNodeOutputRecord = z.infer<
  typeof ConvertImageWithImageMagickNodeOutputParser
>

export const ConvertImageWithImageMagickNodeRemoteInputParser =
  z.object({
    handle: z.literal('remote'),
    input: z.object({
      format: z.string(),
      file: z.union([
        z.lazy(() => FilePathParser),
        z.lazy(() => FileContentParser),
      ]),
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

export type ConvertImageWithImageMagickNodeRemoteInputRecord = z.infer<
  typeof ConvertImageWithImageMagickNodeRemoteInputParser
>
