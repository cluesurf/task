import { z } from 'zod'

import { DataFormatParser } from '~/code/form/object/data/take'
import {
  FileContentParser,
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const ConvertDataNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    format: z.lazy(() => DataFormatParser),
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => DataFormatParser),
  }),
})

export type ConvertDataNodeClientInputRecord = z.infer<
  typeof ConvertDataNodeClientInputParser
>

export const ConvertDataNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    format: z.lazy(() => DataFormatParser),
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => DataFormatParser),
  }),
})

export type ConvertDataNodeExternalInputRecord = z.infer<
  typeof ConvertDataNodeExternalInputParser
>

export const ConvertDataNodeInputParser = z.union([
  z.lazy(() => ConvertDataNodeRemoteInputParser),
  z.lazy(() => ConvertDataNodeLocalExternalInputParser),
  z.lazy(() => ConvertDataNodeLocalInternalInputParser),
])

export type ConvertDataNodeInputRecord = z.infer<
  typeof ConvertDataNodeInputParser
>

export const ConvertDataNodeLocalExternalInputParser = z.object({
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

export type ConvertDataNodeLocalExternalInputRecord = z.infer<
  typeof ConvertDataNodeLocalExternalInputParser
>

export const ConvertDataNodeLocalInputParser = z.object({
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

export type ConvertDataNodeLocalInputRecord = z.infer<
  typeof ConvertDataNodeLocalInputParser
>

export const ConvertDataNodeLocalInternalInputParser = z.object({
  handle: z.optional(z.literal('internal')),
  input: z.object({
    format: z.lazy(() => DataFormatParser),
    directory: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    format: z.lazy(() => DataFormatParser),
    directory: z.lazy(() => LocalPathParser),
  }),
  merge: z.optional(z.boolean()),
  pathScope: z.optional(z.string()),
})

export type ConvertDataNodeLocalInternalInputRecord = z.infer<
  typeof ConvertDataNodeLocalInternalInputParser
>

export const ConvertDataNodeOutputParser = z.object({
  converted: z.number().int().gte(0),
  skipped: z.number().int().gte(0),
  failed: z.number().int().gte(0),
})

export type ConvertDataNodeOutputRecord = z.infer<
  typeof ConvertDataNodeOutputParser
>

export const ConvertDataNodeRemoteInputParser = z.object({
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

export type ConvertDataNodeRemoteInputRecord = z.infer<
  typeof ConvertDataNodeRemoteInputParser
>
