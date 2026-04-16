import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const UpdateVideoNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  subtitles: z.optional(z.string()),
})

export type UpdateVideoNodeClientInputRecord = z.infer<
  typeof UpdateVideoNodeClientInputParser
>

export const UpdateVideoNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  subtitles: z.optional(z.string()),
})

export type UpdateVideoNodeExternalInputRecord = z.infer<
  typeof UpdateVideoNodeExternalInputParser
>

export const UpdateVideoNodeInputParser = z.union([
  z.lazy(() => UpdateVideoNodeRemoteInputParser),
  z.lazy(() => UpdateVideoNodeLocalExternalInputParser),
  z.lazy(() => UpdateVideoNodeLocalInternalInputParser),
])

export type UpdateVideoNodeInputRecord = z.infer<
  typeof UpdateVideoNodeInputParser
>

export const UpdateVideoNodeLocalExternalInputParser = z.object({
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
  subtitles: z.optional(z.string()),
})

export type UpdateVideoNodeLocalExternalInputRecord = z.infer<
  typeof UpdateVideoNodeLocalExternalInputParser
>

export const UpdateVideoNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  subtitles: z.optional(z.string()),
})

export type UpdateVideoNodeLocalInputRecord = z.infer<
  typeof UpdateVideoNodeLocalInputParser
>

export const UpdateVideoNodeLocalInternalInputParser = z.object({
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
  subtitles: z.optional(z.string()),
})

export type UpdateVideoNodeLocalInternalInputRecord = z.infer<
  typeof UpdateVideoNodeLocalInternalInputParser
>

export const UpdateVideoNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type UpdateVideoNodeOutputRecord = z.infer<
  typeof UpdateVideoNodeOutputParser
>

export const UpdateVideoNodeRemoteInputParser = z.object({
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
  subtitles: z.optional(z.string()),
})

export type UpdateVideoNodeRemoteInputRecord = z.infer<
  typeof UpdateVideoNodeRemoteInputParser
>
