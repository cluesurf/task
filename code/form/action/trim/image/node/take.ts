import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const TrimImageNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  crop: z.string(),
})

export type TrimImageNodeClientInputRecord = z.infer<
  typeof TrimImageNodeClientInputParser
>

export const TrimImageNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  crop: z.string(),
})

export type TrimImageNodeExternalInputRecord = z.infer<
  typeof TrimImageNodeExternalInputParser
>

export const TrimImageNodeInputParser = z.union([
  z.lazy(() => TrimImageNodeRemoteInputParser),
  z.lazy(() => TrimImageNodeLocalExternalInputParser),
  z.lazy(() => TrimImageNodeLocalInternalInputParser),
])

export type TrimImageNodeInputRecord = z.infer<
  typeof TrimImageNodeInputParser
>

export const TrimImageNodeLocalExternalInputParser = z.object({
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
  crop: z.string(),
})

export type TrimImageNodeLocalExternalInputRecord = z.infer<
  typeof TrimImageNodeLocalExternalInputParser
>

export const TrimImageNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  crop: z.string(),
})

export type TrimImageNodeLocalInputRecord = z.infer<
  typeof TrimImageNodeLocalInputParser
>

export const TrimImageNodeLocalInternalInputParser = z.object({
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
  crop: z.string(),
})

export type TrimImageNodeLocalInternalInputRecord = z.infer<
  typeof TrimImageNodeLocalInternalInputParser
>

export const TrimImageNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type TrimImageNodeOutputRecord = z.infer<
  typeof TrimImageNodeOutputParser
>

export const TrimImageNodeRemoteInputParser = z.object({
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
  crop: z.string(),
})

export type TrimImageNodeRemoteInputRecord = z.infer<
  typeof TrimImageNodeRemoteInputParser
>
