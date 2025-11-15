import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  ConvertLatexWithPdfLatexBrowserInput,
  ConvertLatexWithPdfLatexBrowserLocalInput,
  ConvertLatexWithPdfLatexBrowserOutput,
  ConvertLatexWithPdfLatexBrowserRemoteInput,
} from '~/code/form/action/convert/pdf-latex/browser/index'
import {
  PdfLatexInputFormatParser,
  PdfLatexOutputFormatParser,
} from '~/code/form/action/convert/pdf-latex/shared/parsers'
import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/parsers'

let ConvertLatexWithPdfLatexBrowserInputModel: z.ZodType<ConvertLatexWithPdfLatexBrowserInput>

export const ConvertLatexWithPdfLatexBrowserInputParser =
  (): z.ZodType<ConvertLatexWithPdfLatexBrowserInput> => {
    if (!ConvertLatexWithPdfLatexBrowserInputModel) {
      ConvertLatexWithPdfLatexBrowserInputModel = z.union([
        z.lazy(() =>
          ConvertLatexWithPdfLatexBrowserRemoteInputParser(),
        ),
        z.lazy(() => ConvertLatexWithPdfLatexBrowserLocalInputParser()),
      ])
    }
    return ConvertLatexWithPdfLatexBrowserInputModel!
  }

let ConvertLatexWithPdfLatexBrowserLocalInputModel: z.ZodType<ConvertLatexWithPdfLatexBrowserLocalInput>

export const ConvertLatexWithPdfLatexBrowserLocalInputParser =
  (): z.ZodType<ConvertLatexWithPdfLatexBrowserLocalInput> => {
    if (!ConvertLatexWithPdfLatexBrowserLocalInputModel) {
      ConvertLatexWithPdfLatexBrowserLocalInputModel = z.object({
        handle: z.optional(z.literal('local')),
        input: z.object({
          format: z.lazy(() => PdfLatexInputFormatParser()),
          file: z.object({
            content: z.lazy(() => FileContentParser()),
          }),
        }),
        output: z.object({
          format: z.lazy(() => PdfLatexOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertLatexWithPdfLatexBrowserLocalInput>
    }
    return ConvertLatexWithPdfLatexBrowserLocalInputModel!
  }

let ConvertLatexWithPdfLatexBrowserOutputModel: z.ZodType<ConvertLatexWithPdfLatexBrowserOutput>

export const ConvertLatexWithPdfLatexBrowserOutputParser =
  (): z.ZodType<ConvertLatexWithPdfLatexBrowserOutput> => {
    if (!ConvertLatexWithPdfLatexBrowserOutputModel) {
      ConvertLatexWithPdfLatexBrowserOutputModel = z.object({
        file: z.lazy(() => FileContentParser()),
      }) as z.ZodType<ConvertLatexWithPdfLatexBrowserOutput>
    }
    return ConvertLatexWithPdfLatexBrowserOutputModel!
  }

let ConvertLatexWithPdfLatexBrowserRemoteInputModel: z.ZodType<ConvertLatexWithPdfLatexBrowserRemoteInput>

export const ConvertLatexWithPdfLatexBrowserRemoteInputParser =
  (): z.ZodType<ConvertLatexWithPdfLatexBrowserRemoteInput> => {
    if (!ConvertLatexWithPdfLatexBrowserRemoteInputModel) {
      ConvertLatexWithPdfLatexBrowserRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => PdfLatexInputFormatParser()),
          file: z.lazy(() => FileContentWithSha256Parser()),
        }),
        output: z.object({
          format: z.lazy(() => PdfLatexOutputFormatParser()),
        }),
      }) as z.ZodType<ConvertLatexWithPdfLatexBrowserRemoteInput>
    }
    return ConvertLatexWithPdfLatexBrowserRemoteInputModel!
  }
