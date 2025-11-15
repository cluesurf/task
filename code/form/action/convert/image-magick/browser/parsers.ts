import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  ConvertImageWithImageMagickBrowserInput,
  ConvertImageWithImageMagickBrowserLocalInput,
  ConvertImageWithImageMagickBrowserOutput,
  ConvertImageWithImageMagickBrowserRemoteInput,
} from '~/code/form/action/convert/image-magick/browser/index'
import {
  ImageMagicColorMatrixParser,
  ImageMagickColorSpaceParser,
  ImageMagickCompressionParser,
  ImageMagickInputFormatParser,
  ImageMagickOutputFormatParser,
} from '~/code/form/object/image-magick/parsers'
import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/parsers'

let ConvertImageWithImageMagickBrowserInputModel: z.ZodType<ConvertImageWithImageMagickBrowserInput>

export const ConvertImageWithImageMagickBrowserInputParser =
  (): z.ZodType<ConvertImageWithImageMagickBrowserInput> => {
    if (!ConvertImageWithImageMagickBrowserInputModel) {
      ConvertImageWithImageMagickBrowserInputModel = z.union([
        z.lazy(() =>
          ConvertImageWithImageMagickBrowserRemoteInputParser(),
        ),
        z.lazy(() =>
          ConvertImageWithImageMagickBrowserLocalInputParser(),
        ),
      ])
    }
    return ConvertImageWithImageMagickBrowserInputModel!
  }

let ConvertImageWithImageMagickBrowserLocalInputModel: z.ZodType<ConvertImageWithImageMagickBrowserLocalInput>

export const ConvertImageWithImageMagickBrowserLocalInputParser =
  (): z.ZodType<ConvertImageWithImageMagickBrowserLocalInput> => {
    if (!ConvertImageWithImageMagickBrowserLocalInputModel) {
      ConvertImageWithImageMagickBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => ImageMagickInputFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.lazy(() => ImageMagickOutputFormatParser()),
        }),
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
      }) as z.ZodType<ConvertImageWithImageMagickBrowserLocalInput>
    }
    return ConvertImageWithImageMagickBrowserLocalInputModel!
  }

let ConvertImageWithImageMagickBrowserOutputModel: z.ZodType<ConvertImageWithImageMagickBrowserOutput>

export const ConvertImageWithImageMagickBrowserOutputParser =
  (): z.ZodType<ConvertImageWithImageMagickBrowserOutput> => {
    if (!ConvertImageWithImageMagickBrowserOutputModel) {
      ConvertImageWithImageMagickBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<ConvertImageWithImageMagickBrowserOutput>
    }
    return ConvertImageWithImageMagickBrowserOutputModel!
  }

let ConvertImageWithImageMagickBrowserRemoteInputModel: z.ZodType<ConvertImageWithImageMagickBrowserRemoteInput>

export const ConvertImageWithImageMagickBrowserRemoteInputParser =
  (): z.ZodType<ConvertImageWithImageMagickBrowserRemoteInput> => {
    if (!ConvertImageWithImageMagickBrowserRemoteInputModel) {
      ConvertImageWithImageMagickBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => ImageMagickInputFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.lazy(() => ImageMagickOutputFormatParser()),
        }),
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
      }) as z.ZodType<ConvertImageWithImageMagickBrowserRemoteInput>
    }
    return ConvertImageWithImageMagickBrowserRemoteInputModel!
  }
