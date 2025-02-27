import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  ConvertImageWithImageMagickNodeClientInput,
  ConvertImageWithImageMagickNodeExternalInput,
  ConvertImageWithImageMagickNodeInput,
  ConvertImageWithImageMagickNodeLocalExternalInput,
  ConvertImageWithImageMagickNodeLocalInput,
  ConvertImageWithImageMagickNodeLocalInternalInput,
  ConvertImageWithImageMagickNodeOutput,
  ConvertImageWithImageMagickNodeRemoteInput,
} from '~/code/type/action/convert/image-magick/node/index'
import {
  ImageMagicColorMatrixParser,
  ImageMagickColorSpaceParser,
  ImageMagickCompressionParser,
  ImageMagickInputFormatParser,
  ImageMagickOutputFormatParser,
} from '~/code/type/object/image-magick/parsers'
import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/type/object/file/parsers'

let ConvertImageWithImageMagickNodeClientInputModel: z.ZodType<ConvertImageWithImageMagickNodeClientInput>

export const ConvertImageWithImageMagickNodeClientInputParser =
  (): z.ZodType<ConvertImageWithImageMagickNodeClientInput> => {
    if (!ConvertImageWithImageMagickNodeClientInputModel) {
      ConvertImageWithImageMagickNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => ImageMagickInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
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
      }) as z.ZodType<ConvertImageWithImageMagickNodeClientInput>
    }
    return ConvertImageWithImageMagickNodeClientInputModel!
  }

let ConvertImageWithImageMagickNodeExternalInputModel: z.ZodType<ConvertImageWithImageMagickNodeExternalInput>

export const ConvertImageWithImageMagickNodeExternalInputParser =
  (): z.ZodType<ConvertImageWithImageMagickNodeExternalInput> => {
    if (!ConvertImageWithImageMagickNodeExternalInputModel) {
      ConvertImageWithImageMagickNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => ImageMagickInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
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
      }) as z.ZodType<ConvertImageWithImageMagickNodeExternalInput>
    }
    return ConvertImageWithImageMagickNodeExternalInputModel!
  }

let ConvertImageWithImageMagickNodeInputModel: z.ZodType<ConvertImageWithImageMagickNodeInput>

export const ConvertImageWithImageMagickNodeInputParser =
  (): z.ZodType<ConvertImageWithImageMagickNodeInput> => {
    if (!ConvertImageWithImageMagickNodeInputModel) {
      ConvertImageWithImageMagickNodeInputModel = z.union([
        z.lazy(() =>
          ConvertImageWithImageMagickNodeRemoteInputParser(),
        ),
        z.lazy(() =>
          ConvertImageWithImageMagickNodeLocalExternalInputParser(),
        ),
        z.lazy(() =>
          ConvertImageWithImageMagickNodeLocalInternalInputParser(),
        ),
      ])
    }
    return ConvertImageWithImageMagickNodeInputModel!
  }

let ConvertImageWithImageMagickNodeLocalExternalInputModel: z.ZodType<ConvertImageWithImageMagickNodeLocalExternalInput>

export const ConvertImageWithImageMagickNodeLocalExternalInputParser =
  (): z.ZodType<ConvertImageWithImageMagickNodeLocalExternalInput> => {
    if (!ConvertImageWithImageMagickNodeLocalExternalInputModel) {
      ConvertImageWithImageMagickNodeLocalExternalInputModel = z.object(
        {
          handle: z.literal('external'),
          input: z.object({
            format: z.lazy(() => ImageMagickInputFormatParser()),
            file: z.union([
              z.lazy(() => RemoteInputPathParser()),
              z.lazy(() => FileContentWithSha256Parser()),
            ]),
          }),
          output: z.object({
            format: z.lazy(() => ImageMagickOutputFormatParser()),
            file: z.optional(z.lazy(() => LocalOutputPathParser())),
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
        },
      ) as z.ZodType<ConvertImageWithImageMagickNodeLocalExternalInput>
    }
    return ConvertImageWithImageMagickNodeLocalExternalInputModel!
  }

let ConvertImageWithImageMagickNodeLocalInputModel: z.ZodType<ConvertImageWithImageMagickNodeLocalInput>

export const ConvertImageWithImageMagickNodeLocalInputParser =
  (): z.ZodType<ConvertImageWithImageMagickNodeLocalInput> => {
    if (!ConvertImageWithImageMagickNodeLocalInputModel) {
      ConvertImageWithImageMagickNodeLocalInputModel = z.object({
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
      }) as z.ZodType<ConvertImageWithImageMagickNodeLocalInput>
    }
    return ConvertImageWithImageMagickNodeLocalInputModel!
  }

let ConvertImageWithImageMagickNodeLocalInternalInputModel: z.ZodType<ConvertImageWithImageMagickNodeLocalInternalInput>

export const ConvertImageWithImageMagickNodeLocalInternalInputParser =
  (): z.ZodType<ConvertImageWithImageMagickNodeLocalInternalInput> => {
    if (!ConvertImageWithImageMagickNodeLocalInternalInputModel) {
      ConvertImageWithImageMagickNodeLocalInternalInputModel = z.object(
        {
          handle: z.optional(z.literal('internal')),
          input: z.object({
            format: z.lazy(() => ImageMagickInputFormatParser()),
            file: z.union([
              z.lazy(() => FileInputPathParser()),
              z.lazy(() => FileContentWithSha256Parser()),
            ]),
          }),
          output: z.object({
            format: z.lazy(() => ImageMagickOutputFormatParser()),
            file: z.optional(z.lazy(() => LocalOutputPathParser())),
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
        },
      ) as z.ZodType<ConvertImageWithImageMagickNodeLocalInternalInput>
    }
    return ConvertImageWithImageMagickNodeLocalInternalInputModel!
  }

let ConvertImageWithImageMagickNodeOutputModel: z.ZodType<ConvertImageWithImageMagickNodeOutput>

export const ConvertImageWithImageMagickNodeOutputParser =
  (): z.ZodType<ConvertImageWithImageMagickNodeOutput> => {
    if (!ConvertImageWithImageMagickNodeOutputModel) {
      ConvertImageWithImageMagickNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<ConvertImageWithImageMagickNodeOutput>
    }
    return ConvertImageWithImageMagickNodeOutputModel!
  }

let ConvertImageWithImageMagickNodeRemoteInputModel: z.ZodType<ConvertImageWithImageMagickNodeRemoteInput>

export const ConvertImageWithImageMagickNodeRemoteInputParser =
  (): z.ZodType<ConvertImageWithImageMagickNodeRemoteInput> => {
    if (!ConvertImageWithImageMagickNodeRemoteInputModel) {
      ConvertImageWithImageMagickNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => ImageMagickInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => ImageMagickOutputFormatParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
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
      }) as z.ZodType<ConvertImageWithImageMagickNodeRemoteInput>
    }
    return ConvertImageWithImageMagickNodeRemoteInputModel!
  }
