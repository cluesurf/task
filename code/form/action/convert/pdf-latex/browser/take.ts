import { z } from 'zod'

import {
  PdfLatexInputFormatParser,
  PdfLatexOutputFormatParser,
} from '~/code/form/action/convert/pdf-latex/shared/take'
import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const ConvertLatexWithPdfLatexBrowserInputParser = z.union([
  z.lazy(() => ConvertLatexWithPdfLatexBrowserRemoteInputParser),
  z.lazy(() => ConvertLatexWithPdfLatexBrowserLocalInputParser),
])

export type ConvertLatexWithPdfLatexBrowserInputRecord = z.infer<
  typeof ConvertLatexWithPdfLatexBrowserInputParser
>

export const ConvertLatexWithPdfLatexBrowserLocalInputParser = z.object(
  {
    handle: z.optional(z.literal('local')),
    input: z.object({
      format: z.lazy(() => PdfLatexInputFormatParser),
      file: z.object({
        content: z.lazy(() => FileContentParser),
      }),
    }),
    output: z.object({
      format: z.lazy(() => PdfLatexOutputFormatParser),
    }),
  },
)

export type ConvertLatexWithPdfLatexBrowserLocalInputRecord = z.infer<
  typeof ConvertLatexWithPdfLatexBrowserLocalInputParser
>

export const ConvertLatexWithPdfLatexBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type ConvertLatexWithPdfLatexBrowserOutputRecord = z.infer<
  typeof ConvertLatexWithPdfLatexBrowserOutputParser
>

export const ConvertLatexWithPdfLatexBrowserRemoteInputParser =
  z.object({
    handle: z.literal('remote'),
    input: z.object({
      format: z.lazy(() => PdfLatexInputFormatParser),
      file: z.lazy(() => FileContentWithSha256Parser),
    }),
    output: z.object({
      format: z.lazy(() => PdfLatexOutputFormatParser),
    }),
  })

export type ConvertLatexWithPdfLatexBrowserRemoteInputRecord = z.infer<
  typeof ConvertLatexWithPdfLatexBrowserRemoteInputParser
>
