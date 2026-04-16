import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const RotateVideoNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  degree: z.string(),
})

export type RotateVideoNodeClientInputRecord = z.infer<
  typeof RotateVideoNodeClientInputParser
>

export const RotateVideoNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
  degree: z.string(),
})

export type RotateVideoNodeExternalInputRecord = z.infer<
  typeof RotateVideoNodeExternalInputParser
>

export const RotateVideoNodeInputParser = z.union([
  z.lazy(() => RotateVideoNodeRemoteInputParser),
  z.lazy(() => RotateVideoNodeLocalExternalInputParser),
  z.lazy(() => RotateVideoNodeLocalInternalInputParser),
])

export type RotateVideoNodeInputRecord = z.infer<
  typeof RotateVideoNodeInputParser
>

export const RotateVideoNodeLocalExternalInputParser = z.object({
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

export type RotateVideoNodeLocalExternalInputRecord = z.infer<
  typeof RotateVideoNodeLocalExternalInputParser
>

export const RotateVideoNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  degree: z.string(),
})

export type RotateVideoNodeLocalInputRecord = z.infer<
  typeof RotateVideoNodeLocalInputParser
>

export const RotateVideoNodeLocalInternalInputParser = z.object({
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

export type RotateVideoNodeLocalInternalInputRecord = z.infer<
  typeof RotateVideoNodeLocalInternalInputParser
>

export const RotateVideoNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type RotateVideoNodeOutputRecord = z.infer<
  typeof RotateVideoNodeOutputParser
>

export const RotateVideoNodeRemoteInputParser = z.object({
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

export type RotateVideoNodeRemoteInputRecord = z.infer<
  typeof RotateVideoNodeRemoteInputParser
>
