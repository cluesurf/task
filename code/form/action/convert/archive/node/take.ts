import { z } from 'zod'

import { ArchiveFormatParser } from '~/code/form/object/archive/take'
import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const ConvertArchiveNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    format: z.lazy(() => ArchiveFormatParser),
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => ArchiveFormatParser),
  }),
})

export type ConvertArchiveNodeClientInputRecord = z.infer<
  typeof ConvertArchiveNodeClientInputParser
>

export const ConvertArchiveNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    format: z.lazy(() => ArchiveFormatParser),
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => ArchiveFormatParser),
  }),
})

export type ConvertArchiveNodeExternalInputRecord = z.infer<
  typeof ConvertArchiveNodeExternalInputParser
>

export const ConvertArchiveNodeInputParser = z.union([
  z.lazy(() => ConvertArchiveNodeRemoteInputParser),
  z.lazy(() => ConvertArchiveNodeLocalExternalInputParser),
  z.lazy(() => ConvertArchiveNodeLocalInternalInputParser),
])

export type ConvertArchiveNodeInputRecord = z.infer<
  typeof ConvertArchiveNodeInputParser
>

export const ConvertArchiveNodeLocalExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    format: z.lazy(() => ArchiveFormatParser),
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => ArchiveFormatParser),
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type ConvertArchiveNodeLocalExternalInputRecord = z.infer<
  typeof ConvertArchiveNodeLocalExternalInputParser
>

export const ConvertArchiveNodeLocalInputParser = z.object({
  input: z.object({
    format: z.lazy(() => ArchiveFormatParser),
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    format: z.lazy(() => ArchiveFormatParser),
    file: z.lazy(() => LocalPathParser),
  }),
  pathScope: z.optional(z.string()),
})

export type ConvertArchiveNodeLocalInputRecord = z.infer<
  typeof ConvertArchiveNodeLocalInputParser
>

export const ConvertArchiveNodeLocalInternalInputParser = z.object({
  handle: z.optional(z.literal('internal')),
  input: z.object({
    format: z.lazy(() => ArchiveFormatParser),
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => ArchiveFormatParser),
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type ConvertArchiveNodeLocalInternalInputRecord = z.infer<
  typeof ConvertArchiveNodeLocalInternalInputParser
>

export const ConvertArchiveNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type ConvertArchiveNodeOutputRecord = z.infer<
  typeof ConvertArchiveNodeOutputParser
>

export const ConvertArchiveNodeRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    format: z.lazy(() => ArchiveFormatParser),
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.object({
    format: z.lazy(() => ArchiveFormatParser),
    file: z.optional(z.lazy(() => LocalOutputPathParser)),
  }),
  pathScope: z.optional(z.string()),
})

export type ConvertArchiveNodeRemoteInputRecord = z.infer<
  typeof ConvertArchiveNodeRemoteInputParser
>
