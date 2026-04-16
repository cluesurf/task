import { z } from 'zod'

import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/form/object/file/take'

export const InspectMetadataNodeClientInputParser = z.object({
  handle: z.literal('client'),
  input: z.object({
    file: z.union([
      z.lazy(() => FileInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
})

export type InspectMetadataNodeClientInputRecord = z.infer<
  typeof InspectMetadataNodeClientInputParser
>

export const InspectMetadataNodeExternalInputParser = z.object({
  handle: z.literal('external'),
  input: z.object({
    file: z.union([
      z.lazy(() => RemoteInputPathParser),
      z.lazy(() => FileContentWithSha256Parser),
    ]),
  }),
})

export type InspectMetadataNodeExternalInputRecord = z.infer<
  typeof InspectMetadataNodeExternalInputParser
>

export const InspectMetadataNodeInputParser = z.union([
  z.lazy(() => InspectMetadataNodeRemoteInputParser),
  z.lazy(() => InspectMetadataNodeLocalExternalInputParser),
  z.lazy(() => InspectMetadataNodeLocalInternalInputParser),
])

export type InspectMetadataNodeInputRecord = z.infer<
  typeof InspectMetadataNodeInputParser
>

export const InspectMetadataNodeLocalExternalInputParser = z.object({
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

export type InspectMetadataNodeLocalExternalInputRecord = z.infer<
  typeof InspectMetadataNodeLocalExternalInputParser
>

export const InspectMetadataNodeLocalInputParser = z.object({
  input: z.object({
    file: z.lazy(() => LocalPathParser),
  }),
  output: z.optional(
    z.object({
      file: z.optional(z.lazy(() => LocalPathParser)),
    }),
  ),
})

export type InspectMetadataNodeLocalInputRecord = z.infer<
  typeof InspectMetadataNodeLocalInputParser
>

export const InspectMetadataNodeLocalInternalInputParser = z.object({
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

export type InspectMetadataNodeLocalInternalInputRecord = z.infer<
  typeof InspectMetadataNodeLocalInternalInputParser
>

export const InspectMetadataNodeOutputParser = z.object({
  file: z.lazy(() => FilePathParser),
})

export type InspectMetadataNodeOutputRecord = z.infer<
  typeof InspectMetadataNodeOutputParser
>

export const InspectMetadataNodeRemoteInputParser = z.object({
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

export type InspectMetadataNodeRemoteInputRecord = z.infer<
  typeof InspectMetadataNodeRemoteInputParser
>
