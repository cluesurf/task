import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const RemoveAudioNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
})

export type RemoveAudioNodeClientInputRecord = z.infer<
  typeof RemoveAudioNodeClientInputParser
>

export const RemoveAudioNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
})

export type RemoveAudioNodeExternalInputRecord = z.infer<
  typeof RemoveAudioNodeExternalInputParser
>

export const RemoveAudioNodeInputParser = z.union([
  z.lazy(() => RemoveAudioNodeRemoteInputParser),
  z.lazy(() => RemoveAudioNodeLocalExternalInputParser),
  z.lazy(() => RemoveAudioNodeLocalInternalInputParser),
])

export type RemoveAudioNodeInputRecord = z.infer<
  typeof RemoveAudioNodeInputParser
>

export const RemoveAudioNodeLocalExternalInputParser = z.object({
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
})

export type RemoveAudioNodeLocalExternalInputRecord = z.infer<
  typeof RemoveAudioNodeLocalExternalInputParser
>

export const RemoveAudioNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
})

export type RemoveAudioNodeLocalInputRecord = z.infer<
  typeof RemoveAudioNodeLocalInputParser
>

export const RemoveAudioNodeLocalInternalInputParser = z.object({
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
})

export type RemoveAudioNodeLocalInternalInputRecord = z.infer<
  typeof RemoveAudioNodeLocalInternalInputParser
>

export const RemoveAudioNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type RemoveAudioNodeOutputRecord = z.infer<
  typeof RemoveAudioNodeOutputParser
>

export const RemoveAudioNodeRemoteInputParser = z.object({
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
})

export type RemoveAudioNodeRemoteInputRecord = z.infer<
  typeof RemoveAudioNodeRemoteInputParser
>
