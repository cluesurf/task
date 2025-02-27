import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  ConvertImageWithInkscapeBrowserInput,
  ConvertImageWithInkscapeBrowserLocalInput,
  ConvertImageWithInkscapeBrowserOutput,
  ConvertImageWithInkscapeBrowserRemoteInput,
} from '~/code/type/action/convert/inkscape/browser/index'
import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/type/object/file/parsers'

let ConvertImageWithInkscapeBrowserInputModel: z.ZodType<ConvertImageWithInkscapeBrowserInput>

export const ConvertImageWithInkscapeBrowserInputParser =
  (): z.ZodType<ConvertImageWithInkscapeBrowserInput> => {
    if (!ConvertImageWithInkscapeBrowserInputModel) {
      ConvertImageWithInkscapeBrowserInputModel = z.union([
        z.lazy(() =>
          ConvertImageWithInkscapeBrowserRemoteInputParser(),
        ),
        z.lazy(() => ConvertImageWithInkscapeBrowserLocalInputParser()),
      ])
    }
    return ConvertImageWithInkscapeBrowserInputModel!
  }

let ConvertImageWithInkscapeBrowserLocalInputModel: z.ZodType<ConvertImageWithInkscapeBrowserLocalInput>

export const ConvertImageWithInkscapeBrowserLocalInputParser =
  (): z.ZodType<ConvertImageWithInkscapeBrowserLocalInput> => {
    if (!ConvertImageWithInkscapeBrowserLocalInputModel) {
      ConvertImageWithInkscapeBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.string(),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.string(),
        }),
      }) as z.ZodType<ConvertImageWithInkscapeBrowserLocalInput>
    }
    return ConvertImageWithInkscapeBrowserLocalInputModel!
  }

let ConvertImageWithInkscapeBrowserOutputModel: z.ZodType<ConvertImageWithInkscapeBrowserOutput>

export const ConvertImageWithInkscapeBrowserOutputParser =
  (): z.ZodType<ConvertImageWithInkscapeBrowserOutput> => {
    if (!ConvertImageWithInkscapeBrowserOutputModel) {
      ConvertImageWithInkscapeBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<ConvertImageWithInkscapeBrowserOutput>
    }
    return ConvertImageWithInkscapeBrowserOutputModel!
  }

let ConvertImageWithInkscapeBrowserRemoteInputModel: z.ZodType<ConvertImageWithInkscapeBrowserRemoteInput>

export const ConvertImageWithInkscapeBrowserRemoteInputParser =
  (): z.ZodType<ConvertImageWithInkscapeBrowserRemoteInput> => {
    if (!ConvertImageWithInkscapeBrowserRemoteInputModel) {
      ConvertImageWithInkscapeBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.string(),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.string(),
        }),
      }) as z.ZodType<ConvertImageWithInkscapeBrowserRemoteInput>
    }
    return ConvertImageWithInkscapeBrowserRemoteInputModel!
  }
