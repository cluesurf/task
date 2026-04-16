import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const CompressAudioNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  bitrate: z.optional(z.string()),
})

export type CompressAudioNodeClientInputRecord = z.infer<
  typeof CompressAudioNodeClientInputParser
>

export const CompressAudioNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  bitrate: z.optional(z.string()),
})

export type CompressAudioNodeExternalInputRecord = z.infer<
  typeof CompressAudioNodeExternalInputParser
>

export const CompressAudioNodeInputParser = z.union([
  z.lazy(() => CompressAudioNodeRemoteInputParser),
  z.lazy(() => CompressAudioNodeLocalExternalInputParser),
  z.lazy(() => CompressAudioNodeLocalInternalInputParser),
])

export type CompressAudioNodeInputRecord = z.infer<
  typeof CompressAudioNodeInputParser
>

export const CompressAudioNodeLocalExternalInputParser = z.object({
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
  bitrate: z.optional(z.string()),
})

export type CompressAudioNodeLocalExternalInputRecord = z.infer<
  typeof CompressAudioNodeLocalExternalInputParser
>

export const CompressAudioNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  bitrate: z.optional(z.string()),
})

export type CompressAudioNodeLocalInputRecord = z.infer<
  typeof CompressAudioNodeLocalInputParser
>

export const CompressAudioNodeLocalInternalInputParser = z.object({
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
  bitrate: z.optional(z.string()),
})

export type CompressAudioNodeLocalInternalInputRecord = z.infer<
  typeof CompressAudioNodeLocalInternalInputParser
>

export const CompressAudioNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type CompressAudioNodeOutputRecord = z.infer<
  typeof CompressAudioNodeOutputParser
>

export const CompressAudioNodeRemoteInputParser = z.object({
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
  bitrate: z.optional(z.string()),
})

export type CompressAudioNodeRemoteInputRecord = z.infer<
  typeof CompressAudioNodeRemoteInputParser
>
