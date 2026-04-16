import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const TrimAudioNodeClientInputParser = z.object({
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
})

export type TrimAudioNodeClientInputRecord = z.infer<
  typeof TrimAudioNodeClientInputParser
>

export const TrimAudioNodeExternalInputParser = z.object({
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
})

export type TrimAudioNodeExternalInputRecord = z.infer<
  typeof TrimAudioNodeExternalInputParser
>

export const TrimAudioNodeInputParser = z.union([
  z.lazy(() => TrimAudioNodeRemoteInputParser),
  z.lazy(() => TrimAudioNodeLocalExternalInputParser),
  z.lazy(() => TrimAudioNodeLocalInternalInputParser),
])

export type TrimAudioNodeInputRecord = z.infer<
  typeof TrimAudioNodeInputParser
>

export const TrimAudioNodeLocalExternalInputParser = z.object({
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
})

export type TrimAudioNodeLocalExternalInputRecord = z.infer<
  typeof TrimAudioNodeLocalExternalInputParser
>

export const TrimAudioNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  start: z.optional(z.string()),
  end: z.optional(z.string()),
  duration: z.optional(z.string()),
})

export type TrimAudioNodeLocalInputRecord = z.infer<
  typeof TrimAudioNodeLocalInputParser
>

export const TrimAudioNodeLocalInternalInputParser = z.object({
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
})

export type TrimAudioNodeLocalInternalInputRecord = z.infer<
  typeof TrimAudioNodeLocalInternalInputParser
>

export const TrimAudioNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type TrimAudioNodeOutputRecord = z.infer<
  typeof TrimAudioNodeOutputParser
>

export const TrimAudioNodeRemoteInputParser = z.object({
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
})

export type TrimAudioNodeRemoteInputRecord = z.infer<
  typeof TrimAudioNodeRemoteInputParser
>
