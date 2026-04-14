import { z } from 'zod'

import {
  ConvertLatexToPngInputFormatParser,
  ConvertLatexToPngOutputFormatParser,
} from '~/code/form/action/convert/latex-to-png/shared/take'
import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const ConvertLatexToPngBrowserInputParser = z.union([
  z.lazy(() => ConvertLatexToPngBrowserRemoteInputParser),
  z.lazy(() => ConvertLatexToPngBrowserLocalInputParser),
])

export type ConvertLatexToPngBrowserInputRecord = z.infer<
  typeof ConvertLatexToPngBrowserInputParser
>

export const ConvertLatexToPngBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    format: z.lazy(() => ConvertLatexToPngInputFormatParser),
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
  output: z.object({
    format: z.lazy(() => ConvertLatexToPngOutputFormatParser),
  }),
})

export type ConvertLatexToPngBrowserLocalInputRecord = z.infer<
  typeof ConvertLatexToPngBrowserLocalInputParser
>

export const ConvertLatexToPngBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type ConvertLatexToPngBrowserOutputRecord = z.infer<
  typeof ConvertLatexToPngBrowserOutputParser
>

export const ConvertLatexToPngBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    format: z.lazy(() => ConvertLatexToPngInputFormatParser),
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
  output: z.object({
    format: z.lazy(() => ConvertLatexToPngOutputFormatParser),
  }),
})

export type ConvertLatexToPngBrowserRemoteInputRecord = z.infer<
  typeof ConvertLatexToPngBrowserRemoteInputParser
>
