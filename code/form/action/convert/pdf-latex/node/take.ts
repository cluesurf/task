import { z } from 'zod'

import {
  PdfLatexInputFormatParser,
  PdfLatexOutputFormatParser,
} from '~/code/form/action/convert/pdf-latex/shared/take'
import {
  FileContentParser,
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const ConvertLatexWithPdfLatexNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    format: z.lazy(() => PdfLatexInputFormatParser),
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => PdfLatexOutputFormatParser),
  }),
})

export type ConvertLatexWithPdfLatexNodeClientInputRecord = z.infer<
  typeof ConvertLatexWithPdfLatexNodeClientInputParser
>

export const ConvertLatexWithPdfLatexNodeExternalInputParser = z.object(
  {
    handle: z.literal('external'),
    input: z.object({
      format: z.lazy(() => PdfLatexInputFormatParser),
      file: z.union([
        z.lazy(() => RemoteInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    output: z.object({
      format: z.lazy(() => PdfLatexOutputFormatParser),
    }),
  },
)

export type ConvertLatexWithPdfLatexNodeExternalInputRecord = z.infer<
  typeof ConvertLatexWithPdfLatexNodeExternalInputParser
>

export const ConvertLatexWithPdfLatexNodeInputParser = z.union([
  z.lazy(() => ConvertLatexWithPdfLatexNodeRemoteInputParser),
  z.lazy(() => ConvertLatexWithPdfLatexNodeLocalExternalInputParser),
  z.lazy(() => ConvertLatexWithPdfLatexNodeLocalInternalInputParser),
])

export type ConvertLatexWithPdfLatexNodeInputRecord = z.infer<
  typeof ConvertLatexWithPdfLatexNodeInputParser
>

export const ConvertLatexWithPdfLatexNodeLocalExternalInputParser =
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
  })

export type ConvertLatexWithPdfLatexNodeLocalExternalInputRecord =
  z.infer<typeof ConvertLatexWithPdfLatexNodeLocalExternalInputParser>

export const ConvertLatexWithPdfLatexNodeLocalInputParser = z.object({
  input: z.object({
    format: z.string(),
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    format: z.string(),
    directory: z.lazy(() => LocalPathParser),
    file: z.optional(z.lazy(() => LocalPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type ConvertLatexWithPdfLatexNodeLocalInputRecord = z.infer<
  typeof ConvertLatexWithPdfLatexNodeLocalInputParser
>

export const ConvertLatexWithPdfLatexNodeLocalInternalInputParser =
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
      directory: z.optional(z.lazy(() => LocalOutputPathParser)),
      file: z.optional(z.lazy(() => LocalPathParser)),
    }),
    pathScope: z.optional(z.string()),
  })

export type ConvertLatexWithPdfLatexNodeLocalInternalInputRecord =
  z.infer<typeof ConvertLatexWithPdfLatexNodeLocalInternalInputParser>

export const ConvertLatexWithPdfLatexNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type ConvertLatexWithPdfLatexNodeOutputRecord = z.infer<
  typeof ConvertLatexWithPdfLatexNodeOutputParser
>

export const ConvertLatexWithPdfLatexNodeRemoteInputParser = z.object({
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
    directory: z.optional(z.lazy(() => LocalOutputPathParser)),
    file: z.optional(z.lazy(() => LocalPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type ConvertLatexWithPdfLatexNodeRemoteInputRecord = z.infer<
  typeof ConvertLatexWithPdfLatexNodeRemoteInputParser
>
