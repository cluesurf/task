import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const PadNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  to: z.string(),
  sampleRate: z.optional(z.number().int().gte(0)),
  channels: z.optional(z.number().int().gte(0)),
})

export type PadNodeClientInputRecord = z.infer<
  typeof PadNodeClientInputParser
>

export const PadNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  to: z.string(),
  sampleRate: z.optional(z.number().int().gte(0)),
  channels: z.optional(z.number().int().gte(0)),
})

export type PadNodeExternalInputRecord = z.infer<
  typeof PadNodeExternalInputParser
>

export const PadNodeInputParser = z.union([
  z.lazy(() => PadNodeRemoteInputParser),
  z.lazy(() => PadNodeLocalExternalInputParser),
  z.lazy(() => PadNodeLocalInternalInputParser),
])

export type PadNodeInputRecord = z.infer<typeof PadNodeInputParser>

export const PadNodeLocalExternalInputParser = z.object({
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
  to: z.string(),
  sampleRate: z.optional(z.number().int().gte(0)),
  channels: z.optional(z.number().int().gte(0)),
})

export type PadNodeLocalExternalInputRecord = z.infer<
  typeof PadNodeLocalExternalInputParser
>

export const PadNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  to: z.string(),
  sampleRate: z.optional(z.number().int().gte(0)),
  channels: z.optional(z.number().int().gte(0)),
})

export type PadNodeLocalInputRecord = z.infer<
  typeof PadNodeLocalInputParser
>

export const PadNodeLocalInternalInputParser = z.object({
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
  to: z.string(),
  sampleRate: z.optional(z.number().int().gte(0)),
  channels: z.optional(z.number().int().gte(0)),
})

export type PadNodeLocalInternalInputRecord = z.infer<
  typeof PadNodeLocalInternalInputParser
>

export const PadNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type PadNodeOutputRecord = z.infer<typeof PadNodeOutputParser>

export const PadNodeRemoteInputParser = z.object({
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
  to: z.string(),
  sampleRate: z.optional(z.number().int().gte(0)),
  channels: z.optional(z.number().int().gte(0)),
})

export type PadNodeRemoteInputRecord = z.infer<
  typeof PadNodeRemoteInputParser
>
