import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  ConvertFontWithFontForgeBrowserInput,
  ConvertFontWithFontForgeBrowserLocalInput,
  ConvertFontWithFontForgeBrowserOutput,
  ConvertFontWithFontForgeBrowserRemoteInput,
} from '~/code/form/action/convert/font-forge/browser/index'
import { FontFormatParser } from '~/code/form/object/font/parsers'
import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/parsers'

let ConvertFontWithFontForgeBrowserInputModel: z.ZodType<ConvertFontWithFontForgeBrowserInput>

export const ConvertFontWithFontForgeBrowserInputParser =
  (): z.ZodType<ConvertFontWithFontForgeBrowserInput> => {
    if (!ConvertFontWithFontForgeBrowserInputModel) {
      ConvertFontWithFontForgeBrowserInputModel = z.union([
        z.lazy(() =>
          ConvertFontWithFontForgeBrowserRemoteInputParser(),
        ),
        z.lazy(() => ConvertFontWithFontForgeBrowserLocalInputParser()),
      ])
    }
    return ConvertFontWithFontForgeBrowserInputModel!
  }

let ConvertFontWithFontForgeBrowserLocalInputModel: z.ZodType<ConvertFontWithFontForgeBrowserLocalInput>

export const ConvertFontWithFontForgeBrowserLocalInputParser =
  (): z.ZodType<ConvertFontWithFontForgeBrowserLocalInput> => {
    if (!ConvertFontWithFontForgeBrowserLocalInputModel) {
      ConvertFontWithFontForgeBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => FontFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.lazy(() => FontFormatParser()),
        }),
      }) as z.ZodType<ConvertFontWithFontForgeBrowserLocalInput>
    }
    return ConvertFontWithFontForgeBrowserLocalInputModel!
  }

let ConvertFontWithFontForgeBrowserOutputModel: z.ZodType<ConvertFontWithFontForgeBrowserOutput>

export const ConvertFontWithFontForgeBrowserOutputParser =
  (): z.ZodType<ConvertFontWithFontForgeBrowserOutput> => {
    if (!ConvertFontWithFontForgeBrowserOutputModel) {
      ConvertFontWithFontForgeBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<ConvertFontWithFontForgeBrowserOutput>
    }
    return ConvertFontWithFontForgeBrowserOutputModel!
  }

let ConvertFontWithFontForgeBrowserRemoteInputModel: z.ZodType<ConvertFontWithFontForgeBrowserRemoteInput>

export const ConvertFontWithFontForgeBrowserRemoteInputParser =
  (): z.ZodType<ConvertFontWithFontForgeBrowserRemoteInput> => {
    if (!ConvertFontWithFontForgeBrowserRemoteInputModel) {
      ConvertFontWithFontForgeBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => FontFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.lazy(() => FontFormatParser()),
        }),
      }) as z.ZodType<ConvertFontWithFontForgeBrowserRemoteInput>
    }
    return ConvertFontWithFontForgeBrowserRemoteInputModel!
  }
