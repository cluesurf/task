import { z } from 'zod'

import {
  FileContentParser,
  FileContentWithSha256Parser,
} from '~/code/form/object/file/take'

export const InspectFileBrowserInputParser = z.union([
  z.lazy(() => InspectFileBrowserRemoteInputParser),
  z.lazy(() => InspectFileBrowserLocalInputParser),
])

export type InspectFileBrowserInputRecord = z.infer<
  typeof InspectFileBrowserInputParser
>

export const InspectFileBrowserLocalInputParser = z.object({
  handle: z.optional(z.literal('local')),
  input: z.object({
    file: z.object({
      content: z.lazy(() => FileContentParser),
    }),
  }),
})

export type InspectFileBrowserLocalInputRecord = z.infer<
  typeof InspectFileBrowserLocalInputParser
>

export const InspectFileBrowserOutputParser = z.object({
  file: z.lazy(() => FileContentParser),
})

export type InspectFileBrowserOutputRecord = z.infer<
  typeof InspectFileBrowserOutputParser
>

export const InspectFileBrowserRemoteInputParser = z.object({
  handle: z.literal('remote'),
  input: z.object({
    file: z.lazy(() => FileContentWithSha256Parser),
  }),
})

export type InspectFileBrowserRemoteInputRecord = z.infer<
  typeof InspectFileBrowserRemoteInputParser
>
