import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const RemoveMetadataBrowserInputParser = z.union([
  z.lazy(() => RemoveMetadataBrowserRemoteInputParser),
  z.lazy(() => RemoveMetadataBrowserLocalInputParser),
])

export type RemoveMetadataBrowserInputRecord = z.infer<
  typeof RemoveMetadataBrowserInputParser
>

export const RemoveMetadataBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
})

export type RemoveMetadataBrowserLocalInputRecord = z.infer<
  typeof RemoveMetadataBrowserLocalInputParser
>

export const RemoveMetadataBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type RemoveMetadataBrowserOutputRecord = z.infer<
  typeof RemoveMetadataBrowserOutputParser
>

export const RemoveMetadataBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
})

export type RemoveMetadataBrowserRemoteInputRecord = z.infer<
  typeof RemoveMetadataBrowserRemoteInputParser
>
