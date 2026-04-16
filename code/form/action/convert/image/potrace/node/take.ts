import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const ConvertImageWithPotraceNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  outputFormat: z.optional(z.string()),
  threshold: z.optional(z.number()),
  turdsize: z.optional(z.number().int().gte(0)),
})

export type ConvertImageWithPotraceNodeClientInputRecord = z.infer<
  typeof ConvertImageWithPotraceNodeClientInputParser
>

export const ConvertImageWithPotraceNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  outputFormat: z.optional(z.string()),
  threshold: z.optional(z.number()),
  turdsize: z.optional(z.number().int().gte(0)),
})

export type ConvertImageWithPotraceNodeExternalInputRecord = z.infer<
  typeof ConvertImageWithPotraceNodeExternalInputParser
>

export const ConvertImageWithPotraceNodeInputParser = z.union([
  z.lazy(() => ConvertImageWithPotraceNodeRemoteInputParser),
  z.lazy(() => ConvertImageWithPotraceNodeLocalExternalInputParser),
  z.lazy(() => ConvertImageWithPotraceNodeLocalInternalInputParser),
])

export type ConvertImageWithPotraceNodeInputRecord = z.infer<
  typeof ConvertImageWithPotraceNodeInputParser
>

export const ConvertImageWithPotraceNodeLocalExternalInputParser =
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
    threshold: z.optional(z.number()),
    turdsize: z.optional(z.number().int().gte(0)),
  })

export type ConvertImageWithPotraceNodeLocalExternalInputRecord =
  z.infer<typeof ConvertImageWithPotraceNodeLocalExternalInputParser>

export const ConvertImageWithPotraceNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  outputFormat: z.optional(z.string()),
  threshold: z.optional(z.number()),
  turdsize: z.optional(z.number().int().gte(0)),
})

export type ConvertImageWithPotraceNodeLocalInputRecord = z.infer<
  typeof ConvertImageWithPotraceNodeLocalInputParser
>

export const ConvertImageWithPotraceNodeLocalInternalInputParser =
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
    threshold: z.optional(z.number()),
    turdsize: z.optional(z.number().int().gte(0)),
  })

export type ConvertImageWithPotraceNodeLocalInternalInputRecord =
  z.infer<typeof ConvertImageWithPotraceNodeLocalInternalInputParser>

export const ConvertImageWithPotraceNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type ConvertImageWithPotraceNodeOutputRecord = z.infer<
  typeof ConvertImageWithPotraceNodeOutputParser
>

export const ConvertImageWithPotraceNodeRemoteInputParser = z.object({
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
  threshold: z.optional(z.number()),
  turdsize: z.optional(z.number().int().gte(0)),
})

export type ConvertImageWithPotraceNodeRemoteInputRecord = z.infer<
  typeof ConvertImageWithPotraceNodeRemoteInputParser
>
