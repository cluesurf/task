import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const PadAudioNodeClientInputParser = z.object({
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

export type PadAudioNodeClientInputRecord = z.infer<
  typeof PadAudioNodeClientInputParser
>

export const PadAudioNodeExternalInputParser = z.object({
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

export type PadAudioNodeExternalInputRecord = z.infer<
  typeof PadAudioNodeExternalInputParser
>

export const PadAudioNodeInputParser = z.union([
  z.lazy(() => PadAudioNodeRemoteInputParser),
  z.lazy(() => PadAudioNodeLocalExternalInputParser),
  z.lazy(() => PadAudioNodeLocalInternalInputParser),
])

export type PadAudioNodeInputRecord = z.infer<
  typeof PadAudioNodeInputParser
>

export const PadAudioNodeLocalExternalInputParser = z.object({
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

export type PadAudioNodeLocalExternalInputRecord = z.infer<
  typeof PadAudioNodeLocalExternalInputParser
>

export const PadAudioNodeLocalInputParser = z.object({
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

export type PadAudioNodeLocalInputRecord = z.infer<
  typeof PadAudioNodeLocalInputParser
>

export const PadAudioNodeLocalInternalInputParser = z.object({
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

export type PadAudioNodeLocalInternalInputRecord = z.infer<
  typeof PadAudioNodeLocalInternalInputParser
>

export const PadAudioNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type PadAudioNodeOutputRecord = z.infer<
  typeof PadAudioNodeOutputParser
>

export const PadAudioNodeRemoteInputParser = z.object({
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

export type PadAudioNodeRemoteInputRecord = z.infer<
  typeof PadAudioNodeRemoteInputParser
>
