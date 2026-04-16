import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const RotateImageNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  degree: z.string(),
})

export type RotateImageNodeClientInputRecord = z.infer<
  typeof RotateImageNodeClientInputParser
>

export const RotateImageNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  degree: z.string(),
})

export type RotateImageNodeExternalInputRecord = z.infer<
  typeof RotateImageNodeExternalInputParser
>

export const RotateImageNodeInputParser = z.union([
  z.lazy(() => RotateImageNodeRemoteInputParser),
  z.lazy(() => RotateImageNodeLocalExternalInputParser),
  z.lazy(() => RotateImageNodeLocalInternalInputParser),
])

export type RotateImageNodeInputRecord = z.infer<
  typeof RotateImageNodeInputParser
>

export const RotateImageNodeLocalExternalInputParser = z.object({
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
  degree: z.string(),
})

export type RotateImageNodeLocalExternalInputRecord = z.infer<
  typeof RotateImageNodeLocalExternalInputParser
>

export const RotateImageNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  degree: z.string(),
})

export type RotateImageNodeLocalInputRecord = z.infer<
  typeof RotateImageNodeLocalInputParser
>

export const RotateImageNodeLocalInternalInputParser = z.object({
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
  degree: z.string(),
})

export type RotateImageNodeLocalInternalInputRecord = z.infer<
  typeof RotateImageNodeLocalInternalInputParser
>

export const RotateImageNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type RotateImageNodeOutputRecord = z.infer<
  typeof RotateImageNodeOutputParser
>

export const RotateImageNodeRemoteInputParser = z.object({
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
  degree: z.string(),
})

export type RotateImageNodeRemoteInputRecord = z.infer<
  typeof RotateImageNodeRemoteInputParser
>
