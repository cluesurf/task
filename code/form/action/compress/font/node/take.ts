import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const CompressFontNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
})

export type CompressFontNodeClientInputRecord = z.infer<
  typeof CompressFontNodeClientInputParser
>

export const CompressFontNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
})

export type CompressFontNodeExternalInputRecord = z.infer<
  typeof CompressFontNodeExternalInputParser
>

export const CompressFontNodeInputParser = z.union([
  z.lazy(() => CompressFontNodeRemoteInputParser),
  z.lazy(() => CompressFontNodeLocalExternalInputParser),
  z.lazy(() => CompressFontNodeLocalInternalInputParser),
])

export type CompressFontNodeInputRecord = z.infer<
  typeof CompressFontNodeInputParser
>

export const CompressFontNodeLocalExternalInputParser = z.object({
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

export type CompressFontNodeLocalExternalInputRecord = z.infer<
  typeof CompressFontNodeLocalExternalInputParser
>

export const CompressFontNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
})

export type CompressFontNodeLocalInputRecord = z.infer<
  typeof CompressFontNodeLocalInputParser
>

export const CompressFontNodeLocalInternalInputParser = z.object({
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

export type CompressFontNodeLocalInternalInputRecord = z.infer<
  typeof CompressFontNodeLocalInternalInputParser
>

export const CompressFontNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type CompressFontNodeOutputRecord = z.infer<
  typeof CompressFontNodeOutputParser
>

export const CompressFontNodeRemoteInputParser = z.object({
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

export type CompressFontNodeRemoteInputRecord = z.infer<
  typeof CompressFontNodeRemoteInputParser
>
