import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const SplitAudioNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  segments: z.string(),
  silenceDb: z.optional(z.string()),
  silenceDuration: z.optional(z.string()),
})

export type SplitAudioNodeClientInputRecord = z.infer<
  typeof SplitAudioNodeClientInputParser
>

export const SplitAudioNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  segments: z.string(),
  silenceDb: z.optional(z.string()),
  silenceDuration: z.optional(z.string()),
})

export type SplitAudioNodeExternalInputRecord = z.infer<
  typeof SplitAudioNodeExternalInputParser
>

export const SplitAudioNodeInputParser = z.union([
  z.lazy(() => SplitAudioNodeRemoteInputParser),
  z.lazy(() => SplitAudioNodeLocalExternalInputParser),
  z.lazy(() => SplitAudioNodeLocalInternalInputParser),
])

export type SplitAudioNodeInputRecord = z.infer<
  typeof SplitAudioNodeInputParser
>

export const SplitAudioNodeLocalExternalInputParser = z.object({
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
  segments: z.string(),
  silenceDb: z.optional(z.string()),
  silenceDuration: z.optional(z.string()),
})

export type SplitAudioNodeLocalExternalInputRecord = z.infer<
  typeof SplitAudioNodeLocalExternalInputParser
>

export const SplitAudioNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.optional(
    z.object({
      file: z.optional(z.lazy(() => LocalPathParser)),
    }),
  ),
  segments: z.string(),
  silenceDb: z.optional(z.string()),
  silenceDuration: z.optional(z.string()),
})

export type SplitAudioNodeLocalInputRecord = z.infer<
  typeof SplitAudioNodeLocalInputParser
>

export const SplitAudioNodeLocalInternalInputParser = z.object({
  handle: z.optional(z.literal('internal')),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  output: z.optional(
    z.object({
      file: z.optional(z.lazy(() => LocalOutputPathParser)),
    }),
  ),
  segments: z.string(),
  silenceDb: z.optional(z.string()),
  silenceDuration: z.optional(z.string()),
})

export type SplitAudioNodeLocalInternalInputRecord = z.infer<
  typeof SplitAudioNodeLocalInternalInputParser
>

export const SplitAudioNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type SplitAudioNodeOutputRecord = z.infer<
  typeof SplitAudioNodeOutputParser
>

export const SplitAudioNodeRemoteInputParser = z.object({
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
  segments: z.string(),
  silenceDb: z.optional(z.string()),
  silenceDuration: z.optional(z.string()),
})

export type SplitAudioNodeRemoteInputRecord = z.infer<
  typeof SplitAudioNodeRemoteInputParser
>
