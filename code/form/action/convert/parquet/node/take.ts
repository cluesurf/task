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

export const ConvertParquetNodeClientInputParser = z.object({
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

export type ConvertParquetNodeClientInputRecord = z.infer<
  typeof ConvertParquetNodeClientInputParser
>

export const ConvertParquetNodeExternalInputParser = z.object({
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

export type ConvertParquetNodeExternalInputRecord = z.infer<
  typeof ConvertParquetNodeExternalInputParser
>

export const ConvertParquetNodeInputParser = z.union([
  z.lazy(() => ConvertParquetNodeRemoteInputParser),
  z.lazy(() => ConvertParquetNodeLocalExternalInputParser),
  z.lazy(() => ConvertParquetNodeLocalInternalInputParser),
])

export type ConvertParquetNodeInputRecord = z.infer<
  typeof ConvertParquetNodeInputParser
>

export const ConvertParquetNodeLocalExternalInputParser = z.object({
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

export type ConvertParquetNodeLocalExternalInputRecord = z.infer<
  typeof ConvertParquetNodeLocalExternalInputParser
>

export const ConvertParquetNodeLocalInputParser = z.object({
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

export type ConvertParquetNodeLocalInputRecord = z.infer<
  typeof ConvertParquetNodeLocalInputParser
>

export const ConvertParquetNodeLocalInternalInputParser = z.object({
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

export type ConvertParquetNodeLocalInternalInputRecord = z.infer<
  typeof ConvertParquetNodeLocalInternalInputParser
>

export const ConvertParquetNodeOutputParser = z.object({
  converted: z.number().int().gte(0),
  skipped: z.number().int().gte(0),
  failed: z.number().int().gte(0),
})

export type ConvertParquetNodeOutputRecord = z.infer<
  typeof ConvertParquetNodeOutputParser
>

export const ConvertParquetNodeRemoteInputParser = z.object({
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

export type ConvertParquetNodeRemoteInputRecord = z.infer<
  typeof ConvertParquetNodeRemoteInputParser
>
