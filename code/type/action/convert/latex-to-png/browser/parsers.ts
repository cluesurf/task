import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  ConvertLatexToPngBrowserInput,
  ConvertLatexToPngBrowserLocalInput,
  ConvertLatexToPngBrowserOutput,
  ConvertLatexToPngBrowserRemoteInput,
} from '~/code/type/action/convert/latex-to-png/browser/index'
import {
  ConvertLatexToPngInputFormatParser,
  ConvertLatexToPngOutputFormatParser,
} from '~/code/type/action/convert/latex-to-png/shared/parsers'
import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/type/object/file/parsers'

let ConvertLatexToPngBrowserInputModel: z.ZodType<ConvertLatexToPngBrowserInput>

export const ConvertLatexToPngBrowserInputParser =
  (): z.ZodType<ConvertLatexToPngBrowserInput> => {
    if (!ConvertLatexToPngBrowserInputModel) {
      ConvertLatexToPngBrowserInputModel = z.union([
        z.lazy(() => ConvertLatexToPngBrowserRemoteInputParser()),
        z.lazy(() => ConvertLatexToPngBrowserLocalInputParser()),
      ])
    }
    return ConvertLatexToPngBrowserInputModel!
  }

let ConvertLatexToPngBrowserLocalInputModel: z.ZodType<ConvertLatexToPngBrowserLocalInput>

export const ConvertLatexToPngBrowserLocalInputParser =
  (): z.ZodType<ConvertLatexToPngBrowserLocalInput> => {
    if (!ConvertLatexToPngBrowserLocalInputModel) {
      ConvertLatexToPngBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => ConvertLatexToPngInputFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.lazy(() => ConvertLatexToPngOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertLatexToPngBrowserLocalInput>
    }
    return ConvertLatexToPngBrowserLocalInputModel!
  }

let ConvertLatexToPngBrowserOutputModel: z.ZodType<ConvertLatexToPngBrowserOutput>

export const ConvertLatexToPngBrowserOutputParser =
  (): z.ZodType<ConvertLatexToPngBrowserOutput> => {
    if (!ConvertLatexToPngBrowserOutputModel) {
      ConvertLatexToPngBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<ConvertLatexToPngBrowserOutput>
    }
    return ConvertLatexToPngBrowserOutputModel!
  }

let ConvertLatexToPngBrowserRemoteInputModel: z.ZodType<ConvertLatexToPngBrowserRemoteInput>

export const ConvertLatexToPngBrowserRemoteInputParser =
  (): z.ZodType<ConvertLatexToPngBrowserRemoteInput> => {
    if (!ConvertLatexToPngBrowserRemoteInputModel) {
      ConvertLatexToPngBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => ConvertLatexToPngInputFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.lazy(() => ConvertLatexToPngOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertLatexToPngBrowserRemoteInput>
    }
    return ConvertLatexToPngBrowserRemoteInputModel!
  }
