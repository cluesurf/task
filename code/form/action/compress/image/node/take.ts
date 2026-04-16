import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const CompressImageNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  quality: z.optional(z.string()),
})

export type CompressImageNodeClientInputRecord = z.infer<
  typeof CompressImageNodeClientInputParser
>

export const CompressImageNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  quality: z.optional(z.string()),
})

export type CompressImageNodeExternalInputRecord = z.infer<
  typeof CompressImageNodeExternalInputParser
>

export const CompressImageNodeInputParser = z.union([
  z.lazy(() => CompressImageNodeRemoteInputParser),
  z.lazy(() => CompressImageNodeLocalExternalInputParser),
  z.lazy(() => CompressImageNodeLocalInternalInputParser),
])

export type CompressImageNodeInputRecord = z.infer<
  typeof CompressImageNodeInputParser
>

export const CompressImageNodeLocalExternalInputParser = z.object({
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
  quality: z.optional(z.string()),
})

export type CompressImageNodeLocalExternalInputRecord = z.infer<
  typeof CompressImageNodeLocalExternalInputParser
>

export const CompressImageNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  quality: z.optional(z.string()),
})

export type CompressImageNodeLocalInputRecord = z.infer<
  typeof CompressImageNodeLocalInputParser
>

export const CompressImageNodeLocalInternalInputParser = z.object({
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
  quality: z.optional(z.string()),
})

export type CompressImageNodeLocalInternalInputRecord = z.infer<
  typeof CompressImageNodeLocalInternalInputParser
>

export const CompressImageNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type CompressImageNodeOutputRecord = z.infer<
  typeof CompressImageNodeOutputParser
>

export const CompressImageNodeRemoteInputParser = z.object({
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
  quality: z.optional(z.string()),
})

export type CompressImageNodeRemoteInputRecord = z.infer<
  typeof CompressImageNodeRemoteInputParser
>
