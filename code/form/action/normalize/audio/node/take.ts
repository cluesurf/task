import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const NormalizeAudioNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  target: z.optional(z.string()),
  peak: z.optional(z.string()),
  range: z.optional(z.string()),
})

export type NormalizeAudioNodeClientInputRecord = z.infer<
  typeof NormalizeAudioNodeClientInputParser
>

export const NormalizeAudioNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  target: z.optional(z.string()),
  peak: z.optional(z.string()),
  range: z.optional(z.string()),
})

export type NormalizeAudioNodeExternalInputRecord = z.infer<
  typeof NormalizeAudioNodeExternalInputParser
>

export const NormalizeAudioNodeInputParser = z.union([
  z.lazy(() => NormalizeAudioNodeRemoteInputParser),
  z.lazy(() => NormalizeAudioNodeLocalExternalInputParser),
  z.lazy(() => NormalizeAudioNodeLocalInternalInputParser),
])

export type NormalizeAudioNodeInputRecord = z.infer<
  typeof NormalizeAudioNodeInputParser
>

export const NormalizeAudioNodeLocalExternalInputParser = z.object({
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
  target: z.optional(z.string()),
  peak: z.optional(z.string()),
  range: z.optional(z.string()),
})

export type NormalizeAudioNodeLocalExternalInputRecord = z.infer<
  typeof NormalizeAudioNodeLocalExternalInputParser
>

export const NormalizeAudioNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  target: z.optional(z.string()),
  peak: z.optional(z.string()),
  range: z.optional(z.string()),
})

export type NormalizeAudioNodeLocalInputRecord = z.infer<
  typeof NormalizeAudioNodeLocalInputParser
>

export const NormalizeAudioNodeLocalInternalInputParser = z.object({
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
  target: z.optional(z.string()),
  peak: z.optional(z.string()),
  range: z.optional(z.string()),
})

export type NormalizeAudioNodeLocalInternalInputRecord = z.infer<
  typeof NormalizeAudioNodeLocalInternalInputParser
>

export const NormalizeAudioNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type NormalizeAudioNodeOutputRecord = z.infer<
  typeof NormalizeAudioNodeOutputParser
>

export const NormalizeAudioNodeRemoteInputParser = z.object({
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
  target: z.optional(z.string()),
  peak: z.optional(z.string()),
  range: z.optional(z.string()),
})

export type NormalizeAudioNodeRemoteInputRecord = z.infer<
  typeof NormalizeAudioNodeRemoteInputParser
>
