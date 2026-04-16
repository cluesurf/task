import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const RemoveSubtitlesNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
})

export type RemoveSubtitlesNodeClientInputRecord = z.infer<
  typeof RemoveSubtitlesNodeClientInputParser
>

export const RemoveSubtitlesNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
})

export type RemoveSubtitlesNodeExternalInputRecord = z.infer<
  typeof RemoveSubtitlesNodeExternalInputParser
>

export const RemoveSubtitlesNodeInputParser = z.union([
  z.lazy(() => RemoveSubtitlesNodeRemoteInputParser),
  z.lazy(() => RemoveSubtitlesNodeLocalExternalInputParser),
  z.lazy(() => RemoveSubtitlesNodeLocalInternalInputParser),
])

export type RemoveSubtitlesNodeInputRecord = z.infer<
  typeof RemoveSubtitlesNodeInputParser
>

export const RemoveSubtitlesNodeLocalExternalInputParser = z.object({
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

export type RemoveSubtitlesNodeLocalExternalInputRecord = z.infer<
  typeof RemoveSubtitlesNodeLocalExternalInputParser
>

export const RemoveSubtitlesNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
})

export type RemoveSubtitlesNodeLocalInputRecord = z.infer<
  typeof RemoveSubtitlesNodeLocalInputParser
>

export const RemoveSubtitlesNodeLocalInternalInputParser = z.object({
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

export type RemoveSubtitlesNodeLocalInternalInputRecord = z.infer<
  typeof RemoveSubtitlesNodeLocalInternalInputParser
>

export const RemoveSubtitlesNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type RemoveSubtitlesNodeOutputRecord = z.infer<
  typeof RemoveSubtitlesNodeOutputParser
>

export const RemoveSubtitlesNodeRemoteInputParser = z.object({
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

export type RemoveSubtitlesNodeRemoteInputRecord = z.infer<
  typeof RemoveSubtitlesNodeRemoteInputParser
>
