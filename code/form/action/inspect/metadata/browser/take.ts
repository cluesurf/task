import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const InspectMetadataBrowserInputParser = z.union([
  z.lazy(() => InspectMetadataBrowserRemoteInputParser),
  z.lazy(() => InspectMetadataBrowserLocalInputParser),
])

export type InspectMetadataBrowserInputRecord = z.infer<
  typeof InspectMetadataBrowserInputParser
>

export const InspectMetadataBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
})

export type InspectMetadataBrowserLocalInputRecord = z.infer<
  typeof InspectMetadataBrowserLocalInputParser
>

export const InspectMetadataBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type InspectMetadataBrowserOutputRecord = z.infer<
  typeof InspectMetadataBrowserOutputParser
>

export const InspectMetadataBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
})

export type InspectMetadataBrowserRemoteInputRecord = z.infer<
  typeof InspectMetadataBrowserRemoteInputParser
>
