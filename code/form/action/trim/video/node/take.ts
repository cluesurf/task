import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const TrimVideoNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  start: z.optional(z.string()),
  end: z.optional(z.string()),
  duration: z.optional(z.string()),
  reencode: z.optional(z.boolean()),
})

export type TrimVideoNodeClientInputRecord = z.infer<
  typeof TrimVideoNodeClientInputParser
>

export const TrimVideoNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  start: z.optional(z.string()),
  end: z.optional(z.string()),
  duration: z.optional(z.string()),
  reencode: z.optional(z.boolean()),
})

export type TrimVideoNodeExternalInputRecord = z.infer<
  typeof TrimVideoNodeExternalInputParser
>

export const TrimVideoNodeInputParser = z.union([
  z.lazy(() => TrimVideoNodeRemoteInputParser),
  z.lazy(() => TrimVideoNodeLocalExternalInputParser),
  z.lazy(() => TrimVideoNodeLocalInternalInputParser),
])

export type TrimVideoNodeInputRecord = z.infer<
  typeof TrimVideoNodeInputParser
>

export const TrimVideoNodeLocalExternalInputParser = z.object({
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
  start: z.optional(z.string()),
  end: z.optional(z.string()),
  duration: z.optional(z.string()),
  reencode: z.optional(z.boolean()),
})

export type TrimVideoNodeLocalExternalInputRecord = z.infer<
  typeof TrimVideoNodeLocalExternalInputParser
>

export const TrimVideoNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  start: z.optional(z.string()),
  end: z.optional(z.string()),
  duration: z.optional(z.string()),
  reencode: z.optional(z.boolean()),
})

export type TrimVideoNodeLocalInputRecord = z.infer<
  typeof TrimVideoNodeLocalInputParser
>

export const TrimVideoNodeLocalInternalInputParser = z.object({
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
  start: z.optional(z.string()),
  end: z.optional(z.string()),
  duration: z.optional(z.string()),
  reencode: z.optional(z.boolean()),
})

export type TrimVideoNodeLocalInternalInputRecord = z.infer<
  typeof TrimVideoNodeLocalInternalInputParser
>

export const TrimVideoNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type TrimVideoNodeOutputRecord = z.infer<
  typeof TrimVideoNodeOutputParser
>

export const TrimVideoNodeRemoteInputParser = z.object({
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
  start: z.optional(z.string()),
  end: z.optional(z.string()),
  duration: z.optional(z.string()),
  reencode: z.optional(z.boolean()),
})

export type TrimVideoNodeRemoteInputRecord = z.infer<
  typeof TrimVideoNodeRemoteInputParser
>
