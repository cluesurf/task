import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const ConvertImageWithAutotraceNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  outputFormat: z.optional(z.string()),
  colors: z.optional(z.number().int().gte(0)),
  despeckleLevel: z.optional(z.number().int().gte(0)),
})

export type ConvertImageWithAutotraceNodeClientInputRecord = z.infer<
  typeof ConvertImageWithAutotraceNodeClientInputParser
>

export const ConvertImageWithAutotraceNodeExternalInputParser =
  z.object({
    handle: z.literal('external'),
    input: z.object({
      file: z.union([
        z.lazy(() => RemoteInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    outputFormat: z.optional(z.string()),
    colors: z.optional(z.number().int().gte(0)),
    despeckleLevel: z.optional(z.number().int().gte(0)),
  })

export type ConvertImageWithAutotraceNodeExternalInputRecord = z.infer<
  typeof ConvertImageWithAutotraceNodeExternalInputParser
>

export const ConvertImageWithAutotraceNodeInputParser = z.union([
  z.lazy(() => ConvertImageWithAutotraceNodeRemoteInputParser),
  z.lazy(() => ConvertImageWithAutotraceNodeLocalExternalInputParser),
  z.lazy(() => ConvertImageWithAutotraceNodeLocalInternalInputParser),
])

export type ConvertImageWithAutotraceNodeInputRecord = z.infer<
  typeof ConvertImageWithAutotraceNodeInputParser
>

export const ConvertImageWithAutotraceNodeLocalExternalInputParser =
  z.object({
    handle: z.literal('external'),
    input: z.object({
      file: z.union([
        z.lazy(() => RemoteInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    output: z.object({
      file: z.optional(z.lazy(() => LocalOutputPathParser)),
    }),
    outputFormat: z.optional(z.string()),
    colors: z.optional(z.number().int().gte(0)),
    despeckleLevel: z.optional(z.number().int().gte(0)),
  })

export type ConvertImageWithAutotraceNodeLocalExternalInputRecord =
  z.infer<typeof ConvertImageWithAutotraceNodeLocalExternalInputParser>

export const ConvertImageWithAutotraceNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  outputFormat: z.optional(z.string()),
  colors: z.optional(z.number().int().gte(0)),
  despeckleLevel: z.optional(z.number().int().gte(0)),
})

export type ConvertImageWithAutotraceNodeLocalInputRecord = z.infer<
  typeof ConvertImageWithAutotraceNodeLocalInputParser
>

export const ConvertImageWithAutotraceNodeLocalInternalInputParser =
  z.object({
    handle: z.optional(z.literal('internal')),
    input: z.object({
      file: z.union([
        z.lazy(() => FileInputPathParser),
        z.lazy(() => FileContentWithSha256Parser),
      ]),
    }),
    output: z.object({
      file: z.lazy(() => LocalOutputPathParser),
    }),
    outputFormat: z.optional(z.string()),
    colors: z.optional(z.number().int().gte(0)),
    despeckleLevel: z.optional(z.number().int().gte(0)),
  })

export type ConvertImageWithAutotraceNodeLocalInternalInputRecord =
  z.infer<typeof ConvertImageWithAutotraceNodeLocalInternalInputParser>

export const ConvertImageWithAutotraceNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type ConvertImageWithAutotraceNodeOutputRecord = z.infer<
  typeof ConvertImageWithAutotraceNodeOutputParser
>

export const ConvertImageWithAutotraceNodeRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  outputFormat: z.optional(z.string()),
  colors: z.optional(z.number().int().gte(0)),
  despeckleLevel: z.optional(z.number().int().gte(0)),
})

export type ConvertImageWithAutotraceNodeRemoteInputRecord = z.infer<
  typeof ConvertImageWithAutotraceNodeRemoteInputParser
>
