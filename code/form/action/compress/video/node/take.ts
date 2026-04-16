import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const CompressVideoNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  crf: z.optional(z.string()),
  preset: z.optional(z.string()),
})

export type CompressVideoNodeClientInputRecord = z.infer<
  typeof CompressVideoNodeClientInputParser
>

export const CompressVideoNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  crf: z.optional(z.string()),
  preset: z.optional(z.string()),
})

export type CompressVideoNodeExternalInputRecord = z.infer<
  typeof CompressVideoNodeExternalInputParser
>

export const CompressVideoNodeInputParser = z.union([
  z.lazy(() => CompressVideoNodeRemoteInputParser),
  z.lazy(() => CompressVideoNodeLocalExternalInputParser),
  z.lazy(() => CompressVideoNodeLocalInternalInputParser),
])

export type CompressVideoNodeInputRecord = z.infer<
  typeof CompressVideoNodeInputParser
>

export const CompressVideoNodeLocalExternalInputParser = z.object({
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
  crf: z.optional(z.string()),
  preset: z.optional(z.string()),
})

export type CompressVideoNodeLocalExternalInputRecord = z.infer<
  typeof CompressVideoNodeLocalExternalInputParser
>

export const CompressVideoNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  crf: z.optional(z.string()),
  preset: z.optional(z.string()),
})

export type CompressVideoNodeLocalInputRecord = z.infer<
  typeof CompressVideoNodeLocalInputParser
>

export const CompressVideoNodeLocalInternalInputParser = z.object({
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
  crf: z.optional(z.string()),
  preset: z.optional(z.string()),
})

export type CompressVideoNodeLocalInternalInputRecord = z.infer<
  typeof CompressVideoNodeLocalInternalInputParser
>

export const CompressVideoNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type CompressVideoNodeOutputRecord = z.infer<
  typeof CompressVideoNodeOutputParser
>

export const CompressVideoNodeRemoteInputParser = z.object({
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
  crf: z.optional(z.string()),
  preset: z.optional(z.string()),
})

export type CompressVideoNodeRemoteInputRecord = z.infer<
  typeof CompressVideoNodeRemoteInputParser
>
