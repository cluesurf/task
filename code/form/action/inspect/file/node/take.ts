import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const InspectFileNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
})

export type InspectFileNodeClientInputRecord = z.infer<
  typeof InspectFileNodeClientInputParser
>

export const InspectFileNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
})

export type InspectFileNodeExternalInputRecord = z.infer<
  typeof InspectFileNodeExternalInputParser
>

export const InspectFileNodeInputParser = z.union([
  z.lazy(() => InspectFileNodeRemoteInputParser),
  z.lazy(() => InspectFileNodeLocalExternalInputParser),
  z.lazy(() => InspectFileNodeLocalInternalInputParser),
])

export type InspectFileNodeInputRecord = z.infer<
  typeof InspectFileNodeInputParser
>

export const InspectFileNodeLocalExternalInputParser = z.object({
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

export type InspectFileNodeLocalExternalInputRecord = z.infer<
  typeof InspectFileNodeLocalExternalInputParser
>

export const InspectFileNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.optional(
    z.object({
      file: z.optional(z.lazy(() => LocalPathParser)),
    }),
  ),
})

export type InspectFileNodeLocalInputRecord = z.infer<
  typeof InspectFileNodeLocalInputParser
>

export const InspectFileNodeLocalInternalInputParser = z.object({
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
})

export type InspectFileNodeLocalInternalInputRecord = z.infer<
  typeof InspectFileNodeLocalInternalInputParser
>

export const InspectFileNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type InspectFileNodeOutputRecord = z.infer<
  typeof InspectFileNodeOutputParser
>

export const InspectFileNodeRemoteInputParser = z.object({
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

export type InspectFileNodeRemoteInputRecord = z.infer<
  typeof InspectFileNodeRemoteInputParser
>
