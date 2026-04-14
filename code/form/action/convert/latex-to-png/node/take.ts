import { z } from 'zod'

import {
  ConvertLatexToPngInputFormatParser,
  ConvertLatexToPngOutputFormatParser,
} from '~/code/form/action/convert/latex-to-png/shared/take'
import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const ConvertLatexToPngNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    format: z.lazy(() => ConvertLatexToPngInputFormatParser),
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => ConvertLatexToPngOutputFormatParser),
  }),
})

export type ConvertLatexToPngNodeClientInputRecord = z.infer<
  typeof ConvertLatexToPngNodeClientInputParser
>

export const ConvertLatexToPngNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    format: z.lazy(() => ConvertLatexToPngInputFormatParser),
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => ConvertLatexToPngOutputFormatParser),
  }),
})

export type ConvertLatexToPngNodeExternalInputRecord = z.infer<
  typeof ConvertLatexToPngNodeExternalInputParser
>

export const ConvertLatexToPngNodeInputParser = z.union([
  z.lazy(() => ConvertLatexToPngNodeRemoteInputParser),
  z.lazy(() => ConvertLatexToPngNodeLocalExternalInputParser),
  z.lazy(() => ConvertLatexToPngNodeLocalInternalInputParser),
])

export type ConvertLatexToPngNodeInputRecord = z.infer<
  typeof ConvertLatexToPngNodeInputParser
>

export const ConvertLatexToPngNodeLocalExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    format: z.lazy(() => ConvertLatexToPngInputFormatParser),
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => ConvertLatexToPngOutputFormatParser),
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type ConvertLatexToPngNodeLocalExternalInputRecord = z.infer<
  typeof ConvertLatexToPngNodeLocalExternalInputParser
>

export const ConvertLatexToPngNodeLocalInputParser = z.object({
  input: z.object({
    format: z.lazy(() => ConvertLatexToPngInputFormatParser),
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    format: z.lazy(() => ConvertLatexToPngOutputFormatParser),
    file: z.lazy(() => LocalPathParser),
  }),
  pathScope: z.optional(z.string()),
})

export type ConvertLatexToPngNodeLocalInputRecord = z.infer<
  typeof ConvertLatexToPngNodeLocalInputParser
>

export const ConvertLatexToPngNodeLocalInternalInputParser = z.object({
  handle: z.optional(z.literal('internal')),
  input: z.object({
    format: z.lazy(() => ConvertLatexToPngInputFormatParser),
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => ConvertLatexToPngOutputFormatParser),
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type ConvertLatexToPngNodeLocalInternalInputRecord = z.infer<
  typeof ConvertLatexToPngNodeLocalInternalInputParser
>

export const ConvertLatexToPngNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type ConvertLatexToPngNodeOutputRecord = z.infer<
  typeof ConvertLatexToPngNodeOutputParser
>

export const ConvertLatexToPngNodeRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    format: z.lazy(() => ConvertLatexToPngInputFormatParser),
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => ConvertLatexToPngOutputFormatParser),
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type ConvertLatexToPngNodeRemoteInputRecord = z.infer<
  typeof ConvertLatexToPngNodeRemoteInputParser
>
